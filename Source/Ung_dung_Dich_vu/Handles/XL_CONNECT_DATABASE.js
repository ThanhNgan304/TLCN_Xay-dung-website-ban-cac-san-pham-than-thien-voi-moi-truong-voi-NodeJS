var File = require('fs');
var DbConnection = require('../Handles/XL_CONNECT_MONGODB');

function Read_info_Service(){
    var link = "index.html";
    var string_Info = File.readFileSync(link, "UTF-8");
    return string_Info;
}

class XL_Connect_Database{
    Read_info_Service(){
        return Read_info_Service();
    }

    async Read_info_Store(){
        try {
            var db = await DbConnection.Get();
            var info_Store = db.collection("Stores").find({}).toArray();
            return info_Store;
        } catch (error) {
            console.log(error);
        }
    }

    // async Read_info_Users(){
    //     try {
    //         var db = await DbConnection.Get();
    //         var info_Users = db.collection("Users").find({}).toArray();
    //         return info_Users;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async Read_info_List_Products(){
        try {
            var db = await DbConnection.Get();
            var info_Products = db.collection("Products").find({}).toArray();
            return info_Products;
        } catch (error) {
            console.log(error);
        }
    }
    async Read_info_List_News(){
        try {
            var db = await DbConnection.Get();
            var info_News = db.collection("News").find({}).toArray();
            return info_News;
        } catch (error) {
            console.log(error);
        }
    }
    async Read_info_List_OfficeEquipments(){
        try {
            var db = await DbConnection.Get();
            var info_OfficeEquipments = db.collection("OfficeEquipments").find({}).toArray();
            return info_OfficeEquipments;
        } catch (error) {
            console.log(error);
        }
    }

    async Read_info_List_ProductLifes(){
        try {
            var db = await DbConnection.Get();
            var info_ProductLifes = db.collection("ProductLifes").find({}).toArray();
            return info_ProductLifes;
        } catch (error) {
            console.log(error);
        }
    }

    async Read_info_List_All(){
       var Stores = await this.Read_info_Store();
       //var Users = await this.Read_info_Users();
        var Products = await this.Read_info_List_Products();
        var OfficeEquipments = await this.Read_info_List_OfficeEquipments();
        var ProductLifes = await this.Read_info_List_ProductLifes();
        var News = await this.Read_info_List_News();
        var obj = {
           "Stores" : Stores,
            //"Users" : Users,
            "Products" : Products,
            "OfficeEquipments" : OfficeEquipments,
            "ProductLifes" : ProductLifes,
            "News": News
        }

        return obj;
    }

    async Write_new_info_Object(Type_Object , Object_s){
        try {
            var db = await DbConnection.Get();
            var results_Pro = db.collection(Type_Object).insert(Object_s);
            return results_Pro;
        } catch (error) {
            console.log(error);
        }
    }

    async Update_info_List_Object(Type_Object, Conditional_Expressions , Values_Update){
        try {
            var db = await DbConnection.Get();
            var results_Pro = db.collection(Type_Object).update(Conditional_Expressions, Values_Update);
            return results_Pro;
        } catch (error) {
            console.log(error);
        }
    }

    async Delete_info_List_Object(Type_Object, Conditional_Expressions){
        try {
            var db = await DbConnection.Get();
            var results_Pro = db.collection(Type_Object).remove(Conditional_Expressions);
            return results_Pro;
        } catch (error) {
            console.log(error);
        }
    }
}

var handle_Data = new XL_Connect_Database();
module.exports = handle_Data;