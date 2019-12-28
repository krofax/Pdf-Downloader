const PDFDocument = require('pdfkit');

exports.pdf = (req, res) => {
    const doc = new PDFDocument()
    let words = req.body.words

    //Striping out special characters
    words = encodeURIComponent(words) + '.pdf'

    //setting response to attachment (Downloads)
    res.setHeader('Content-disposition', 'attachment; words="' + words + '" ')
    res.setHeader('Content-type', 'application/pdf')

    const content = req.body.content
    doc.y = 300
    doc.getMaxListeners(content, 50, 50)
    doc.pipe(res)
    doc.end()
} 