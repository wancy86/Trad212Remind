var request = require('request'),
    cheerio = require('cheerio'),
    http = require('http'),
    url = require('url');

var express = require('express');
var app = express();
var nodemailer = require('nodemailer');


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

app.set("views","./views");
app.set("view engine","jade");
app.engine('jade', require('jade').__express);


var transporter1 = nodemailer.createTransport({
    service: '126',
    auth: {
        user: 'wancy86@126.com',
        pass: 'anscbxwbmsotxxzh'//网易的授权码
    }
});

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
});



var host1= 'http://news.fx678.com/news/oil/index.shtml';
var lasetNews1="";
var timer1 = setInterval(scraper1, 1000*5);//1 分钟更新一次
function scraper1 () {
  var host=host1;
  request(host, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(data);//jquery dom

      //get news list
      //almost impossible to get more than onew news in one minute.
      var news=$('#analysis_ul li').eq(0);
      if(news.html()==lasetNews1)
      {
        console.log(new Date().toLocaleTimeString()+' - FX678.COM - No New message!');
        return;
      }
      else
      {
        lasetNews1=news.html();
        //send email remind
        mailOptions.html=lasetNews1;
        mailOptions.subject='原油消息 - FX678';
        transporter1.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });
      }//end email send

    }//end of status 200

  });//end request

}//end scraper



var host2= 'http://oil.com/latest-news/';
var lasetNews2="";
var timer2 = setInterval(scraper2, 1000*5);//1 分钟更新一次
function scraper2 () {
  var host=host2;
  request(host, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(data);//jquery dom

      //get news list
      //almost impossible to get more than onew news in one minute.
      var news=$("#left_column .content").eq(0);
      if(news.html()==lasetNews2)
      {
        console.log(new Date().toLocaleTimeString()+' - OIL.COM - No New message!');
        return;
      }
      else
      {
        lasetNews2=news.html();
        //send email remind
        mailOptions.html=lasetNews2;
        mailOptions.subject='原油消息 - OIL';
        transporter1.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });
      }//end email send

    }//end of status 200

  });//end request

}//end scraper


/*
http.createServer(function (req, res) {
  var path = url.parse(req.url).pathname;
  path = path == '/' ? 0 : parseInt(path.slice(1));
  res.writeHead(200, {"Content-Type":"text/html"});
  res.end(html[path]);
}).listen(3000);

console.log('Server running at localhost:3000');

*/
