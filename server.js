var http = require('http') 
const fs = require('node:fs');
const express = require('express');
const session = require('express-session');
const formidable = require('formidable');
const ejs = require('ejs');
const path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views/style_logged')));
app.use(express.static(path.join(__dirname, 'views/style_login')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', express.static(path.join(__dirname, 'api')));
app.use(express.static(path.join(__dirname, 'database')));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false,
}));

function checkLogin(username, pass) {
    if(fs.existsSync("./database/accounts.json")) {
        let date = fs.readFileSync("./database/accounts.json");
        ob = JSON.parse(date);
     
        for (i in ob) {
            if (ob[i].username == username && ob[i].password == pass) {
                return username;
            }
        }
    }

    return false;
}


app.post('/login', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        let user = checkLogin(fields.username, fields.password);
        if(user) {
            req.session.username = user;            
            res.redirect('/chat'); 
        }
        else {
            req.session.username = false;
            res.redirect('/');
        }  
    });
});

app.post('/register', function(req, res) {
    res.render('register.ejs');
});

app.post('/register_form', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        let user = checkLogin(fields.username, fields.password);
        if(user) {
            res.redirect('/'); 
        }
        else {
            let date = fs.readFileSync("./database/accounts.json");
            ob = JSON.parse(date);

            const newUser = {
                username: fields.username[0],
                password: fields.password[0],
            };

            ob.push(newUser);

            fs.writeFileSync("./database/accounts.json", JSON.stringify(ob));

            res.redirect('/');
        }  
    });
});

app.get('/chat', function(req, res) {
    res.render('logged.ejs', {
        'username':  req.session.username
    });
});

app.get('/', function(req, res) {
    res.render('login.ejs');
});

app.get('/logout', function(req, res) {
    req.session.username = false;
    res.redirect('/');
});

app.listen(8000);