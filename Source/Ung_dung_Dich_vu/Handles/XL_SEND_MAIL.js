var nodemailer = require('nodemailer');

class XL_send_Mail{
    Send_Mail_to(from,to,subject,body){
        var transporter = nodemailer.createTransport({
            host : 'smtp.gmail.com',
            service : 'gmail',
            port : 465,
            secure : true,
            auth : {
                user : 'trhoanganh1409@gmail.com',
                pass : '0986457198'
            }
        });
        var mailOptions = {
            from : `Cửa hàng bách hoá tổng hợp - thực phẩm công nghệ <${from}>`,
            to : to,
            subject : subject,
            html : body,
        }

        return transporter.sendMail(mailOptions);
    }
}

var mailer = new XL_send_Mail();
module.exports = mailer;