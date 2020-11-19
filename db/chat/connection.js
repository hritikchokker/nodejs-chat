const {io} = require('../../server');

console.log(io,'io')
io.on('connection',(socket)=>{
    console.log('new connection')
})