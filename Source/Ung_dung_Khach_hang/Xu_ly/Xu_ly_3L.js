var Dia_chi_Dich_vu = "http://localhost:1000";
var Dia_chi_Media = "http://localhost:1001"

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
async function Read_list_News() {
    var News = {};
    var News_Pro = await new Promise((Resolve, Reject) => {
        var Tham_so = `index_Para=READ_INFO_NEWS`;
        var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
        var Xu_ly_HTTP = new XMLHttpRequest();
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText;
            if (Chuoi_JSON != "") {
                News = JSON.parse(Chuoi_JSON);
                Resolve(News);
            }
            else {
                Reject("Read News Error");
            }
        }
        Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly);
        Xu_ly_HTTP.send("");
    });

    return News_Pro;
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

//tạo thể hiện 1 sản phẩm
function Tao_The_hien_San_pham(San_pham, Th_Cha, Th_Gio_hang) {
    var the_hien = document.createElement("div")
    the_hien.setAttribute("class", "col-lg-4 col-md-6 mb-4")
    the_hien.setAttribute("data", JSON.stringify(San_pham))

    Th_Cha.appendChild(the_hien)
    var Chuoi_HTML = `
    <div class="card h-100 text-center img_pro_center">
        <img class="card-img-top " src="http://localhost:1001/${San_pham.Ma_so}.jpg" alt="" style="height: 16rem; width: 16rem">
        <div class="card-body">
            <h5 class="card-title"><a href="#">${San_pham.Ten}</a></h5>
            <h5>${San_pham.Don_Gia_Ban} $</h5>
            <p class="card-text">
            <div class="container">
            <div class="row text-center">
                <div class="col-lg-6">
                    <a name="" id="" class="btn btn-success" href="#" role="button" style=" font-weight: bold">MUA NGAY</a>
                </div>
                <div class="col-lg-6">
                    <a name="" id="" class="btn btn-primary" href="#" role="button" onclick="Show_Modal(JSON.stringify(San_pham))">TÌM HIỂU</a>
                </div>
            </div>
            </div>
        
        
        </p>
    </div>
    <div class="card-footer">
      <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
    </div>
  </div>

  `
    the_hien.innerHTML = Chuoi_HTML;
    the_hien.onclick = () => {
        the_hien.classList.toggle("CHON");

        // Lưu Session HTML5
        var ds = []
        if (sessionStorage.getItem("Danh_sach_Chon") != undefined) {
            ds = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
        }
        var vt = ds.indexOf(San_pham.Ma_so)
        if (vt == -1) {
            ds.push(San_pham.Ma_so) // Thêm
        } else {
            ds.splice(vt, 1) // Xóa
        }

        if (ds.length > 0) {
            sessionStorage.setItem("Danh_sach_Chon", JSON.stringify(ds))
        } else {
            sessionStorage.removeItem("Danh_sach_Chon")
        }

        Th_Gio_hang.innerHTML = `${ds.length}`
    }

    return the_hien
}

//tạo thể hiện 1 tin tức
function Tao_The_hien_Tin_tuc(Tin_tuc, Th_Cha) {
    var the_hien = document.createElement("article")
    the_hien.setAttribute("class", "col-lg-6")
    the_hien.setAttribute("data", JSON.stringify(Tin_tuc))
    Th_Cha.appendChild(the_hien)
    var Chuoi_HTML = `
    <figure class="tm-person">
        <img src="http://localhost:1001/${Tin_tuc.Ma_so}.jpg" alt="Image" class="img-fluid tm-person-img"
        style="width:200px; height: 240px">
        <figcaption class="tm-person-description">
            <h4 class="tm-person-name">${Tin_tuc.Ten}</h4>
            <p class="tm-person-title">Đăng ngày: ${Tin_tuc.Ngay_dang}</p>
            <p class="tm-person-about">${Tin_tuc.Tom_tat}</p>
            <div>
                <a href="https://fb.com" class="tm-social-link"><i class="fab fa-facebook tm-social-icon"></i></a>
                <a href="https://twitter.com" class="tm-social-link"><i class="fab fa-twitter tm-social-icon"></i></a>
            </div>
        </figcaption>
    </figure>

  `
    the_hien.innerHTML = Chuoi_HTML;
    the_hien.onmouseover = () => {
        the_hien.classList.add("CHON");
    }
    the_hien.onmouseleave = () => {
        the_hien.classList.remove("CHON");
    }
    the_hien.onclick = () => {

        sessionStorage.setItem("Tin_tuc_Chon", JSON.stringify(Tin_tuc))
        window.location = 'Detail_news.html';}
    return the_hien
}

