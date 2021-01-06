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
      res.redirect('/')
    //   connection.end();
    })
  
}


getAllCategory = (req,res)=>{
    var sql = "SELECT * FROM category";
    connection.query(sql,(err,data)=>{
      if(err) throw err;
      console.log(data)
      res.render('interfaces/addproduct',{category:data});
    })
    
   }
showAllCategory = (req,res)=>{
  var sql = "SELECT * FROM category";
    connection.query(sql,(err,data)=>{
      if(err) throw err;
      console.log(data)
      res.render('interfaces/allcategory',{category:data});
    })
}

deleteCategory = (req,res)=>{
  var sql = "DELETE FROM category WHERE id_category = ?"
  connection.query(sql,[req.params.id],(error,result)=>{
      if(error) throw error;
      res.redirect('/allcategory');
  })
}
getOneCategory = (req,res)=>{
  var sql = "select * from category where id_category = ?"
  connection.query(sql,[req.params.id],(err,data)=>{
    if(err) throw err
    res.render('interfaces/updatecategory',{category:data})
  })
}

updateCategory = (req,res)=>{
  var sql = "UPDATE category SET name = ? WHERE id_category =?" ;
  connection.query(sql,[req.body.name,req.body.id_category],(err,data)=>{
    if(err) throw err
    res.redirect('/allcategory')
  })

}

module.exports = {
    addCategory,
    getAllCategory,
    showAllCategory,
    deleteCategory,
    getOneCategory,
    updateCategory
}