var MongoClient = require('mongodb').MongoClient;

var DbConnection = function(){
    var db = null;
    var instance = 0;

    async function DbConnect(){
        try {
            var url = 'mongodb+srv://client2:Meotihon1@myfirstserver-goi2a.gcp.mongodb.net/test?retryWrites=true&w=majority';
            var Connect = await MongoClient.connect(url , {useNewUrlParser:true});
            return Connect.db('Environment');
        } catch (error) {
            return error;
        }
    }

    async function Get(){
        try {
            instance++;
            console.log(`Number of database connections for : ${instance} times`);

            if(db != null){
                console.log(`Connect database was exist`);
                return db;
            }
            else {
                console.log(`Create a new database connect`);
                db = await DbConnect();
                return db;
            }
        } catch (error) {
            return error;
        }
    }

    return {
        Get : Get
    }
}

module.exports = DbConnection();