//tạo thể hiện 1 chi tiết tin tức
function Tao_The_hien_Chi_tiet_Tin_tuc(Tin_tuc, Th_Cha, Th_Thong_bao) {
    var the_hien = document.createElement("article")
    the_hien.setAttribute("class", "col-lg-12")
    the_hien.setAttribute("data", JSON.stringify(Tin_tuc))
    Th_Cha.appendChild(the_hien)
    var Chuoi_HTML = `
    <figure class="tm-person text-center">  
        <figcaption class="tm-person-description">
            <h4 class="tm-person-name " style="font-weight: 700; font-size: 32px;">${Tin_tuc.Ten}</h4>
            <p class="tm-person-title ">Đăng ngày: ${Tin_tuc.Ngay_dang}</p>
            <div>
                <a href="https://fb.com" class="tm-social-link "><i class="fab fa-facebook tm-social-icon"></i></a>
                <a href="https://twitter.com" class="tm-social-link "><i class="fab fa-twitter tm-social-icon"></i></a>
            </div>
            <p class="tm-person-about" style="font-weight: 700; font-size: 16px;">${Tin_tuc.Tom_tat}</p>
            <img src="http://localhost:1001/${Tin_tuc.Ma_so}.jpg" alt="Image" class="img-fluid tm-person-img"
        style="width:50rem; height: 30rem">
        <p class="tm-person-about">${Tin_tuc.Noi_dung}</p>
        </figcaption>
    </figure>

  `
    the_hien.innerHTML = Chuoi_HTML;
    Th_Thong_bao.innerHTML = `${Tin_tuc.Nhom_Tin_Tuc.Ten}`;
    return the_hien
}
//tạo thể hiện menu cũ
function Tao_the_hien_Header_Menu_cu(Vitri) {

    var Chuoi_HTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <div id="Th_Logo">

            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#"><div id="">Home</div></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="news.html">News</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Services</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact</a>
                </li>
                <li class="nav-item">
                    <input placeholder="Search ..." type="text" class="btn btn-outline-danger" onkeyup="KeyCode(event)"
                    style="width:20rem" id="Th_gtTim">
                    <i class="fa fa-search mr-3" id="Th_Tim"></i>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link search" id="search">
                    <i class="ti-search"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                    </a>

                </li>
                </ul>
            </div>
        </div>
        <div class="fixed-top text-right mr-2 mt-5" id="Th_Mua_hang">
        <span class="text-white bg-danger btn border border-danger">
          <u id="Th_Gio_hang">0</u>
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </span>
      </div>
  
    </nav>
  `
    Vitri.innerHTML = Chuoi_HTML;
 
}

//tạo thể hiện menu mới
function Tao_the_hien_Header_Menu(Vitri) {
    var list_pages = document.createElement("ul");
    list_pages.setAttribute("class", "navbar-nav ml-auto");
    //1_home
    var page_home = document.createElement("li");
    page_home.setAttribute("class", "nav-item");
    page_home.innerHTML = `<a class="nav-link" href="index.html"><div id="">Home</div></a>`
    list_pages.appendChild(page_home);
    
    //2_news
    var page_news = document.createElement("li");
    page_news.setAttribute("class", "nav-item");
    page_news.innerHTML = `<a class="nav-link" href="news.html">News</a>`
    list_pages.appendChild(page_news);
    //3_about
    var page_about = document.createElement("li");
    page_about.setAttribute("class", "nav-item");
    page_about.innerHTML = `<a class="nav-link" href="#">About</a>`
    list_pages.appendChild(page_about);
    //4_services
    var page_services = document.createElement("li");
    page_services.setAttribute("class", "nav-item");
    page_services.innerHTML = `<a class="nav-link" href="#">Services</a>`
    list_pages.appendChild(page_services);
    //5_contact
    var page_contact = document.createElement("li");
    page_contact.setAttribute("class", "nav-item");
    page_contact.innerHTML = `<a class="nav-link" href="#">Contact</a>`
    list_pages.appendChild(page_contact);
    //6_search field
    var search_field = document.createElement("li");
    search_field.setAttribute("class", "nav-item");
    search_field.innerHTML = `<input placeholder="Search ..." type="text" class="btn btn-outline-danger" onkeyup="KeyCode(event)"
    style="width:20rem" id="Th_gtTim">
    <i class="fa fa-search mr-3" id="Th_Tim"></i>`
    list_pages.appendChild(search_field);
    //7_search_icon
    var search_icon = document.createElement("li");
    search_icon.setAttribute("class", "nav-item");
    search_icon.innerHTML = `<a href="#" class="nav-link search" id="search">
    <i class="ti-search"></i>
    </a>`
    list_pages.appendChild(search_icon);
    //8_account_icon
    var account_icon = document.createElement("li");
    account_icon.setAttribute("class", "nav-item");
    account_icon.innerHTML = `<a class="nav-link" href="#">
    <i class="fa fa-user-circle" aria-hidden="true"></i>
    </a>`
    list_pages.appendChild(account_icon);
    var chuoi = list_pages.innerHTML;
    console.log(chuoi);
    var Chuoi_HTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <div id="Th_Logo">

            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">`
            + list_pages.innerHTML + 
              
            `</ul>
            </div>
        </div>
        <div class="fixed-top text-right mr-2 mt-5" id="Th_Mua_hang">
        <span class="text-white bg-danger btn border border-danger">
          <u id="Th_Gio_hang">0</u>
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </span>
      </div>
    </nav>
  `
    
    Vitri.innerHTML = Chuoi_HTML;
    
}

