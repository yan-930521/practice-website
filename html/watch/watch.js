var win = document.querySelector(".container");

var btn = document.querySelector(".addwindow");

var link = document.querySelector(".ytlink");

var winwidth = document.getElementById("winwidth");

var num = 0;

var header = document.querySelector(".header");

var search = document.querySelector(".search");

var searchclick = false;

var resultcheck = false;

var Status = document.querySelector(".status");

btn.addEventListener("click", check, false);

winwidth.addEventListener("input",change, false);

function check() {
  let str = "";
  if(link.value.startsWith('https://www.youtube.com/watch?v=')||link.value.startsWith("https://youtu.be/")){
    /*
    if(link.value.replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','').indexOf("/")>=0) {
      alert("無法取得該影片");
      return;
    }
    */
    str = link.value.replace('https://youtu.be/','https://www.youtube.com/embed/').replace('https://www.youtube.com/watch?v=','https://www.youtube.com/embed/').replace('&','?');
    //str = "https://www.youtube.com/embed/" + str
  }
  else if(link.value.startsWith('https://www.twitch.tv/')) {
    str = link.value.replace('https://www.twitch.tv/','')
    str = 'https://player.twitch.tv/?channel='+ str + "&parent=website.sakuraeinfach.repl.co"
    //https://www.twitch.tv/embed/<channel>/chat?parent=<parent>
  }
  else if (link.value == "") {
    alert("請輸入網址");
    return;
  } else {
    str = ""
    str = link.value;
  }

  link.value = "";
  /*
  if((!link.value.startsWith("https://youtu.be/") && !link.value.startsWith("https://www.youtube.com/watch?v=")) || str == "") {
    
  }
  */
  var d = document.createElement('div');
  var ele = document.createElement('iframe');
  var p = document.createElement('p');
  var b = document.createElement('input'); 
  d.className = `video-${num}`;
  d.id = "video";
  ele.title = "yt-player";
  ele.className = `yt-player-${num}`;
  ele.frameborder = "0";
  ele.width = `${winwidth.value}px`;
  ele.height = `${(winwidth.value/2)}px`;
  ele.src = str;
  ele.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  p.className = "buttons";
  b.className = `button-${num}`;
  b.id = "xbutton";
  b.type = "button";
  b.value = "X";
  b.addEventListener("click", xclick, false);
  p.appendChild(b);
  d.appendChild(p);
  d.appendChild(ele);
  win.appendChild(d);
  num++;
}

function change() {
  for(let i = 0 ; i < num ; i++) {
    if(document.querySelector(`.yt-player-${i}`) == null ) continue;
    let iframeblock = document.querySelector(`.yt-player-${i}`);
    iframeblock.width = `${winwidth.value}px`;
    iframeblock.height = `${(winwidth.value/2)}px`;
  }
}

function xclick() {
  let str = this.className.replace("button-","");
  let divToRemove = document.querySelector(`.video-${str}`);
  win.removeChild(divToRemove);
}

search.onclick = () => {
  if(searchclick == true) {
    search.textContent = "A";
    let toremove = document.querySelector(".searchplace");
    header.removeChild(toremove);
    search.textContent = "Q";
    searchclick = false;
    resultcheck = false;
    return;
  }
  searchclick = true;
  search.textContent = "X";
  let ps = document.createElement('div'); 
  let s = document.createElement('input'); 
  let sb = document.createElement('button'); 
  ps.appendChild(s);
  ps.appendChild(sb);
  header.appendChild(ps);
  s.type = "search";
  ps.className = "searchplace"
  s.placeholder="Search in youtube";
  s.className = "sstr";
  sb.textContent = "Q";
  sb.className = "s";
  sb.onclick = () => {
    if(s.value == "") {
      alert("請輸入關鍵字");
      return;
    }
    if(resultcheck) {
      let reaulttoremove = document.querySelector(".result");
      if(reaulttoremove) {
        //ps.removeChild(reaulttoremove);
        header.removeChild(reaulttoremove);
      }
    }
    let result = document.createElement('div');
    result.className = "result";
    resultcheck = true;
    renew("請稍待片刻");
    axios.get(`https://apitest.sakuraeinfach.repl.co/ytsearch?str=${s.value}`)
    .then(res =>{
      let array = res.data.split('-+-')
      let searchb = document.createElement('button');
      searchb.textContent = "清除搜尋結果";
      result.appendChild(searchb);
      searchb.onclick = () => {
        let reaulttoremove = document.querySelector(".result");
        if(reaulttoremove) {
          header.removeChild(reaulttoremove);
        }
      }
      for (let i = 0; i < 10; i++) {
        let op = document.createElement('div');
        let l = document.createElement('div');
        let b = document.createElement('button');
        op.className = "linkplace";
        b.className = "tolink";
        b.textContent = "連結";
        b.onclick = () => {
          link.value = array[i].split('+-+')[1];
          check();
          b.textContent = "已新增";
        };
        l.textContent = array[i].split('+-+')[0]
        op.appendChild(l);
        op.appendChild(b);
        result.appendChild(op);
        header.appendChild(result);
      }
    })
    .catch(err => {
      clicked = false;
      console.log('系統錯誤',err);
      renew("系統錯誤"+err.toString());
      result.appendChild(e);
    })
  }
  s.value = "";
}

function renew (str) {
  let op = document.createElement('li');
  op.textContent = str;
  Status.appendChild(op);
  setTimeout(()=>{
    Status.removeChild(op);
  },3000)
}