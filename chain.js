import {drawRect}from './drawing';

const makeChain = (corpus, n=1) => {
  let corpusArr = corpus.split(" ");
  let chain = {};
  for( var i = 0; i<corpusArr.length-n; i++){
    let substr = corpusArr.slice(i, n+i).join(" ");
    let next = corpusArr[i+n];
    if (next){
      if (chain[substr]){
        chain[substr].push(next);
      }else{
        chain[substr] = [next];
      }
    }
      
  }
  var canvas = document.getElementById('canvas'); 
  var c = canvas.getContext('2d'); 
  
  drawRect(c);
  return chain;
};



const assembleText = (corpus, words = 50, n=1) => {
  let chain = makeChain(corpus, n);
  
  let sentence = "";
  let keys = Object.keys(chain);
  let key = keys[ keys.length * Math.random() << 0];
  for(var i = 0; i<words; i++){
    sentence += ` ${key}`;
    let arr = chain[key];
    
    if (arr){
      key = arr[Math.floor(Math.random() * arr.length)];
    }else{
      key = keys[Math.floor(Math.random() * keys.length)];
    } 
  }
  return sentence; 
};


window.addEventListener('DOMContentLoaded', () => {
  let form = document.getElementById('form');
  
  form.addEventListener('submit', (e)  => {
    e.preventDefault();
    let corpus = e.target[0].value;
    let sentence = assembleText(corpus);
    console.log(sentence);
  });
});


// form.addEventListener('submit', () => {
//   console.log("here");
// });

// export default makeChain;

