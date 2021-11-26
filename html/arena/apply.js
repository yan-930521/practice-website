var btn = document.querySelector(".get-btn");
var n = document.querySelector(".name");
var i = document.querySelector(".id");
var p = document.querySelector(".password");
var p2 = document.querySelector(".password2");
var text = document.getElementById("text");

var clicked = false;
var N = 'x';
var P = 'x';
var I = 'x';
btn.onclick = ()=>{
  if(clicked) return;
  if(n.value == '') {
    alert('請輸入想要的名子(最好是英文)');
    return
  }
  if(i.value == ''||i.value == 'x') {
    alert('請輸入想要的ID');
    return
  }
  if(p.value == '') {
    alert('請輸入密碼');
    return
  }
  if(p.value != p2.value) {
    alert('請檢查兩個密碼的一致性');
    return
  }
  
  N = n.value;
  P = p.value;
  I = i.value;
  
  let json = {
    name:N,
    id:I,
    password:P
  }
  socket.emit('applyAc',json);
  clicked = true;
}
socket.on('applyReply',str=>{
  clicked = false;
  if(str.startsWith('green') &&  P != 'x') {
    location.href = 'https://website.sakuraeinfach.repl.co/html/arena/';
  } else if(str == 'ID重複了') {
    alert('ID重複了，換一個吧');
  }
});