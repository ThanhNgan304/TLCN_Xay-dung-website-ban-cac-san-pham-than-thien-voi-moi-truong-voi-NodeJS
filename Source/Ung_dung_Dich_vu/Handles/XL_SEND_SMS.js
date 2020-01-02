var twilio = require('twilio');

class XL_send_SMS {
    Send_SMS_to(Number_phone, Message_content){
        var accountSid = 'AC6d5fccc73b4f8edd13708e788f2bcd74';
        var authToken = 'eba2ad38a09ed0d75f1080adcd85f583 ';
        var client = new twilio(accountSid,authToken);

        return client.messages.create({
            from : '+12055830986',
            to : Number_phone,
            body : Message_content,
        })
    }
}

var handle_SMS = new XL_send_SMS();
module.exports = handle_SMS;