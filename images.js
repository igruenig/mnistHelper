const fs = require('fs');

const images = [];
const maxCount = 100;

fs.open("./train-images-idx3-ubyte", 'r', (err, fd) => {
  if (err) {
    console.log(err);
    return;
  }

  let buffer = Buffer.alloc(4);

  fs.readSync(fd, buffer, 0, 4, 4);
  const count = buffer.readInt32BE(0);

  fs.readSync(fd, buffer, 0, 4, 8);
  const rows = buffer.readInt32BE(0);

  fs.readSync(fd, buffer, 0, 4, 12);
  const cols = buffer.readInt32BE(0);

  console.log('count:', count);
  console.log('rows:', rows);
  console.log('cols:', cols);

  const size = rows * cols;
  buffer = Buffer.alloc(size);

  for (var i = 0; i < maxCount; i++) {
    const image = [];

    fs.readSync(fd, buffer, 0, size, 16 + i * size);
    for (var j = 0; j < size; j++) {
      image[j] = buffer.readUInt8(j);
    }

    images.push(image);
  }

  // save as json
  fs.writeFile('./images.json', JSON.stringify(images), (status) => {
    if (status) {
      console.log(status.message);
      return;
    }
    console.log('saved');
  });
});