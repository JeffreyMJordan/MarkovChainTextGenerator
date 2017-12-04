const makeChain = (corpus, n=1) => {
  let corpusArr = corpus.split(" ");
  let chain = {};
  for( var i = 0; i<corpusArr.length-n; i++){
    console.log(corpusArr);
    let substr = corpusArr.slice(i, n+i).join(" ");
    let next = corpusArr[i+n];
    if (chain[substr]){
      chain[substr].push(next);
    }else{
      chain[substr] = [next];
    }
  }
  return chain;
};

export default makeChain;