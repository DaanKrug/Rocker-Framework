const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      env          = process.env;

let server = http.createServer(function (req, res) {
  let url = req.url;
  if (url == '/') {
    url += 'static/index.html';
  }

  // IMPORTANT: Your application HAS to respond to GET /health with status 200
  //            for OpenShift health monitoring

  if (url == '/health') {
    res.writeHead(200);
    res.end();
  } else if (url == '/info/gen' || url == '/info/poll') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo[url.slice(6)]()));
  } else {
    let fileUrl = ('.' + url);
	if(fileUrl.indexOf('?') != -1){
		fileUrl = fileUrl.substring(0,fileUrl.indexOf('?'));
	}
    fs.readFile(fileUrl, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('Not found: ' + err);
      } else {
        let ext = path.extname(url).slice(1);
        if (contentTypes[ext]) {
          res.setHeader('Content-Type', contentTypes[ext]);
        }
        if (ext === 'html') {
          res.setHeader('Cache-Control', 'no-cache, no-store');
        }
        res.end(data);
      }
    });
  }
});

server.listen(4000,'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});
