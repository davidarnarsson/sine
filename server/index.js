const app = require('express')();
const { resolve } = require('path'); 
const http = require('http').Server(app);
const io = require('socket.io')(http);
const serveStatic = require('serve-static'); 

io.origins('*:*') // for latest version
let hammerSockets = []; 

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const piano = io
  .of('/piano')
  .on('connection', p => {
    console.log(`Piano ${p.id} connected!`);

    p.on('note', msg => {
      const availableHammer = randomElement(hammerSockets)
      if (availableHammer) {
        console.log(`Playing on hammer ${availableHammer.id}`);      
        availableHammer.socket.emit('note', msg);
      }
    });
  });

const hammers = io
  .of('/hammer')
  .on('connection', h => {
    hammerSockets.push({id: h.id, socket: h, playing: false }); 
    console.log(`Hammer ${h.id} connected!`);

    h.on('playing', (msg) => {
      console.log(`Hammer ${h.id} ${msg.playing ? 'started' : 'stopped'} playing`);
      hammerSockets.find(x => x.id == h.id).playing = msg.playing; 
    });

    h.on('disconnect', () => {
      console.log(`Hammer ${h.id} disconnected!`);
      const socketIndex = hammerSockets.indexOf(hammerSockets.find(x => x.id == h.id)); 
      hammerSockets = [...hammerSockets.slice(0, socketIndex), ...hammerSockets.slice(socketIndex + 1)];
      console.log(hammerSockets.map(x => x.id))
    });
  });

app.use(serveStatic(resolve(__dirname, '..', 'build')));

http.listen(3001, () => {
  console.log("Listening on 3001...");
})