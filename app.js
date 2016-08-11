var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var swig = require('swig');
swig.setDefaults({ cache: false });

app.use(express.static( __dirname + '/public'));
app.use(morgan('combined'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/', function(req, res){
  res.render('index', {});
});

var models = require('./models');

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);