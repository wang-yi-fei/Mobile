var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var url = require('url');
//var mime = {
//    '.css':'text/css',
//    '.js':'application/x-javascript',
//    '.html':'text/html',
//}
http.createServer(function (req,res) {

    /*res.write('hello');
     res.end('world');
     */
    /*console.log(req.url);
     console.log(req.method);
     console.log(req.headers);
     */
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname=='/favicon.ico'){
        res.statusCode = 404;
        res.end();
    }else if(pathname=='/clock'){
        res.end(new Date().toLocaleString())
    }else if(pathname=='/'){
        res.setHeader('content-type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else{
        if(fs.existsSync('.'+pathname)){
            res.setHeader('content-type',mime.lookup(pathname)+';charset=utf8')
            fs.createReadStream('.'+pathname).pipe(res);
        }else{
            res.end('404');
        }

    }
    /*fs.readFile('./hello.html', function (err,data) {
     res.end(data)
     });
     */


}).listen(3000);