var socket = io();


var input = document.querySelector("#chat");
var search = document.querySelector("#prompt");
var prompt = document.querySelector(".prompt");
var btn1 = document.querySelector("#btn1");
var btn2 = document.querySelector("#btn2");
let msg = document.querySelector(".right");
let apnmsg = document.querySelector(".left");
let typing = document.getElementById("typing");
let name = document.getElementById("usr-name");
var pop = document.querySelector("#pop")
var usr = document.querySelector(".message")
var online = document.querySelector("#left");
var onl = document.querySelector(".online");
var alluser = document.querySelector("#allusers");




var time = new Date();
btn1.addEventListener("click", function () {
    socket.emit("message", { msg: input.value, user: search.value, time: time.toLocaleTimeString() });
    socket.emit("apnmessage", input.value);
    input.value = " ";
    typing.innerHTML = ""

})

socket.on("message", function (val) {
    // msg.innerHTML += `<div class="msg">${val}</div>`
    msg.innerHTML += `
                     <div class="message">
                        <div class="nm">@${val.user}</div>
                        <div class="msg">${val.msg}</div>
                        <div class="time">${val.time}</div>


                     </div>
                    `
})

socket.on("apnmessage", function (val) {
    apnmsg.innerHTML += `<div class="apnmsg">${val}</div>`
})

btn2.addEventListener("click", function () {
    socket.emit("new-joined", search.value);

    prompt.style.display = "none";
})

socket.on("new-joined", function (res) {
    // name.innerHTML = `<div class="name">${res}</div>`
    pop.innerHTML = ` <h6>${res} joined the chat</h6>`
    setTimeout(function () {
        pop.innerHTML = ""
        pop.style.backgroundColor = "none";
    }, 3000)
    pop.style.backgroundColor = "yellow";
    online.innerHTML += `<div class="online">
                            <div class="cir"></div>
                            <div class="onl">@${res}</div>
                        </div>`
    alluser.innerHTML += ` <div class="usr">@${res}</div> `
})
socket.on("user-dis", function (user) {
    pop.innerHTML = ` <h6>${user} left the chat</h6>`
    setTimeout(function () {
        pop.innerHTML = ""
        pop.style.backgroundColor = "none";

    }, 3000)
    pop.style.backgroundColor = "yellow";
    onl.innerHTML = "";

})
input.addEventListener("input", function (val) {
    socket.emit("typing", { val: val, user: search.value });
})

socket.on("typing", function (typ) {
    typing.innerHTML = `<div class="typing">${typ.user} is typingg...</div>`
    setTimeout(function () {
        typing.innerHTML = ""
    }, 3000)
})




