var pp = document.querySelector("#Tilte");
var box = document.querySelector('.keybox');
var smallbox_top = document.querySelector('.smallbox_top');
var smallbox_bottom = document.querySelector('.smallbox_bottom');
var keynum = document.querySelector('.keynum');
var flooter = document.querySelector('.flooter');

const KEY = ['C','D','E','F','G','A','B'];
const array4 = [9,49,81,50,87,69,52,82,53,84,54,89];
const array5 = [85,56,73,57,79,80,189,219,187,221,8,220];
const array2 = [16,65,90,83,88,67,70,86,71,66,72,78];
const array3 = [77,75,188,76,190,191,222,97,101,98,102,99];     
var data = [];

// [4] 5 
// 2 3

let i = 4;
data[i] = [];
let num = 0;
let smallbox_top_left = document.createElement('div');
smallbox_top_left.className = 'smallbox_top_left'
for(let j in KEY) {
  data[i].push(`${KEY[j]}${i}|${array4[num]}`);
  let w = document.createElement('button');
  w.className = "w";
  w.id = `${KEY[j]}${i}|${array4[num]}`;
  w.innerHTML = `${KEY[j]}${i}`;
  loadmp3(w.id.split('|')[0]);
  w.onclick = () => {
    play(w.id.split('|')[0]);
  }
  smallbox_top_left.appendChild(w);
  num++;
  if(j != 2 && j != 6) {
    data[i].push(`${KEY[(Number(j)+1)]}b${i}|${array4[num]}`);
    let b = document.createElement('button');
    b.className = "b";
    b.id = `${KEY[(Number(j)+1)]}b${i}|${array4[num]}`;
    b.innerHTML = `${KEY[(Number(j)+1)]}${i}`;
    loadmp3(b.id.split('|')[0]);
    b.onclick = () => {
      play(b.id.split('|')[0])
    }
    smallbox_top_left.appendChild(b);
    num++;
  }
}
smallbox_top.appendChild(smallbox_top_left);


i = 5;
data[i] = [];
num = 0
let smallbox_top_right = document.createElement('div');
smallbox_top_right.className = 'smallbox_top_right'
for(let j in KEY) {
  data[i].push(`${KEY[j]}${i}|${array5[num]}`);
  let w = document.createElement('button');
  w.className = "w";
  w.id = `${KEY[j]}${i}|${array5[num]}`;
  w.innerHTML = `${KEY[j]}${i}`;
  loadmp3(w.id.split('|')[0]);
  w.onclick = () => {
    play(w.id.split('|')[0]);
  }
  smallbox_top_right.appendChild(w);
  num++;
  if(j != 2 && j != 6) {
    data[i].push(`${KEY[(Number(j)+1)]}b${i}|${array5[num]}`);
    let b = document.createElement('button');
    b.className = "b";
    b.id = `${KEY[(Number(j)+1)]}b${i}|${array5[num]}`;
    b.innerHTML = `${KEY[(Number(j)+1)]}${i}`;
    loadmp3(b.id.split('|')[0]);
    b.onclick = () => {
      play(b.id.split('|')[0])
    }
    smallbox_top_right.appendChild(b);
    num++;
  }
}
smallbox_top.appendChild(smallbox_top_right);


i = 2;
data[i] = [];
num = 0;
let smallbox_bottom_left = document.createElement('div');
smallbox_bottom_left.className = 'smallbox_bottom_left'
for(let j in KEY) {
  data[i].push(`${KEY[j]}${i}|${array2[num]}`);
  let w = document.createElement('button');
  w.className = "w";
  w.id = `${KEY[j]}${i}|${array2[num]}`;
  w.innerHTML = `${KEY[j]}${i}`;
  loadmp3(w.id.split('|')[0]);
  w.onclick = () => {
    play(w.id.split('|')[0]);
  }
  smallbox_bottom_left.appendChild(w);
  num++;
  if(j != 2 && j != 6) {
    data[i].push(`${KEY[(Number(j)+1)]}b${i}|${array2[num]}`);
    let b = document.createElement('button');
    b.className = "b";
    b.id = `${KEY[(Number(j)+1)]}b${i}|${array2[num]}`;
    b.innerHTML = `${KEY[(Number(j)+1)]}${i}`;
    loadmp3(b.id.split('|')[0]);
    b.onclick = () => {
      play(b.id.split('|')[0])
    }
    smallbox_bottom_left.appendChild(b);
    num++;
  }
}
smallbox_bottom.appendChild(smallbox_bottom_left);


i = 3;
data[i] = [];
num = 0
let smallbox_bottom_right = document.createElement('div');
smallbox_bottom_right.className = 'smallbox_bottom_right'
for(let j in KEY) {
  data[i].push(`${KEY[j]}${i}|${array3[num]}`);
  let w = document.createElement('button');
  w.className = "w";
  w.id = `${KEY[j]}${i}|${array3[num]}`;
  w.innerHTML = `${KEY[j]}${i}`;
  loadmp3(w.id.split('|')[0]);
  w.onclick = () => {
    play(w.id.split('|')[0]);
  }
  smallbox_bottom_right.appendChild(w);
  num++;
  if(j != 2 && j != 6) {
    data[i].push(`${KEY[(Number(j)+1)]}b${i}|${array3[num]}`);
    let b = document.createElement('button');
    b.className = "b";
    b.id = `${KEY[(Number(j)+1)]}b${i}|${array3[num]}`;
    b.innerHTML = `${KEY[(Number(j)+1)]}${i}`;
    loadmp3(b.id.split('|')[0]);
    b.onclick = () => {
      play(b.id.split('|')[0])
    }
    smallbox_bottom_right.appendChild(b);
    num++;
  }
}
smallbox_bottom.appendChild(smallbox_bottom_right);


var times = 0;
var t = [];
document.onkeydown = (e) => {
  t[times] = false;
  check(4,e,times);
  check(5,e,times);
  check(2,e,times);
  check(3,e,times);
  times++;
}

function play(str) {
  let au = document.querySelector('#' + str);
  if(au.currentTime == 0) {
    au.play();
  } else {
    au.currentTime = 0;
  }
}

function loadmp3(str){
  let au = document.createElement('audio');
  au.className = 'au';
  au.id = str;
  au.preload = 'auto';
  au.src = `./mp3/${str}.mp3`;
  flooter.appendChild(au);
}

function check(num,e,ts) {
  for(let k in data[num]) {
    if(t[ts]) break;
    if(e.keyCode == data[num][k].split('|')[1]) {
      play(data[num][k].split('|')[0]);
      t[ts] = true;
      e.preventDefault();
      break;
    }
  }
}