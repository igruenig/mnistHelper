const fs = require('fs');
var path = require('path');

const imageSize = 28 * 28;

const getImage = (index) => {
  const trainingImagesPath = path.join(__dirname, 'train-images-idx3-ubyte');
  const fd = fs.openSync(trainingImagesPath, 'r');
  const buffer = Buffer.alloc(imageSize);
  const offset = 16 + index * imageSize;
  fs.readSync(fd, buffer, 0, imageSize, offset);

  const image = [];
  for (var i = 0; i < imageSize; i++) {
    image[i] = buffer.readUInt8(i);
  }

  return image;
}

const getLabel = (index) => {
  const trainingLabelsPath = path.join(__dirname, 'train-labels-idx1-ubyte');
  const fd = fs.openSync(trainingLabelsPath, 'r');
  const buffer = Buffer.alloc(1);
  const offset = 8 + index;
  fs.readSync(fd, buffer, 0, 1, offset);

  return buffer.readUInt8(0);
}

exports.getImage = getImage;
exports.getLabel = getLabel;