const mysql = require('mysql');
const express = require('express');
const expressHbs = require('express-handlebars');
var path = require('path');
const productController = require('./controller/productController');
const categoryController = require('./controller/categoryController');
const randomInt = require('random-bigint');

const app = express();


var connection = mysql.createConnection({
    
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'miniecom',
    multipleStatements: true
    
  });

  // testing if connected or not 
  connection.connect((error)=>{
      if(error){
          console.log(error)
      }else{
          console.log('connected')
      }
  });
app.engine('.hbs',expressHbs({defaultLayout : 'layout' , extname : '.hbs'}));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
  res.render('interfaces/home')
})
app.get('/addproduct',categoryController.getAllCategory)
app.get('/addcategory',(req,res)=>{
  res.render('interfaces/addcategory')
})
app.get('/allproduct',productController.getAll)

app.get('/update/:id',productController.updateProduct)
app.get('/delete/:id',productController.deleteProduct)

app.post('/addproduct',productController.addProduct)
app.post('/addcategory',categoryController.addCategory)
app.post('/updateproduct',productController.saveNewData)


app.get('/allcategory',categoryController.showAllCategory)
app.get('/deletecategory/:id',categoryController.deleteCategory),
app.get('/updatecategory/:id',categoryController.getOneCategory)
app.post('/updatecategory',categoryController.updateCategory);

app.listen(3000,()=>{
  console.log('server run ...')
})