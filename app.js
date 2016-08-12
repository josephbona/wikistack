var express = require('express');
var app = express();
var Promise = require('bluebird');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var swig = require('swig');
swig.setDefaults({ cache: false });

app.use(express.static( __dirname + '/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/', require('./routes'));

var models = require('./models');

// return models.Page.sync({force:true})
Promise.all([models.User.sync({}), models.Page.sync({})])
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);