//tạo danh sách item trong menu
function Tao_list_item_Menu() {
    //var list_pages = document.createElement("ul");
    //list_pages.setAttribute("class", "navbar-nav ml-auto");
    var list_pages = [];
    //1_home
    var page_home = document.createElement("li");
    page_home.setAttribute("class", "nav-item");
    page_home.innerHTML = `<a class="nav-link" href="index.html"><div id="">Home</div></a>`
    list_pages.push(page_home);
    //var page_home_ob = JSON.parse(page_home);
    //list_pages.push(page_home_ob);
    //2_news
    var page_news = document.createElement("li");
    page_news.setAttribute("class", "nav-item");
    page_news.innerHTML = `<a class="nav-link" href="news.html">News</a>`
    list_pages.push(page_news);
    //3_about
    var page_about = document.createElement("li");
    page_about.setAttribute("class", "nav-item");
    page_about.innerHTML = `<a class="nav-link" href="#">About</a>`
    list_pages.push(page_about);
    //4_services
    var page_services = document.createElement("li");
    page_services.setAttribute("class", "nav-item");
    page_services.innerHTML = `<a class="nav-link" href="#">Services</a>`
    list_pages.push(page_services);
    //5_contact
    var page_contact = document.createElement("li");
    page_contact.setAttribute("class", "nav-item");
    page_contact.innerHTML = `<a class="nav-link" href="#">Contact</a>`
    list_pages.push(page_contact);
    //6_search field
    var search_field = document.createElement("li");
    search_field.setAttribute("class", "nav-item");
    search_field.innerHTML = `<input placeholder="Search ..." type="text" class="btn btn-outline-danger" onkeyup="KeyCode(event)"
    style="width:20rem" id="Th_gtTim">
    <i class="fa fa-search mr-3" id="Th_Tim"></i>`
    list_pages.push(search_field);
    //7_search_icon
    var search_icon = document.createElement("li");
    search_icon.setAttribute("class", "nav-item");
    search_icon.innerHTML = `<a href="#" class="nav-link search" id="search">
    <i class="ti-search"></i>
    </a>`
    list_pages.push(search_icon);
    //8_account_icon
    var account_icon = document.createElement("li");
    account_icon.setAttribute("class", "nav-item");
    account_icon.innerHTML = `<a class="nav-link" href="#">
    <i class="fa fa-user-circle" aria-hidden="true"></i>
    </a>`
    list_pages.push(account_icon); 
    return list_pages;
}
function Ghi_Phieu_Dat_hang(DsPhieu_dat) {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `index_Para=GHI_PHIEU_DAT_HANG`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_Goi = JSON.stringify(DsPhieu_dat)
    Xu_ly_HTTP.send(Chuoi_Goi)
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    return Chuoi_JSON
}


