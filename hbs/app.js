var express = require('express');
var exphbs  = require('express-handlebars');
const numeral = require('numeral');
const morgan =require('morgan');
const hbs_sections = require('express-handlebars-sections');
require('express-async-errors');
const session = require('express-session');

var app = express();
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: {
  //     secure: true
  // }
}))

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    helpers: {
      section: hbs_sections(),
      format: val => numeral(val).format('0,0') + "  VND"
    }
  }));

app.set('view engine', 'hbs');

app.get("/",function(req,res){
    res.render('Online_Auction');
});

///
require('./middlewares/locals.mdw')(app);
require('./middlewares/routes.mdw')(app);
///

//error-handling
app.use((req,res,next)=>{
  res.send('You are lost');
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('View error  on console');
});
///

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})