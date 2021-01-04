const mysql = require('mysql');
const express = require('express');
const expressHbs = require('express-handlebars');
const productController = require('./controller/productController');
const randomInt = require('random-int');

const app = express();


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'miniecom'
  });

//   testing if connected or not 
//   connection.connect((error)=>{
//       if(error){
//           console.log(error)
//       }else{
//           console.log('connected')
//       }
//   });
app.engine('.hbs',expressHbs({defaultLayout : 'layout' , extname : '.hbs'}));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/addproduct',(req,res)=>{
  // console.log(randomInt(18446744073709551615));
  res.render('interfaces/addproduct')
})
app.post('/addproduct',productController.addProduct)

app.listen(3000,()=>{
  console.log('server run ...')
})