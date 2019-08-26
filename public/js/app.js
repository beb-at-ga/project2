console.log('Helloooo');

// const socket = io();
// const chatFormEl = document.getElementById('chat-form');


// chatFormEl.addEventListener('submit', (e) => {
//   e.preventDefault();
//   let message = e.target.chat.value;
//   let name = e.target.name.value;

//   let obj = {
//     name,
//     message
//   }

//   socket.emit('chat message', obj);
//   e.target.chat.value = '';

// });

// socket.on('chat message', (msg) => {
//   let p = document.createElement('p');
//   p.innerText = `${msg.name} says: ${msg.message}`;
//   document.getElementById('messages').appendChild(p);
// })



// document.addEventListener('DOMContentLoaded', () => {
//   var elems = document.querySelectorAll('.modal');
//   var instances = M.Modal.init(elems, {
//     // options here.
//   });
// });


let x = document.getElementById("location");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Location request not supported. Your browser blows. You really should updgrade. Not just for the better features but for the vastly improved security.";
  }
}
// To remove after debugging.
function showPosition(position) {
  x.innerHTML = "Location: " + position.coords.latitude + " / " + position.coords.longitude;
  // socket.emit('coords', {
  //   lat: position.coords.latitude,
  //   lng: position.coords.longitude
  // });
}
