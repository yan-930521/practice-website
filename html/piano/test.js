const fs = require('fs')
const data = require('./data.json')
console.log(data['A0.mp3'])
/*
fs.readdir('../piano/mp3',(err,d)=>{
  for(let f in d) {
    fs.readFile('../piano/mp3/'+ d[f],(err,fd)=>{ 
      data[d[f]] = fd.toString()
      fs.writeFile('./data.json',JSON.stringify(data),function(err)
      {
        if(err) console.log(err)
      })
    })
  }
})
*/