const fs = require('fs');
const path = require('path')
const PDFDocument = require('pdfkit');


exports.pdf = (req, res) => {

    const filename = 'test1234'
    const pdfPath = path.join('data', 'pdf', filename + '.pdf')
    
    const pdfDoc = new PDFDocument()

    res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '" ')
    res.setHeader('Content-Type', 'application/pdf')

    pdfDoc.pipe(fs.createWriteStream(pdfPath));
    

    const content = req.body.content
    pdfDoc.text('heyyyyy')

    
    pdfDoc.pipe(res);

    pdfDoc.end();

   

}