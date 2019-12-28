// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// exports.pdf = (req, res) => {
//     const doc = new PDFDocument()
//     let filename = 'test' + '.pdf';
//     const pdfPath = path.join('data', 'pdf', filename)
//     //Striping out special characters
//     // filename = encodeURIComponent(filename) + '.pdf'

//     //setting response to attachment (Downloads)
//     res.setHeader('Content-disposition', 'attachment; filename="' + filename + '" ')
//     res.setHeader('Content-type', 'application/pdf')

//     const content = req.body.content
//     doc.y = 300
//     doc.getMaxListeners(content, 50, 50)
//     doc.pipe(res)
//     doc.end()
// } 
const fs = require('fs');
const path = require('path')
const PDFDocument = require('pdfkit');


exports.pdf = (req, res) => {
    const filename = 'test' + '.pdf';
    const pdfPath = path.join('data', 'pdf', filename)
    
    const pdfDoc = new PDFDocument()
    pdfDoc.pipe(fs.createWriteStream(pdfPath));
    pdfDoc.pipe(res);

    pdfDoc.text('Hello world!')
    console.log('response', res)
    res.send(res)

    pdfDoc.end();

    res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '" ')
    res.setHeader('Content-Type', 'application/pdf')

}