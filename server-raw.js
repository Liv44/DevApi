import http from 'http'

const server = http.createServer((request, response)=>{
    if(request.url === '/api/products' && request.method === 'GET'){
        response.writeHead(200, {'Content-type': 'application/json'})
        response.end(JSON.stringify({
            id:1,
            name:"Iphone",
            color:"Black",
        }));
    }else{response.writeHead(404, {'Content-type': 'application/json'})
    response.end(JSON.stringify({
       message: 'Route not found, please use api/products endpoint'
    }));
        
    }
    // response.setHeader('Content-type', 'text/html')
    // response.write('<h1>Hello<h1>')
    // response.write('<h2>How are you ?</h2>')
    // console.log(request);
    response.end()
})

const PORT = process.env.PORT || 5001

server.listen(PORT, ()=> console.log(`Serveur running on port ${PORT}`))