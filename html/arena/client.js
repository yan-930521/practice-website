class Bullet {
  constructor() {
    this.type = "bullet";
    this.id = 'x';
    this.r = [];
    this.x = 0;
    this.y = 0;
    this.status = true;
    this.speed = 14;
  }
}

function draw(ob, r, c) {
  ctx.beginPath();
  ctx.fillStyle = c;
  ctx.arc(ob.x - ZeroX, ob.y - ZeroY, r, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();
  ctx.save();
}



function checkway(x, y) {
  if (x < y) {
    return 1;
  }
  if (x > y) {
    return -1;
  }
  if (x == y) {
    return 0;
  }
}

function bg() {
  ctx.fillStyle = '#3498DB';
  ctx.fillRect(0, 0, ww, wh)
  ctx.fillStyle = 'black';
}

function getR(b, p) {
  let a1 = p.x - b.x;
  let a2 = p.y - b.y;
  console.log([a1, a2])
  let a4 = Math.abs(a1) + Math.abs(a2)
  a2 = a2 / a4;
  a1 = a1 / a4;
  console.log([a1, a2])
  return [a1, a2];
}

var canvas = document.createElement('canvas');
canvas.className = 'canvas'
let ww = window.innerWidth;
canvas.width = window.innerWidth;
let wh = window.innerHeight;
canvas.height = window.innerHeight;
var mousex = ww / 2;
var mousey = wh / 2;
var ctx = canvas.getContext('2d');
window.onresize = () =>{
  ww = window.innerWidth;
  canvas.width = window.innerWidth;
  wh = window.innerHeight;
  canvas.height = window.innerHeight;
}

// 登陸
var d1 = document.createElement('div');
d1.id = 'Tilte';

var p1 = document.createElement('p');
p1.innerHTML = '快速開始 （填入遊戲名）';
d1.appendChild(p1);

var p2 = document.createElement('p');
var i1 = document.createElement('input');
i1.type = 'text';
i1.className = 'name';
i1.placeholder="name";
p2.appendChild(i1);
d1.appendChild(p2);

var p3 = document.createElement('p');
p3.className = 'get-btn';
var b1 = document.createElement('input');
b1.type = 'button';
b1.value="start"
p3.appendChild(b1);
d1.appendChild(p3);

var p4 = document.createElement('p');
p4.innerHTML = '登入';
d1.appendChild(p4);

var p5 = document.createElement('p');
var i2 = document.createElement('input');
i2.type = 'text';
i2.className = 'id';
i2.placeholder="id";
p5.appendChild(i2);
d1.appendChild(p5);

var p6 = document.createElement('p');
var i3 = document.createElement('input');
i3.type = 'text';
i3.className = 'password';
i3.placeholder="password";
p6.appendChild(i3);
d1.appendChild(p6);

var d2 = document.createElement('div');
d2.className = 'get-btn2';
var b2 = document.createElement('input');
b2.id = 'one';
b2.type = 'button';
b2.value="Log In";
d2.appendChild(b2);
d1.appendChild(d2);

var b3 = document.createElement('input');
b3.type = 'button';
b3.value="Sign Up";
b3.onclick =() =>{
  location.href = "https://website.sakuraeinfach.repl.co/html/arena/apply.html";
}
d1.appendChild(b3);

body.appendChild(d1);

// 後續驗證

var loginclicked = false;

var Name = 'x';
var Id = 'x';
var Password = 'x';
var Login = false;
var player = 'x';

d2.onclick = () =>{
  Id = i2.value;
  Password = i3.value;
  socket.emit('loginApply',{id: Id, password: Password});
  loginclicked = true;
}

p3.onclick = ()=>{
  Name = i1.value;
  socket.emit('playerRequire',Name);
}

socket.on('loginFalse',p => {
  loginclicked = false;
  if(p == '查無此帳戶') {
    alert('密碼或ID輸入錯誤');
  }
});

var box = document.createElement('ctrl-box');
var ctrl = document.createElement('div');
var ctrl_name = document.createElement('p');
var ctrl_id = document.createElement('p');
var ctrl_color = document.createElement('input');
var ctrl_x = document.createElement('p');
var ctrl_y = document.createElement('p');
var kill = document.createElement('p');
var score = document.createElement('p');
var ping = document.createElement('p');
var bc = document.createElement('p');
var text = document.createElement('p');

// 算子彈數量
var Bcounts = 0;
var Blimit = 10;

// 用來算延遲
var Then = Date.now();

// 計算螢幕位置
var ZeroX = 0;
var ZeroY = 0;

box.className = 'ctrl-box';
ctrl.className = 'ctrl';

ctrl.appendChild(ctrl_name);
ctrl.appendChild(ctrl_id);
ctrl.appendChild(ctrl_color);
ctrl.appendChild(kill);
ctrl.appendChild(score);
ctrl.appendChild(bc);
ctrl.appendChild(ctrl_x);
ctrl.appendChild(ctrl_y);
ctrl.appendChild(ping);
ctrl.appendChild(text);
box.appendChild(ctrl);


const br = 20;

const sr = 5;

var keysDown = {};

var bcount = 0;

bg();

socket.on('message', function (data) {
  text.innerHTML = data.message;
  if (data.message.startsWith('you killed')) {
    player['kills']++;
    Blimit += 5;
    socket.emit('clientupdate', player);
  }
});

socket.on('gameStart', p => {
  loginclicked = false;
  body.style.background = ''
  body.removeChild(d1);
  body.appendChild(box);
  body.appendChild(canvas);

  player = p;
  Id = player['id'];
  Name = player['name'];
  player['x'] = Math.floor(Math.random() * (3000 - br));
  player['y'] = Math.floor(Math.random() * (3000 - br));
  console.log(player)
  ctrl_name.innerText = `name |　${Name}`;
  ctrl_id.innerText = `ID |　${Id}`;
  ctrl_color.placeholder = 'color';
  ctrl_color.onchange = () => {
    player['color'] = ctrl_color.value;
  }

  kill.innerText = `kills ${player['kills']}`;

  document.onkeydown = e => {
    keysDown[e.keyCode] = true;
  }

  document.onkeyup = e => {
    delete keysDown[e.keyCode];
  }

  //w 87 s 83 a 65 d 68
  let clicked = false;

  document.onclick = e => {
    if (!player || !player['status'] || clicked) return;

    if (Bcounts > Blimit - 1) {
      text.innerHTML = '子彈耗盡囉！';
      return;
    }
    bcount++;
    Bcounts++;
    let bu = new Bullet();
    let mouse = { x: e.pageX + ZeroX, y: e.pageY +ZeroY };
    bu.id = bcount;
    bu.r = getR(mouse, player);
    bu.x = player['x'];
    bu.y = player['y'];
    player['bullets'][`${bcount}`] = bu;
    socket.emit('clientupdate', player);
    clicked = true;
    setTimeout(() => {
      clicked = false;
    }, 500)
  }

  setInterval(() => {
    if (player['status']) {
      if (87 in keysDown) {
        if (player['y'] >= br) {
          player['y'] -= player['speed'];
        }
      }
      if (83 in keysDown) {
        if (player['y'] <= 10000 - br) {
          player['y'] += player['speed'];
        }
      }
      if (65 in keysDown) {
        if (player['x'] >= br) {
          player['x'] -= player['speed'];
        }
      }
      if (68 in keysDown) {
        if (player['x'] <= 10000 - br) {
          player['x'] += player['speed'];
        }
      }

    }

    // 移動子彈
    // let bul = 0;
    for (let b in player['bullets']) {
      // bul++;
      let x = player['bullets'][b]['x'];
      let y = player['bullets'][b]['y'];
      let r = player['bullets'][b]['r'];
      let speed = player['bullets'][b]['speed'];
      if (x >= sr && x <= 3000 - sr) {
        player['bullets'][b]['x'] -= r[0] * speed;
      }
      if (y >= sr && y <= 3000 - sr) {
        player['bullets'][b]['y'] -= r[1] * speed;
      }
      if (x < sr || x > 3000 - sr || y < sr || y > 3000 - sr) {
        delete player['bullets'][b];
      }
    }
    Then = Date.now();
    socket.emit('clientupdate', player);

    kill.innerText = `kills |　${player['kills']}`;
    // 歸零與否Bcounts = bul;
    bc.innerText = `bullets |　${Blimit - Bcounts} / ${Blimit}`;
    ctrl_x.innerText = `x |　${player['x']}`;
    ctrl_y.innerText = `y | ${player['y']}`;
  }, 70);

  var checkdead = false;
  socket.on('update', data => {
    ping.innerText = `ping ${Date.now() - Then}`;

    ctx.clearRect(0, 0, ww, wh);
    bg();

    for (let i in data[Id]['bullets']) {
      if (!data[Id]['bullets'][i]['status']) {
        delete player['bullets'][`${data[Id]['bullets'][i]['id']}`];
        delete data[Id]['bullets'][i];
      }
    }

    player['status'] = data[Id]['status'];

    if (!player['status'] && !checkdead) {
      checkdead = true;
      alert('已死亡');
      return;
    }
    if( player['x'] < ww/2 ){
      ZeroX = 0; 
    } else if( player['x'] > 3000-ww/2 ){
      ZeroX = 3000-ww/2; 
    } else {
      ZeroX = player['x'] - ww/2;
    }

    if( player['y'] < wh/2 ){
      ZeroY = 0;
    } else if( player['y'] > 3000-wh/2 ){
      ZeroY = 3000-wh/2;
    } else {
      ZeroY = player['y'] - wh/2;
    }

    
    
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
});

