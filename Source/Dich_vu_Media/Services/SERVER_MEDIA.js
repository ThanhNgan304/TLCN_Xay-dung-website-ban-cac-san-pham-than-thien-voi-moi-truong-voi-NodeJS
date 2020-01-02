var http = require('http');
var Port = 1001;
//  var Port = normalizePort(process.env.PORT || 1001);

var storage_Media = require('../Handles/XL_CONNECT_MEDIA');

var handle_Para = require('querystring');

var _Media = http.createServer((Req, Resp) => {
    var File_Name = Req.url.replace("/", "");
    var str_Receive = "";
    Req.on('data', (chunk) => { str_Receive += chunk});

    var str_Binary_Result = "";
    Req.on('end' , ()=>{
        Resp.setHeader("Access-Control-Allow-Origin" , '*');
        Resp.setHeader("Access-Control-Allow-Methods" , 'GET,PUT,DELETE,POST');
        Resp.setHeader("Access-Control-Allow-Headers" , 'X-Requested-With : content-type');
        Resp.setHeader("Access-Control-Allow-Credentials" , true);
       
        if(Req.method == 'GET' && File_Name != ""){
            if(File_Name.toLowerCase().endsWith("pdf")){
                str_Binary_Result = storage_Media.Read_Binary_PDF(File_Name);
                Resp.setHeader("Access-Control-Allow-Origin" , '*');
                Resp.writeHead(200, {'Content-Type' : 'application/pdf'});
                Resp.end(str_Binary_Result , 'binary');
            }
            else {
                str_Binary_Result = storage_Media.Read_Binary_Media(File_Name);
                Resp.setHeader("Access-Control-Allow-Origin" , '*');
                Resp.writeHead(200, {'Content-Type' : 'image/jpg'});
                Resp.end(str_Binary_Result , 'binary');
            }
        }
        else if(Req.method == 'POST' && Req.url =='/GHI_PDF'){
            var pdf = JSON.parse(str_Receive);
            var str_Result = storage_Media.Write_Binary_PDF(pdf.Name , pdf.String_Binary);
            Resp.setHeader("Access-Control-Allow-Origin" , '*');
            Resp.end(str_Result);
        }
        else if(Req.method == 'POST'){
            var img = JSON.parse(str_Receive);
            var str_Result = storage_Media.Write_Binary_Media(img.Name , img.String_Binary);
            Resp.setHeader("Access-Control-Allow-Origin" , '*');
            Resp.end(str_Result);
        }
        else {
            var str_Result = storage_Media.Read_info_Service();
            Resp.setHeader("Access-Control-Allow-Origin" , '*');
            Resp.end(str_Result);
        }
    })
})
_Media.listen(Port,
    console.log(`Media Server service is executing at the address : http://localhost:${Port}`)
)

_Media.on('error', onError);
_Media.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // name a pipe
        return val;
    }
    if (port >= 0) {
        // name a number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof Port === 'string'
        ? 'Pipe ' + Port
        : 'Port ' + Port;
    // handle specific listen errors with friendly massages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ` requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + ` is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = _Media.address();
    var bind = typeof addr === 'string'
        ? 'pipi ' + addr
        : 'port ' + addr.port;
    console.log("Listening on " + bind);
}    