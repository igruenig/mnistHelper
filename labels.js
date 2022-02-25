const fs = require('fs');

const labels = [];

fs.open("./train-labels-idx1-ubyte", 'r', (err, fd) => {
  if (err) {
    console.log(err);
    return;
  }

  let buffer = Buffer.alloc(4);

  fs.readSync(fd, buffer, 0, 4, 4);
  const count = buffer.readInt32BE(0);
  console.log('count:', count);

  buffer = Buffer.alloc(1);

  for (var i = 0; i < count; i++) {
    fs.readSync(fd, buffer, 0, 1, 8 + i);
    labels.push(buffer.readUInt8(0));
  }

  // save as json
  fs.writeFile('./labels.json', JSON.stringify(labels), (status) => {
    if (status) {
      console.log(status.message);
      return;
    }
    console.log('saved');
  });
});