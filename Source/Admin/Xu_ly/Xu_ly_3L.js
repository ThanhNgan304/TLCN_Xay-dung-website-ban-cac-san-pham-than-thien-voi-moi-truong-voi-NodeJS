var Dia_chi_Dich_vu = "http://localhost:1000";
var Dia_chi_Media = "http://localhost:1001"

// đọc khách hàng liên hệ mail
function Contact_customer_Mail(content_mail) {
    var Tham_so = `index_Para=SEND_MAIL_TO_STORES`;
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
    var Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false);
    var Chuoi_goi = content_mail;
    Xu_ly_HTTP.send(Chuoi_goi);
    var Chuoi_Kq = Xu_ly_HTTP.responseText;
    return Chuoi_Kq;
}

function Output_Form_Contact_customer_Mail(Th_Cha) {
    var content_HTML = `
        <div class="form-contact" style="height:600px;">
            <h2 class="title-section text-center" style="margin-bottom: 0px;">Đăng ký nhận thông tin cửa hàng</h2>
            <h3 style="text-align:center;color:rgb(38, 139, 185); font-size: 23px; font-family: Baskerville Old Face;">Quý
            khách vui lòng để lại thông tin, chúng tôi sẽ liên hệ ngay</h3>
     
            <div class="btn btn-outline-danger btn-block" id="Th_Thong_bao" onclick="window.location='index.html'">
                    Cảm ơn bạn đã gởi mail. Chúng tôi sẽ sớm trả lời thư của bạn.Click vào đây để quay lại trang chủ !!!!
            </div>
        </div>
    `;
    Th_Cha.innerHTML = content_HTML;
}

// tạo thể hiện đăng nhập
function Tao_The_hien_Dang_nhap(Th_Cha) {
    var noi_dung_HTML = `<div  style="width:30rem; margin:auto; padding:10px" id="Th_Khung_Dang_nhap" class="table-bordered">
    <div class="form-group">
      <label for="Th_Ten_Dang_nhap">Tên đăng nhập</label>
      <input type="text" class="form-control" id="Th_Ten_Dang_nhap" placeholder="Nhập Tên đăng nhập" value="admin">
    </div>
    <div class="form-group">
      <label for="Th_Mat_khau">Mật khẩu</label>
      <input type="password" class="form-control" id="Th_Mat_khau" placeholder="Nhập mật khẩu" value="admin">
    </div>
    
    <button type="button" class="btn btn-primary" id="Th_Dang_nhap">Đăng nhập</button>
  </div>`
    Th_Cha.innerHTML = noi_dung_HTML

}

// xử lý dịch vụ đăng nhập hệ thống
function Dang_nhap_He_thong(Thong_tin) {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `index_Para=LOGIN`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_Thong_tin = JSON.stringify(Thong_tin)
    Xu_ly_HTTP.send(Chuoi_Thong_tin)
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}


function Doc_Thong_tin_Cua_hang() {
    var Tham_so = `index_Para=READ_INFO_STORES`;
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
    var Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false);
    Xu_ly_HTTP.send("");
    var Chuoi_JSON = Xu_ly_HTTP.responseText;
    if (Chuoi_JSON != "") {
        var Cua_hang = JSON.parse(Chuoi_JSON);
    }
    return Cua_hang;
    console.log(Cua_hang)
}


async function Read_list_Stores() {
    var Stores = {};
    var Stores_Pro = await new Promise((Resolve, Reject) => {
        var Tham_so = `index_Para=READ_INFO_STORES`;
        var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
        var Xu_ly_HTTP = new XMLHttpRequest();
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText;
            if (Chuoi_JSON != "") {
                Stores = JSON.parse(Chuoi_JSON);
                Resolve(Stores);
            }
            else {
                Reject("Read Stores Error");
            }
        }
        Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
        Xu_ly_HTTP.send("");
    });

    return Stores;
}

