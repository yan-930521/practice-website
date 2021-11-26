function draw(ob, r, c) {
  ctx.beginPath();
  ctx.fillStyle = c;
  ctx.arc(ob.x/5, ob.y /5, r, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();
  ctx.save();
}

function bg() {
  ctx.fillStyle = '#3498DB';
  ctx.fillRect(0, 0, ww, ww)
  ctx.fillStyle = 'black';
}
const br = 20/5;
const sr = 5/5;
var canvas = document.createElement('canvas');
canvas.className = 'canvas'
let ww = window.innerWidth;
canvas.width = ww;
let wh = window.innerHeight;
canvas.height = ww;
window.onresize = () =>{
  ww = window.innerWidth;
  canvas.width = window.innerWidth;
  wh = window.innerHeight;
  canvas.height = window.innerHeight;
}
body.appendChild(canvas);
var ctx = canvas.getContext('2d');
bg();

setInterval(()=>{
  socket.emit('watch');
},70);

socket.on('update', data => {
  ctx.clearRect(0, 0, ww, wh);
  bg();
  for (let p in data) {
    if (data[p]['status']) {
      let col = data[p]['color'];
      draw(data[p], br, col);
      for (let b in data[p]['bullets']) {
        if (!data[p]['bullets'][`${b}`]['status']) continue;
        draw(data[p]['bullets'][`${b}`], sr, col);
      }
    }
  }
});