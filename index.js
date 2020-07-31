require('./models/db');

const express = require('express');
const path = require('path');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
var port = process.env.PORT || 3000;
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')


const instructorController = require('./controllers/instructorController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'hbs');

// session support is required to use ExpressOIDC

app.listen(port, () => {
    console.log('Express server started at port : 3000');
});

app.use('/', instructorController);