async function Read_list_Products() {
    var Products = {};
    var Products_Pro = await new Promise((Resolve, Reject) => {
        var Tham_so = `index_Para=READ_INFO_PRODUCTS`;
        var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
        var Xu_ly_HTTP = new XMLHttpRequest();
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText;
            if (Chuoi_JSON != "") {
                Products = JSON.parse(Chuoi_JSON);
                Resolve(Products);
            }
            else {
                Reject("Read Products Error");
            }
        }
        Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
        Xu_ly_HTTP.send("");
    });

    return Products_Pro;
}


// Xuất tên cửa hàng 
function Output_Name_Store(CH, Th_Cha) {
    var content_HTML = `
        <h4 class="my-4 text-center text-success" 
        style="padding-top: 20px;">Chào mừng bạn đến với trang ${CH[0].Ten}</h4>
        <p></p>
    `;
    Th_Cha.innerHTML = content_HTML;
}
//Xuất thông tin cửa hàng
function Output_Info_Store(CH, Th_Cha) {
    var content_HTML = `<div class="col-lg-12">
        <p>Cửa hàng <strong>${CH[0].Ten}</strong>  rất hân hạnh được phục vụ quí khách!</p>
    </div>
    <div class="col-lg-12">
        <p>Địa chỉ: ${CH[0].Dia_chi} </p>
    </div>
    <div class="col-lg-12">
        <p>Email: ${CH[0].Mail}</p>
    </div>
    <div class="col-lg-12">
        <a class="phone" href="tel:${CH[0].Phone}">SĐT:
            <span> ${CH[0].Phone}</span>
        </a>
    </div>`;
    Th_Cha.innerHTML = content_HTML;
}
//Xuất team name
function Output_Team_Name(CH, Th_Cha) {
    var content_HTML = `
        <p class="m-0 text-white">Copyright by &copy; ${CH[0].Create}</p>
    `;
    Th_Cha.innerHTML = content_HTML;
}
//Xuất logo
function Output_Logo(CH, Th_Cha) {
    var content_HTML = `
    <a class="navbar-brand" href="index.html"> 
        <img src="http://localhost:1001/${CH[0].Ma_so}.jpg" class="img-fluid float-left" / style="height: 3rem; width: 10rem">
    </a>
    `;
    Th_Cha.innerHTML = content_HTML;
}
// Xuất thông tin cửa hàng bên admin
function Output_Store(CH, Th_Cha) {

    var noi_dung_HTML = `
        <blockquote class="blockquote text-center">
        <p class="mb-0 text-success">${CH[0].Ten}</p>
        <footer class="blockquote-footer"> <cite title="Source Title">Phục vụ Quí khách 24/7</cite></footer>
        <footer class="blockquote-footer">
            <cite title="Source Title">
                <i class="fa fa-envelope-o" aria-hidden="true"></i> : ${CH[0].Mail} -
                <i class="fa fa-phone" aria-hidden="true"></i>: 
                    <a href="tel:012.3456789">${CH[0].Phone}</a>
            </cite></footer>
        </blockquote>
    
    `
    Th_Cha.innerHTML = noi_dung_HTML
}


// 
// 
{/* <div class="card-body">
<div class="table-responsive">
  <table class="table">
    <thead class=" text-primary">
      <th>
        ID
      </th>
      <th>
        Tên
      </th>
      <th>
        Số lượng (kg)
      </th>
      <th>
        Đơn giá nhập
      </th>
      <th>
        Đơn giá bán
      </th>
      <th>
        Ngày nhập hàng
      </th>
      <th>
        Ngày hết hạn sử dụng
      </th>
    </thead>
    <tbody>
      <tr>
        <td>
          1
        </td>
        <td>
          Organce
        </td>
        <td>
          10
        </td>
        <td class="text-primary">
          $36,738
        </td>
        <td class="text-primary">
          $60
        </td>
        <td>
          10/8/2019
        </td>
        <td>
          20/8/2019
        </td>
      </tr>
    
    </tbody>
  </table>
</div>
</div> */}

