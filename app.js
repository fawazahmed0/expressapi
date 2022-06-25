const express = require('express')
const app = express()
const multer = require('multer')
// Saves uploaded pics at uploads dir
const upload = multer({ dest: 'uploads/' })
const port = 3000

async function begin() {
    const { default: imagemin } = await import('imagemin')
    const { default: imageminJpegtran } = await import('imagemin-jpegtran')
    const { default: imageminPngquant } = await import('imagemin-pngquant')


    app.post('/photo/upload', upload.single('pic'), async function (req, res, next) {
        // Image Minifier with default values
        await imagemin([`${req.file.path}`], {
            destination: 'minified/',
            plugins: [
                imageminJpegtran(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });
        res.download(`minified/${req.file.filename}`, `minified-${req.file.originalname}`);
    })




    app.listen(port, () => {
        console.log(`app listening on port ${port}`)
    })



}

begin()

