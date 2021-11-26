/*
var comment = document.querySelector(".comment");

var time = document.querySelector(".time");

var tools = document.queryCommandValue("#tools");

tools.onchange = () => {
  window.location.href="./html/" + this.innerHTML + "/" + this.innerHTML + ".html"
}
var user = false;

var clicked = false;

        <!--
          <p class="login"><input type="button" value="   Login    " onclick="location.href='./html/login/login.html'"></p>
        
        <p class="piano"><input type="button" value="   Piano   " onclick="location.href='./html/piano/'"></p>
        <p class="announce"><input type="button" value="announce" onclick="location.href='./html/announce/announce.html'"></p>
        <p class="win"><input type="button" value="視窗管理器" onclick="location.href='./html/watch/index.html'"></p>
        <p class="comment"><input type="button" value="Feedback"></p>
        -->
comment.addEventListener("click", checkComment, false);

function checkComment() {
  if(clicked) return;
  clicked = true;
  if(!user) window.location.href="./html/comment/comment.html";
  else window.location.href=`./html/comment/comment.html?user=${user}`;
}
*/
/*
function t() {
  var date = new Date();
  time.innerHTML = `${date.getHours()}  ${date.getMinutes()} ${date.getSeconds()}`
}
setInterval(t,1000)

console.log("web on !!!");

*/