//tạo thể hiện 1 sản phẩm mới
function Tao_The_hien_San_pham(San_pham, Th_Cha, Th_Gio_hang) {
    var the_hien = document.createElement("tr")
    the_hien.setAttribute("data", JSON.stringify(San_pham))

    Th_Cha.appendChild(the_hien)
    var Chuoi_HTML = `

    <td> ${San_pham.Ma_so} </td>
    <td> ${San_pham.Ten} </td>
    <td> <img class="card-img-top " src="http://localhost:1001/${San_pham.Ma_so}.jpg" alt="" style="height: 4rem; width: 4rem"></td>
    <td> ${San_pham.So_luong} </td>
    <td> ${San_pham.Don_Gia_Nhap} </td>
    <td> ${San_pham.Don_Gia_Ban} </td>
    <td> ${San_pham.Nhom_San_pham.Ten} </td>
    <td> <button style="border-radius: 5px; padding: 12px !important;" class="btn btn-danger" onclick="Delete_One_Product()">Xóa</button></td>
    <td> <button style="border-radius: 5px; padding: 12px !important;" class="btn btn-info" onclick="Edit_One_Product()">Sửa</button></td>
  `
    the_hien.innerHTML = Chuoi_HTML;
    the_hien.onclick = () => {
        

        // Lưu Session HTML5
        var ds = []
        if (sessionStorage.getItem("Danh_sach_Chon") != undefined) {
            ds = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
        }
        // var vt = ds.indexOf(San_pham.Ma_so)
        // if (vt == -1) {
        //     ds.push(San_pham.Ma_so) // Thêm
        // } else {
        //     ds.splice(vt, 1) // Xóa
        // }
        ds.push(San_pham.Ma_so) 
        if (ds.length > 0) {
            sessionStorage.setItem("Danh_sach_Chon", JSON.stringify(ds))
        } else {
            sessionStorage.removeItem("Danh_sach_Chon")
        }

        Th_Gio_hang.innerHTML = `${ds.length}`
    }

    return the_hien
}
//tạo thể hiện 1 sản phẩm cũ
// function Tao_The_hien_San_pham(San_pham, Th_Cha, Th_Gio_hang) {
//     var the_hien = document.createElement("div")
//     the_hien.setAttribute("class", "col-lg-3 col-md-3 mb-4")
//     the_hien.setAttribute("data", JSON.stringify(San_pham))

//     Th_Cha.appendChild(the_hien)
//     var Chuoi_HTML = `
//     <div class="card h-100 text-center img_pro_center">
//         <img class="card-img-top " src="http://localhost:1001/${San_pham.Ma_so}.jpg" alt="" style="height: 16rem; width: 16rem">
//         <div class="card-body">
//             <h5 class="card-title"><a href="#">${San_pham.Ten}</a></h5>
//             <h5>${San_pham.Don_Gia_Ban} $</h5>
//             <p class="card-text">
        
        
//         </p>
//     </div>
    
//   </div>

//   `
//     the_hien.innerHTML = Chuoi_HTML;
//     the_hien.onclick = () => {
//         the_hien.classList.toggle("CHON");

//         // Lưu Session HTML5
//         var ds = []
//         if (sessionStorage.getItem("Danh_sach_Chon") != undefined) {
//             ds = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
//         }
//         var vt = ds.indexOf(San_pham.Ma_so)
//         if (vt == -1) {
//             ds.push(San_pham.Ma_so) // Thêm
//         } else {
//             ds.splice(vt, 1) // Xóa
//         }

//         if (ds.length > 0) {
//             sessionStorage.setItem("Danh_sach_Chon", JSON.stringify(ds))
//         } else {
//             sessionStorage.removeItem("Danh_sach_Chon")
//         }

//         Th_Gio_hang.innerHTML = `${ds.length}`
//     }

//     return the_hien
// }

//


//=====================THÊM SẢN PHẨM=======================//
// function Lay_Ma_so_cuoi() {
//     Nhom_San_pham = Th_Nhom_San_pham.value;
//     var Danh_sach_Ma_so = []
//     list_Products.forEach(Products => {
//         if (Products.Nhom_San_pham.Ma_so == Nhom_San_pham) {
//             var Thanh_phan_con = Products.Ma_so.trim().split("_")
//             Danh_sach_Ma_so.push(parseInt(Thanh_phan_con[1]))
//         }

