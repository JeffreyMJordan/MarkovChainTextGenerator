import {drawChain} from './drawing';
import * as $ from "jquery";
import shakesT from './hobbit';
import hamlet from './hamlet';
const makeChain = (corpus, n=1) => {
  corpus = corpus.replace(/\n/g, " ");
  let corpusArr = corpus.split(" ");
  console.log(corpusArr);
  if(corpusArr.length===1){
    let obj = {};
    obj[corpusArr[0]] = [];
    return obj;
  }
  
  let chain = {};
  for( var i = 0; i<corpusArr.length-n; i++){
    let substr = corpusArr.slice(i, n+i).join(" ");
    let next = corpusArr[n+i];
    if (next){
      if (chain[substr]){
        chain[substr].push(next);
      }else{
        chain[substr] = [next];
      }
    }
  }
  masterChain = chain;
  return chain;
};



const assembleText = (corpus, words=10, n=1) => {

  console.log(words);
  let chain = makeChain(corpus, n);
  let sentence = "";
  let keys = Object.keys(chain);
  if (JSON.stringify(keys)==="[\"\"]"){
    return;
  }
  let key = keys[ keys.length * Math.random() << 0];
  console.log(words);
  while(sentence.split(" ").filter((word) => word!="").length<words){
    
    console.log(chain);
    sentence += ` ${key.split(" ")[n-1]}`;
    
    let arr = chain[key];
    
    if (arr){
      key = key.split(" ").slice(1).join(" ");      
      key += ` ${arr[Math.floor(Math.random() * arr.length)]}`;
    }else{
      key = keys[Math.floor(Math.random() * keys.length)];
    } 
  }
  return sentence; 
};

const step = (chain, gram, nextWord) => {
  let gramContainer = document.getElementById('gram');
  let keyMapContainer = document.getElementById('key-map');
  let textBox = document.getElementById('text-box');
  
  if(gram===undefined){
    let keys = Object.keys(chain);
    gram = keys[ keys.length * Math.random() << 0];
    
    textBox.innerHTML += gram;
  }else{
    textBox.innerHTML += ` ${nextWord}`;
  }
  gramContainer.innerHTML = gram;
  let arr = chain[gram];
  if(arr===undefined){
    keyMapContainer.innerHTML = "[]";
  }else{
    keyMapContainer.innerHTML = `[${arr.map((val) => "\"" + val + "\" ")}]`;
  }
  
  let nextGram = gram;
  
  if (arr && arr.length>0){
    nextGram = nextGram.split(" ").slice(1).join(" ");
    nextWord = arr[Math.floor(Math.random() * arr.length)];
    nextGram += ` ${nextWord}`;
  }else{
    
    let keys = Object.keys(chain);
    console.log(keys);
    let num = Math.floor(keys.length * Math.random());
    console.log(num);
    nextGram = keys[num];
    console.log(nextGram);
    nextWord = nextGram;
  }
  if(nextGram[0]===" "){
    nextGram = nextGram.slice(1);
  }
  
  return [nextGram, nextWord];
};

let masterChain = undefined;

window.addEventListener('DOMContentLoaded', () => {
  let prevCorpus = undefined;
  let gram = undefined;
  let nextWord = undefined;
  let prevN = undefined;
  let form = document.getElementById('form');
  
  form.addEventListener('submit', (e)  => {
    e.preventDefault();
    
    let corpus = e.target[0].value;
    let n = parseInt(e.target[1].value);
    let words = parseInt(e.target[2].value);
    let sentence = assembleText(corpus, words, n);
    let textBox = document.getElementById("text-box");
    console.log(textBox);
    textBox.innerHTML = sentence;
  });

  let button = document.getElementById('step');
  
  button.addEventListener('click', (e)=>{
    e.preventDefault();
    let corpus = document.getElementById('form')[0].value;
    let n = parseInt(document.getElementById('form')[1].value);
    if(n!=prevN || prevCorpus != corpus){
      prevN = n;
      masterChain = makeChain(corpus, n);
    }
    
    
    let res = step(masterChain, gram, nextWord);

    gram = res[0];
    nextWord = res[1];
  });

  let shakes = document.getElementById('hobbit');
  shakes.addEventListener('click', (e) => {
    e.preventDefault();
    let textBox = document.getElementById("text-area");
    textBox.value = shakesT;  
  });

  let ham = document.getElementById('hamlet');
  ham.addEventListener('click', (e) => {
    e.preventDefault();
    let textBox = document.getElementById("text-area");
    textBox.value = hamlet;
    
  });
});