const app = require('express')();
const { resolve } = require('path'); 
const http = require('http').Server(app);
const io = require('socket.io')(http);
const serveStatic = require('serve-static'); 

io.origins('*:*') // for latest version
let hammerSockets = []; 

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const notPlaying = () => hammerSockets.find(x => !x.playing)
const piano = io
  .of('/piano')
  .on('connection', p => {

    p.emit('hammers', hammerSockets.map(x => ({id: x.id, name: x.name})));
    p.on('note', msg => {
      let hammer

      if (msg.id) {
        hammer = hammerSockets.find(x => x.id === msg.id);
      } else {
        hammer = notPlaying() || randomElement(hammerSockets);
      }
      
      if (hammer) {
        hammer.socket.emit('note', msg);
      }
    });
  });

const hammers = io
  .of('/hammer')
  .on('connection', h => {
    hammerSockets.push({id: h.id, socket: h, playing: false, name: 'Anonymús' }); 
    piano.emit('new-hammer', { id: h.id, name: 'Anonymús' })

    h.on('name', msg => {
      hammerSockets.find(x => x.id == h.id).name = msg.name
      piano.emit('hammer-name', { id: h.id, name: msg.name });
    });

    h.on('playing', (msg) => {
      hammerSockets.find(x => x.id === h.id).playing = msg.playing; 
    });

    h.on('disconnect', () => {
      const socketIndex = hammerSockets.indexOf(hammerSockets.find(x => x.id == h.id));
      hammerSockets = [...hammerSockets.slice(0, socketIndex), ...hammerSockets.slice(socketIndex + 1)];

      piano.emit('hammer-disconnect', { id: h.id });
    });
  });

app.use(serveStatic(resolve(__dirname, '..', 'build')));

http.listen(process.env.PORT || 3001, () => {
  console.log("Listening on 3001...");
})