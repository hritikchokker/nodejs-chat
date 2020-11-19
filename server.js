const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');
const server = require('http').createServer(app);
// const port = process.env.PORT || 1234;
// {
//     cors: {
//         origin: '*',
//             methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
//     }
// }
const io = require('socket.io')(server,{
    origins:'*:*'
});
io.set('origins', '*:*');


// module.exports.io = io;
io.on('connection', (socket) => {
    console.log('new connection')
    socket.on('my message', (msg) => {

        console.log(msg, 'message from client')
        socket.emit('message recieved', `new message ${msg}`)
    })
})


// const DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
// );

// mongoose
//     .connect(DB, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useUnifiedTopology:true,
//         useFindAndModify: false
//     })
//     .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 1234;
// const server = app.listen(port, () => {
//     console.log(`App running on port ${port}...`);
// });

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});

server.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})