var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
	console.log('Please appoint the port number\n Like node server.js 8888')
	process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method
  /****************************************/
  console.log('HTTP Path:\n'+path)
  if(path == '/'){
	  response.setHeader('Content-Type','text/html;charset=utf-8')
	  response.write('<!DOCTYPE>\n'+
	  '<html>'+
	  '<head><link rel="stylesheet" href="/style.css"></head>'+
	  '<body><h1>Hello World</h1><script src="/main.js"></script></body>'+
	  '</html>'
	  )
	  response.end()
	}else if(path == '/style.css'){
		response.setHeader('Content-Type','text/css;charset=utf-8')
		response.write('body{background-color:#ddd;}h1{color:red}')
		response.end()
	}else if(path == '/main.js'){
		response.setHeader('Content-Type','text/javascript;charset=utf-8')
		response.write('alert("JS alert")')
		response.end()
	}else{
		response.statusCode = 404
		response.end()
	}
})

server.listen(port)
console.log('Listen'+port+'Success\n Please open http://localhost:'+port)
