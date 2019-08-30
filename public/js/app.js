console.log('Helloooo');


// let routeMatrix = [{
//     RouteID: 5,
//     Description: 'Seattle / Bainbridge Island',
//     DepartingTerminalID: 7,
//     DepartingTerminalName: 'Seattle',
//     ArrivingTerminalID: 3,
//     ArrivingTerminalName: 'Bainbridge Island'
//   },
//   {
//     RouteID: 5,
//     Description: 'Seattle / Bainbridge Island',
//     DepartingTerminalID: 3,
//     DepartingTerminalName: 'Bainbridge Island',
//     ArrivingTerminalID: 7,
//     ArrivingTerminalName: 'Seattle'
//   }
// ]


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

$(document).ready(function() {
  $('#journeys').DataTable();
} );


// let preferred_terminal_on_route = document.getElementById('preferred_terminal_on_route'); 
// let preferred_departure = document.getElementById('preferred_departure'); 


// document.getElementById('preferredrouteid').addEventListener('change', (event) => {
//   // console.log(event.target.value);

//   console.log(event.target.value);

// });

let loc = document.getElementById('location');
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    loc.innerHTML = 'Location request not supported. Your browser blows. You really should updgrade. Not just for the better features but for the vastly improved security.';
  }
}

// To remove after debugging.
function showPosition(position) {
  loc.innerHTML = "Location: " + position.coords.latitude + " / " + position.coords.longitude;
}
