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
    res.send(res).

    pdfDoc.end();

    res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '" ')
    res.setHeader('Content-Type', 'application/pdf')

}