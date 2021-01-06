const mysql = require('mysql');
const random = require('random-int');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'miniecom',
    multipleStatements : true
  });

addProduct = (req,res)=>{
  var ran =random(2147483647);
  var sql = "INSERT INTO product (id_product,id_category,name,price) VALUES (?,?,?,?) ";
  connection.query(sql,[ran,req.body.category,req.body.name,req.body.price],(err,data)=>{
      console.log(ran)
    if(err) throw err;
    res.redirect('/addproduct');
  })

}

getAll = (req,res)=>{
    var sql = "SELECT product.id_product, product.name AS productName, product.price ,category.name FROM product INNER JOIN category ON product.id_category = category.id_category";
    connection.query(sql,(err,data)=>{
      if(err) throw err;
      console.log(data)
      res.render('interfaces/allproduct',{product:data});
    })
    
}
    
updateProduct = (req,res)=>{
    var sql = "SELECT product.id_product ,product.name AS productName, product.price ,product.id_category, category.name FROM product INNER JOIN category ON product.id_category=category.id_category WHERE id_product = ? ; SELECT * FROM category; ";
    connection.query(sql,[req.params.id],(err,data)=>{
        if(err) throw err
        console.log('------------------------------------')
        console.log(data[0]);
        console.log('------------------------------------')
        console.log(data[1])
        res.render('interfaces/updateproduct',{product:data[0],category:data[1]})
        // res.send(data[0]);
        // res.send(data[1])
        
    }) 
}
saveNewData = (req,res)=>{
  var sql = "UPDATE product SET name=?, id_category=? , price=? WHERE id_product=?"
  connection.query(sql,[req.body.name,req.body.category,req.body.price,req.body.idProduct],(err,data)=>{
    if(err) throw err
    res.redirect('allproduct')
  })
}
 
deleteProduct = (req,res)=>{
    var sql = "DELETE FROM product WHERE id_product = ?"
    connection.query(sql,[req.params.id],(error,result)=>{
        if(error) throw error;
        res.redirect('/allproduct');
    })
}

module.exports = {
    addProduct,
    getAll,
    updateProduct,
    deleteProduct,
    saveNewData
}