//==============================================================================
// Xử lý biến Số nguyên
function Nhap_So_nguyen_duong(Th_So_nguyen) {
    var Kq = {}
    Kq.So_nguyen = parseInt(Th_So_nguyen.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_nguyen) && Kq.So_nguyen > 0
    return Kq
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
// Xử lý Biến Số thực
function Nhap_So_thuc_duong(Th_So_thuc) {
    var Kq = {}
    Kq.So_thuc = parseInt(Th_So_thuc.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_thuc) && Kq.So_thuc > 0
    return Kq
}

function Tao_Chuoi_The_hien_So_thuc_duong(So_thuc, So_so_le) {
    So_thuc = parseFloat(So_thuc)
    var Chuoi_The_hien = ""
    if (!So_so_le)
        So_so_le = 2
    var Thanh_phan_con = So_thuc
        .toFixed(So_so_le)
        .split(".")
    Chuoi_The_hien = Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[0])
    if (Thanh_phan_con.length == 2 && parseInt(Thanh_phan_con[1]) != 0 && So_so_le > 0)
        Chuoi_The_hien += "," + Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[1])
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Tien(So_tien, n) {
    if (!n)
        n = 0

    var Chuoi_The_hien = Tao_Chuoi_The_hien_So_thuc_duong(So_tien, n)

    return Chuoi_The_hien
}

// Xử lý với Biến Ngày
function La_Ngay_Hien_hanh(Ngay) {
    var Ngay_Hien_hanh = new Date()
    Ngay = new Date(Ngay)
    var Kq = Ngay_Hien_hanh.getDate() == Ngay.getDate() &&
        Ngay_Hien_hanh.getMonth() == Ngay.getMonth() &&
        Ngay_Hien_hanh.getFullYear() == Ngay.getFullYear()

    return Kq
}

function Tao_Chuoi_The_hien_Ngay(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getDate() + "/" + (Ngay.getMonth() + 1) + "/" + Ngay.getFullYear()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Gio(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getHours() + ":" + Ngay.getMinutes() + ":" + Ngay.getMinutes()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Ngay_Gio(Ngay) {
    var Chuoi_The_hien = Tao_Chuoi_The_hien_Ngay(Ngay) + " " + Tao_Chuoi_The_hien_Gio(Ngay)
    return Chuoi_The_hien
}

function Kiem_tra_Ngay(Chuoi_ngay) {
    var Thanh_phan_con = Chuoi_ngay.split("/")
    var Hop_le = Thanh_phan_con.length == 3 && !isNaN(Thanh_phan_con[0]) && !isNaN(Thanh_phan_con[1]) && !isNaN(Thanh_phan_con[2])
    if (Hop_le) {
        var Ng = parseInt(Thanh_phan_con[0])
        var Th = parseInt(Thanh_phan_con[1])
        var Nm = parseInt(Thanh_phan_con[2])
        var So_ngay_cua_Th = new Date(Nm, Th, 0).getDate()
        // var So_ngay_cua_Th = new Date(Nm, Th+1 , 0).getDate()
        Hop_le = Ng >= 1 && Ng <= So_ngay_cua_Th && Th >= 1 && Th <= 12 && Nm > 0
    }
    return Hop_le
}

function Nhap_Ngay(Th_Ngay) {
    var Kq = {}
    var Chuoi_Ngay = Th_Ngay
        .value
        .trim()
    Kq.Hop_le = Kiem_tra_Ngay(Chuoi_Ngay)
    if (Kq.Hop_le) {
        var Thanh_phan_con = Chuoi_ngay.split("/")
        Kq.Ngay = new Date(Thanh_phan_con[1] + "-" + Thanh_phan_con[0] + "-" + Thanh_phan_con[2])
    }

    return Kq
}
