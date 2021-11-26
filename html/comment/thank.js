var f = document.getElementById("player");

var ary = [
  "z1W4c7ym49Y",
  "UBSx4qqeikY",
  "WGgEFoI9MhE",
  "-p0IjnBhG10",
  "nIrYjzHAEp0"
]
var id = ary[Math.floor(Math.random() * ary.length)]

f.src = "https://www.youtube.com/embed/" + id;

setInterval(()=>{
  f.src = "https://www.youtube.com/embed/" + ary[Math.floor(Math.random() * ary.length)];
},300000);