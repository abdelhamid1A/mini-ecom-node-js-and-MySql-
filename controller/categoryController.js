const mysql = require('mysql');
const random = require('random-int');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'miniecom'
  });


addCategory = (req,res)=>{
    console.log(req.body.name)
    // connection.connect();
    var ran =random(2147483647);
    console.log(ran)
    var sql = "INSERT INTO category (id_category,name) VALUES (?,?) ";
    connection.query(sql,[ran,req.body.name],(err,data)=>{
      if(err) throw err;
      res.redirect('/addcategory')
    //   connection.end();
    })
  
}


getAllCategory = (req,res)=>{
    // connection.connect();
    var sql = "SELECT * FROM category";
    connection.query(sql,(err,data)=>{
      if(err) throw err;
      console.log(data)
      res.render('interfaces/addproduct',{category:data});
    //   connection.end();
    })
    
   }
module.exports = {
    addCategory,
    getAllCategory
}