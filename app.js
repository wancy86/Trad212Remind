//use express as the web framework
//use the nodemailer as the email server
//TODO and ia need to 



var express = require('express');
var app = express();


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

app.set("views","./views");
app.set("view engine","jade");
app.engine('jade', require('jade').__express);


//set the index page
app.get('/', function(req, res){
  res.send('Hello Mark Xiao.');
});

//use template engine
app.get('/index', function(req, res){
  res.render("index",{title:"hey",message:"Hello jade engine."});
});

app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});


//-----------------------------------test for NodeEmailer
var nodemailer = require('nodemailer');


//Note: Need the email supported with pop3/imap to get all the emials.
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'sina',
    auth: {
        user: 'wancy86@sina.com',
        pass: 'mark_sina'
    }
});

var transporter0 = nodemailer.createTransport({
    service: 'sina',
    auth: {
        user: 'trad212remind@sina.com',
        pass: 'trad212'
    }
});

var transporter1 = nodemailer.createTransport({
    service: '126',
    auth: {
        user: 'wancy86@126.com',
        pass: 'anscbxwbmsotxxzh'//网易的授权码
    }
});


var transporter2 = nodemailer.createTransport({
    service: '126',
    auth: {
        user: 'trad212remind@126.com',
        pass: 'trad212'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'wancy86@126.com', // sender address
    to: '461151239@qq.com, wancy86@126.com, trad212remind@sina.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};

app.get("/email",function(req,res){
	res.send("send email");
	transporter1.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
})



//------------------------------------test use
// app.use(function (req, res, next) {
//   console.log('Time: %d', Date.now());
//   next();
// });



//------------------------------------001
//post data to server
//test with: http://localhost:3000/data/mark%20is%20the%20best
//rendered: mark is the best
app.get('/data/a',function(req,res){
    //console.log(req.params[0]);
    res.send(new Date().toLocaleTimeString()+': '+req.params[0]);
});

//test with: http://localhost:3000/data/1434030593861/60.67/60.62
var str='';
app.get('/data/:time/:buy/:sell',function(req,res){
    var sub=req.params.time + ' - ' + req.params.buy + ' - ' + req.params.sell;
    str+=sub+ '<br/>';
    console.log(sub);
    res.send(str);
});


//------------------------------------001
//TODO: check the news of OIL on sina site
//TODO: if there is new news send the email and link
//TODO: news_remind.js


//------------------------------------002
//TODO: Post data to MongoDB
//TODO: R program analysis the data and call EmailReminder



