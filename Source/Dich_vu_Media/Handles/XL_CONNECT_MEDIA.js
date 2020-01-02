var File = require('fs');
var Dir_Media = "Media";
var Dir_Pdf = "Download_PDF";

function Read_info_Service(){
    var link = "index.html";
    var string_Info = File.readFileSync(link, "UTF-8");
    return string_Info;
}

function decodeBase64Image(dataString){
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/) ,
        response = {};

    if(matches.length !== 3){
        return new Error('Errorrrrr');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2] , 'base64');
    return response;
}

class XL_Connect_Media{
    Read_info_Service(){
        return Read_info_Service();
    }
    Read_Binary_Media(File_Name){
        var link = Dir_Media + "//" + File_Name;
        var Binary = "";
        if(File.existsSync(link)){
            Binary = File.readFileSync(link);
        }
        return Binary;
    }

    Write_Binary_Media(File_Name , str_Binary){
       try {
            var link = Dir_Media + "//" + File_Name;
            var Binary = decodeBase64Image(str_Binary);
            File.writeFileSync(link, Binary.data);
       } catch (error) {
           return error.toString();
       }
    }

    Read_Binary_PDF(File_Name){
        var link = Dir_Pdf + "//" + File_Name;
        var Binary = "";
        if(File.existsSync(link)){
            Binary = File.readFileSync(link);
        }
        return Binary;
    }

    Write_Binary_PDF(File_Name, str_Binary){
        var link = Dir_Pdf + "//" + File_Name;
        var Binary = decodeBase64Image(str_Binary);
        File.writeFileSync(link, Binary.data);
    }
}

var handle_Media = new XL_Connect_Media();
module.exports = handle_Media;