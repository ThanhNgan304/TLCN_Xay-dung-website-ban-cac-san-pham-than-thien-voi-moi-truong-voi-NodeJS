var NodeJS_Service = require('http');
var passport = require('passport');

//var Port = 1000;
var Port = normalizePort(process.env.PORT || 1000);

var storage = require('../Handles/XL_CONNECT_DATABASE');
var data = {};
var getData = storage.Read_info_List_All();
getData.then(results => {
    data.Stores = results.Stores;
    data.Users = results.Users;
    data.Products = results.Products; 
    data.News = results.News;
}).catch(error => {
    console.log(error);
})

var handle_Para = require('querystring');


var _Server = NodeJS_Service.createServer((Req, Resp) => {
    var handle_Address = Req.url.replace("/", "").replace("?", "");
    var Para = handle_Para.parse(handle_Address);

    var str_Receive = "";
    Req.on('data', (chunk) => { str_Receive += chunk });

    var str_Result = "";
    Req.on('end', () => {
        Resp.setHeader("Access-Control-Allow-Origin", '*');
        Resp.setHeader("Access-Control-Allow-Methods", 'GET,PUT,DELETE,POST');
        Resp.setHeader("Access-Control-Allow-Headers", 'X-Request-With : content-type');
        Resp.setHeader("Access-Control-Allow-Credentials", true);

        var index_Para = Para.index_Para;
        if (index_Para == 'READ_INFO_STORES') {
            var Stores = data.Stores;
            str_Result = JSON.stringify(Stores);
            console.log(str_Result)
            Resp.end(str_Result);
        }
        else if (index_Para == 'SHARE_FACEBOOK') {
            passport.use(new FacebookStrategy({
                clientID: '440573726636695',
                clientSecret: '0723d28e32e8dc96ee1f91d50ba4396f',
                callbackURL: "http://localhost:/5501/Giao_dien/news.html",
                profileFields: ['id', 'displayName', 'photos', 'email']
            },
                function (accessToken, refreshToken, profile, done) {

                    if (err) done(err);
                    else {
                        done(null, user);
                    }
                }
            ))
        }
    
        else if (index_Para == 'READ_INFO_PRODUCTS') {
            var Products = data.Products;
            var Copy = {};
            Copy.Products = [];
            Products.forEach(root_elements => {
                var elements = Object.assign({}, root_elements);
                Copy.Products.push(elements);
                // delete elements.Danh_sach_Phieu_Giao
                // delete elements.Danh_sach_Phieu_Ban
                // delete elements.Danh_sach_Phieu_Nhap
                // delete elements.Danh_sach_Phieu_Xuat
            });
            str_Result = JSON.stringify(Copy);
            Resp.end(str_Result);
        }
        else if (index_Para == 'READ_INFO_NEWS') {
            var News = data.News;
            var Copy_News = {};
            Copy_News.News = [];
            News.forEach(root_elements => {
                var elements = Object.assign({}, root_elements);
                Copy_News.News.push(elements);

            });
            str_Result = JSON.stringify(Copy_News);
            Resp.end(str_Result);
        }
        else if (index_Para == 'WRITE_INFO_OBJ') {
            var new_Products = JSON.parse(str_Receive);
            var Result_Pro = storage.Write_new_info_Object("Products", new_Products);
            Result_Pro.then(result => {

                data.Products.push(new_Products);
                str_Result = JSON.stringify(new_Products);
                Resp.end(str_Result);
            }).catch(error => {
                //console.log(error);
                str_Result = "ERROR";
                Resp.end(str_Result)
            })
        }
        else if (index_Para == 'DELETE_INFO_OBJ') {
           
            var Product = data.Products.find(x => x.Ma_so == str_Receive);
            var Conditional_Delete = {
                "Ma_so": Product.Ma_so
            }
            var Result_Pro = storage.Delete_info_List_Object("Products", Conditional_Delete);
                Result_Pro.then(result => {
                    //console.log(result)
                    data.Products = data.Products.filter(x => x.Ma_so != str_Receive);
                    str_Result = "OK";
                    Resp.end(str_Result);
                }).catch(error => {
                    str_Result = "ERROR";
                    Resp.end(str_Result);
                })
        }
        // else if (index_Para == 'DELETE_INFO_OBJ') {
        //     var list_Foods_Delete = JSON.parse(str_Receive);
        //     list_Foods_Delete.forEach(delete_Foods => {
        //         var Foods = data.Foods.find(x => x.Ma_so == delete_Foods.Ma_so);

        //         var Conditional_Delete = {
        //             "Ma_so": Foods.Ma_so
        //         }

        //         var Result_Pro = storage.Delete_info_List_Object("Foods", Conditional_Delete);
        //         Result_Pro.then(result => {
        //             //console.log(result)
        //             data.Foods = data.Foods.filter(x => x.Ma_so != delete_Foods.Ma_so);
        //             str_Result = "OK";
        //             Resp.end(str_Result);
        //         }).catch(error => {
        //             str_Result = "ERROR";
        //             Resp.end(str_Result);
        //         })
        //     })
        // }
        else if (index_Para == 'UPDATE_INFO_OBJ') {
            var Product_Update = JSON.parse(str_Receive);
            
            
                var Conditional_Update = {
                    "Ma_so": Product_Update.Ma_so
                }

                var Values_Update = {
                    $set: {
                        "Ten": Product_Update.Ten,
                        "So_luong": Product_Update.So_luong,
                        "Don_Gia_Ban": Product_Update.Don_Gia_Ban,
                        "Don_Gia_Nhap": Product_Update.Don_Gia_Nhap
                        
                    }
                }

                var Result_Pro = storage.Update_info_List_Object("Products", Conditional_Update, Values_Update);
                Result_Pro.then(result => {
                    //console.log(result)
                    data.Products = data.Products.filter(x => x.Ma_so != Product_Update.Ma_so);
                    data.Products.push(Product_Update);
                    str_Result = "OK";
                    Resp.end(str_Result);
                }).catch(error => {
                    str_Result = "ERROR";
                    Resp.end(str_Result);
                })
        
        }
        else if (index_Para == "GHI_PHIEU_DAT_HANG") {
            var DsPhieu_Dat_hang = JSON.parse(str_Receive);
            DsPhieu_Dat_hang.forEach(Phieu => {
                var San_pham = data.Products.find(x => x.Ma_so == Phieu.San_pham.Ma_so)
                var So_Phieu_Dat = 1
                if (San_pham.Danh_sach_Phieu_Dat == undefined) {
                    San_pham.Danh_sach_Phieu_Dat = []
                }
                So_Phieu_Dat = San_pham.Danh_sach_Phieu_Dat.length + 1
                Phieu.Phieu_Dat.So_Phieu_Dat = So_Phieu_Dat
                San_pham.Danh_sach_Phieu_Dat.push(Phieu.Phieu_Dat)

                var Conditional_Update = {
                    "Ma_so": San_pham.Ma_so
                }

                var Values_Update = {
                    $set: {
                        "Danh_sach_Phieu_Dat": San_pham.Danh_sach_Phieu_Dat
                    }
                }
                var Result_Pro = storage.Update_info_List_Object("Products", Conditional_Update, Values_Update);
                Result_Pro.then(result => {
                    //console.log(result)
                    data.Products = data.Products.filter(x => x.Ma_so != San_pham.Ma_so);
                    data.Products.push(San_pham);
                    str_Result = "OK";
                    Resp.end(str_Result);
                }).catch(error => {
                    San_pham.Danh_sach_Phieu_Dat.pop()
                    str_Result = "ERROR";
                    Resp.end(str_Result);
                })
               
            })
        }
       

    })
})
_Server.listen(Port,
    console.log(`Data Server service is executing at the address : http://localhost:${Port}`)
)
_Server.on('error', onError);
_Server.on('listening', onListening);


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
    var addr = _Server.address();
    var bind = typeof addr === 'string'
        ? 'pipi ' + addr
        : 'port ' + addr.port;
    console.log("Listening on " + bind);
}