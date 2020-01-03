const fs = require('fs');
const path = require('path')
const PDFDocument = require('pdfkit');


exports.pdf = async (req, res) => {
try {
    const filename = 'test1234'
    const pdfPath = path.join('data', 'pdf', filename + '.pdf')
    
    const pdfDoc = new PDFDocument()

    res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '" ')
    res.setHeader('Content-Type', 'application/pdf')

    pdfDoc.pipe(fs.createWriteStream(pdfPath));
    

    const content = await req.body.content
    pdfDoc.text(content)

    
    await pdfDoc.pipe(res);
    console.log('pdf created')
    pdfDoc.end();
    
}

catch (err) {
    res.status(400).json({ message: 'An error occured while' });
  }
    

   

}