const path=require('path')
const fs=require('fs');
const http=require('http');
const PDFDocument=require('pdfkit');

exports.getinvoice=(req,res,next)=>{
    const orderid=req.params.orderid;
    let invoicename="invoice-2.pdf";
    const invoicepath=path.join('data','invoices',invoicename);
    res.download('data/invoices/invoice-2.pdf');
    // fs.readFile(invoicepath,'UTF-8',(err,data)=>{
    //   res.setHeader('Content-Type','application/pdf');
    //   res.setHeader('Content-Disposition','attachement; filename="'+invoicename+'"');
    //   res.send(data);
    // })
    // const pdf= new PDFDocument();
    // pdf.pipe(fs.createWriteStream(invoicepath));
    // pdf.pipe(res);
    // pdf.text('hello world file 2');
    // pdf.end();
    // const file=fs.createWriteStream(invoicename);

    // const pdfDoc=new PDFDocument();
    // res.download(invoicepath);
    // pdfDoc.pipe(fs.createWriteStream(invoicepath));
    // pdfDoc.pipe(res);
    // res.setHeader('Content-Type','application/pdf');
    // res.setHeader('Content-Disposition','inline; filename="'+invoicename+'"');
    // pdfDoc.text("hello world");
    // pdfDoc.end();

    // const file=fs.createReadStream(invoicepath);
    // fs.readFile(invoicepath,(err,data)=>{
    //     if(err){
    //         return res.redirect('/');
    //     }
    //     res.setHeader('Content-Type','application/pdf');
    //     res.setHeader('Content-Disposition','attachment; filename="'+invoicename+'"');
    //     res.send(data);
    // })
    
    // const file=fs.create(invoicepath);
    // res.setHeader('Content-Type','application/pdf');
    // res.setHeader('Content-Disposition','inline; filename="'+invoicename+'"');
    // file.pipe(res);

    // var file = fs.createReadStream(`${invoicepath}`);
    // var stat = fs.statSync(`${invoicepath}`);
    // res.setHeader('Content-Length', stat.size);
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', `attachment; filename=${invoicename}`);
    // file.pipe(res);

    // const doc=new PDFDocument();
    // res.setHeader('Content-Type','application/pdf');
    // res.setHeader('Content-Disposition','inline; filename="'+invoicename+'"');
    // doc.pipe(fs.createWriteStream('data/invoices/invoice-2.pdf'));
    // doc.pipe(res);
    // doc.fontSize(25).text("invoice",{
    //     underline:true,
    // })
    // doc.text('--------------');
    // doc.fontSize(20).text("Ahmad",{
    //     underline:true,
    // })
    // doc.text('--------------');
    // doc.fontSize(20).text("Price",{
    //     underline:true,
    // })
    // doc.text('--------------');

    // doc.end();

    // const file=fs.createReadStream(invoicepath);
    // res.setHeader('Content-Type','application/pdf');
    // res.setHeader('Content-Disposition','inline; filename="'+invoicename+'"');
    // file.pipe(res);
}