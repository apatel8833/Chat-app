








const { Socket } = require("socket.io");


const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var users ={}
io.on( "connection", function(socket) {
    console.log("Connected..!!")
    socket.on("message",function(data){
        socket.broadcast.emit("message",data)
    })
    socket.on("apnmessage",function(data){
        socket.emit("apnmessage",data)
    })
    socket.on("new-joined",function(user){
        users[socket.id]= user
        socket.broadcast.emit("new-joined",user);
    })
    socket.on("disconnect",function(){
        socket.broadcast.emit("user-dis",user = users[socket.id])
        delete users[socket.id]
    })

    socket.on("typing",function(val){
        // console.log(val);
        socket.broadcast.emit("typing",val);

    })
});
module.exports = socketapi;