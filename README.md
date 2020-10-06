# Chat-App-

Here we are using the Socket.io library

1) Socket.emit() : Emits only to the person to himself only .
2) socket.broadcast.emit() : Emits to the all the others present in the room but not to the person emitting it .
3) io.emit() : Emits event to all the people including to the person emitting it .


Emit method e.g :-- 
-----> It takes event to be emitted and parameters,callback(optional) to be passed .
io.emit("newMessage",{
   .......takes the parameters to be passed .
}) :

On method e.g :--
------>It takes event to be listened and the function for taking parameters and the callback funtion to be performed (optional).
io.on("newMessage",funtion(message){},callback)

I have also used :---
1) Expect,Mocha :- To test the methods and all that.
2) Mustache     :-- For creating the custom script to be used for HTML formating.
3) Moment       :-- For Time Formatting.
