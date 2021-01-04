const mysql = require('mysql');
const randomInt = require('random-int');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'miniecom'
  });

addProduct = (req,res)=>{
  console.log(req.body.name)
  var ran =randomInt(18446744073709551615);
  var sql = "INSERT INTO product (id_product,id_category,name,price) VALUES (?,?,?,?) ";
  connection.query(sql,[ran,req.body.category,req.body.name,req.body.price],(err,data)=>{
    if(err) throw err;
    res.redirect('/addproduct')
  })
  


}


module.exports = {
    addProduct
}