//     })

//     Danh_sach_Ma_so.sort(function (a, b) {
//         return a - b
//     })

//     var Ma_so_Sau_cung = Danh_sach_Ma_so[Danh_sach_Ma_so.length - 1]
//     Ma_so_Sau_cung += 1
//     Th_Ma_so.value = Nhom_San_pham + "_" + Ma_so_Sau_cung.toString()
// }


// Xử lý Xem trước Media
function Xem_truoc_Media() {
    var reader = new FileReader();
    reader.onload = function (e) {
        Th_Hinh_Xem_truoc.src = e.target.result;
        //console.log(e.target.result)
    }
    reader.readAsDataURL(Th_file.files[0]);

}
// Xử lý lấy Ma_so
function Lay_Ma_so_cuoi() {
    var result_Pro = Read_list_Products();

    result_Pro.then(result => {
        var list_Products = [];
        list_Products = result.Products;
        Nhom_San_pham = Th_Nhom_San_pham.value;
        console.log('Nhóm sản phẩm nek' + Nhom_San_pham)
        var Danh_sach_Ma_so = []
        list_Products.forEach(Products => {
            if (Products.Nhom_San_pham.Ma_so == Nhom_San_pham) {
                var Thanh_phan_con = Products.Ma_so.trim().split("_")
                Danh_sach_Ma_so.push(parseInt(Thanh_phan_con[1]))
            }

        })

        Danh_sach_Ma_so.sort(function (a, b) {
            return a - b
        })

        var Ma_so_Sau_cung = Danh_sach_Ma_so[Danh_sach_Ma_so.length - 1]
        Ma_so_Sau_cung += 1
        Th_Ma_so.value = Nhom_San_pham + "_" + Ma_so_Sau_cung.toString()
    });

}
function Ghi_Hinh_Media(Doi_tuong) {

    var Xu_ly_HTTP = new XMLHttpRequest()
    var Dia_chi_Xu_ly = `${Dia_chi_Media}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_Goi = JSON.stringify(Doi_tuong)
    Xu_ly_HTTP.send(Chuoi_Goi)
    var Chuoi_KQ = Xu_ly_HTTP.responseText
    return Chuoi_KQ
}

function Write_new_Products(Products) {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `index_Para=WRITE_INFO_OBJ`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_Goi = JSON.stringify(Products)
    Xu_ly_HTTP.send(Chuoi_Goi)
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Delete_One_Product() {
    // Lưu Session HTML5
    var ds = []
    ds = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
    console.log("Xoa ma nay nek:   " + ds[ds.length-1])
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `index_Para=DELETE_INFO_OBJ`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_Goi = ds[ds.length-1].toString();
    Xu_ly_HTTP.send(Chuoi_Goi)  
    ds.splice(0, ds.length)
    
    window.location = "index.html";
    
}
function Edit_One_Product() {
   
    window.location = "Sua_San_pham.html";
   
    
}
function Update_One_Product(Product) {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `index_Para=UPDATE_INFO_OBJ`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_Goi = JSON.stringify(Product)
    Xu_ly_HTTP.send(Chuoi_Goi)
    // var Chuoi_JSON = Xu_ly_HTTP.responseText
    // if (Chuoi_JSON != "")
    //     Du_lieu = JSON.parse(Chuoi_JSON)
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    return Chuoi_JSON
}

function Tao_Chuoi_The_hien_So_nguyen_duong(So_nguyen) {
    var Chuoi_The_hien = ""
    var Chuoi_So_nguyen = So_nguyen.toString()
    var So_Ky_so = Chuoi_So_nguyen.length
    if (So_Ky_so % 3 == 0) {
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    } else if (So_Ky_so % 3 == 1) {
        Chuoi_The_hien = Chuoi_So_nguyen[0]
        if (So_Ky_so > 1)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."

        }
    } else if (So_Ky_so % 3 == 2) {
        Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
        if (So_Ky_so > 2)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    }
    return Chuoi_The_hien
}