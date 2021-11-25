const imageUtils = require('./imageUtils');
const { promises: fs } = require('fs');

test('resize', async () => {

  //  const file = await fs.readFile()

  //console.log('file', file.buffer.toString())
  const fileBuffer = await imageUtils.resize('data/BOGGED.png', 500, 500)
  await imageUtils.save(fileBuffer, `resized.png`)

});

test('rotate', async () => {

  //  const file = await fs.readFile()

  //console.log('file', file.buffer.toString())
  const fileBuffer = await imageUtils.rotate('data/BOGGED.png', 86)
  await imageUtils.save(fileBuffer, `rotated.png`)

});

test('convert', async () => {

  //  const file = await fs.readFile()

  //console.log('file', file.buffer.toString())
  const fileBuffer = await imageUtils.convert('data/BOGGED.png', 'jpeg')
  await imageUtils.save(fileBuffer, `converted.jpeg`)

});


test('chained', async () => {

  //  const file = await fs.readFile()

  //console.log('file', file.buffer.toString())
  const resized = await imageUtils.resize('data/BOGGED.png', 500, 500)
  const fileBuffer = await imageUtils.rotate(resized, 86)

  await imageUtils.save(fileBuffer, `chained.jpeg`)
});


//.greyscale()
