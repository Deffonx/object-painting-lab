import * as tf from '@tensorflow/tfjs-node';
import * as nsfwjs from 'nsfwjs';
import { createCanvas, loadImage } from 'canvas';
import * as Jimp from 'jimp';

async function classifyImage(imageBuffer: Buffer) {
  const img = await loadImage(imageBuffer);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const model = await nsfwjs.load();
  const predictions = await model.classify(canvas);
  return predictions;
}

async function inpaintNSFW(imageBuffer: Buffer) {
  const predictions = await classifyImage(imageBuffer);
  const nsfw = predictions.some(prediction => prediction.className === 'Porn' || prediction.className === 'Hentai' || prediction.className === 'Sexy' || prediction.className === 'Drawing');

  if (!nsfw) {
    return imageBuffer;
  }

  const image = await Jimp.read(imageBuffer);
  const mask = new Jimp(image.getWidth(), image.getHeight(), (err, image) => {
    if (err) throw err;
  });

  predictions.forEach(prediction => {
    if (prediction.className === 'Porn' || prediction.className === 'Hentai' || prediction.className === 'Sexy' || prediction.className === 'Drawing') {
      const { top, left, bottom, right } = prediction.bbox;
      mask.scan(left, top, right - left, bottom - top, function(x, y, idx) {
        this.bitmap.data[idx + 3] = 255; // alpha channel
      });
    }
  });

  image.composite(mask, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 1,
    opacityDest: 1
  });

  const inpaintedBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
  return inpaintedBuffer;
}

export { classifyImage, inpaintNSFW };
