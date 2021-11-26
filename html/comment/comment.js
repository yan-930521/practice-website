var btn = document.querySelector(".get-btn");

var text = document.getElementById("text");

var clicked = false;

btn.addEventListener("click", check, false);
const array = [
  "https://cdn.discordapp.com/attachments/856353235216236554/888996725082165248/sample-37fa877bee95d945b90bc983bf8c8203.jpg",
  "https://cdn.discordapp.com/attachments/851125377954742292/852816291417030676/191933427_1412503549136009_991094078069613482_n.png"
]

var n = 1;
function check() {
/*
  if(n == 1) {
    //document.background = array[n];
    ReactDOM.render(
      <style>background-image : url(array[n])</style>,
      document.getElementById('body')
    );
    n--;
  }
  if(n == 0) {
    //document.background = array[n];
    ReactDOM.render(
      <style>background-image : url(array[n])</style>,
      document.getElementById('body')
    );
    n++;
  }
*/
  if(clicked) return;
  var Id = "" + document.querySelector(".discordId").value;
  
  var Comment = "" + document.querySelector(".comment").value;
  
  if(!Id || Id == "") {
    Id += "匿名"
    text.innerHTML = `匿名模式`
  }
  if(!Comment || Comment == "") {
    text.innerHTML = `Comment 為必填選項`
    setTimeout(()=>{
      text.innerHTML = "";
    },3000);
    return;
  }
  clicked = true;
  axios.get(`https://apitest.sakuraeinfach.repl.co/getrpgdata?discordid=${Id}&comment=${Comment}`)
  .then(res =>{
    window.location.href='thanks.html'
  })
  .catch(err => {
    clicked = false;
    console.log('系統錯誤',err);
    text.innerHTML = "系統錯誤";
    setTimeout(()=>{
      text.innerHTML = "";
    },3000);
  })
}

