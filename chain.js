import {drawChain} from './drawing';

const makeChain = (corpus, n=1) => {
  console.log(n);
  let corpusArr = corpus.split(" ");
  console.log(corpusArr);
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
  console.log(chain);
  return chain;
};



const assembleText = (corpus, words=50, n=1) => {
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

const step = (chain, gram) => {
  let gramContainer = document.getElementById('gram');
  let keyMapContainer = document.getElementById('key-map');
  if(gram===undefined){
    let keys = Object.keys(chain);
    gram = keys[ keys.length * Math.random() << 0];
    console.log('here');
  }
  gramContainer.innerHTML = gram;
  keyMapContainer.innerHTML = `[${chain[gram]}]`;
};


window.addEventListener('DOMContentLoaded', () => {

  let chain = undefined;
  
  let form = document.getElementById('form');
  
  form.addEventListener('submit', (e)  => {
    e.preventDefault();
    let corpus = e.target[0].value;
    let n = parseInt(e.target[1].value);
    
    let sentence = assembleText(corpus, 50, n);
    let textBox = document.getElementById("text-box");
    
    textBox.innerHTML = sentence;
  });

  let button = document.getElementById('step');
  console.log(button);
  button.addEventListener('click', (e)=>{
    e.preventDefault();
    let corpus = document.getElementById('form')[0].value;
    let n = parseInt(document.getElementById('form')[1].value);
    if(chain===undefined){
      chain = makeChain(corpus, n);
    }
    let gram = document.getElementById('gram').value;
    console.log(document.getElementById('gram').innerText);
    
    step(chain, gram);
  });
});