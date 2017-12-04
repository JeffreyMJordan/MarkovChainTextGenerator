# MarkovChainTextGenerator

## Overview 

A Markov Chain is a mathematical system consisting of a set of states, a series of transitions between each state, and a set of probabilities for each of these transitions occuring. 
To illustrate this concept, please refer to the diagram below:

![alt](http://4.bp.blogspot.com/-u9XslQrACb8/VK71Cym3zQI/AAAAAAAAAA0/DAxkKTcCKvc/s1600/markovdiag.png)

Markov chains can be used to generate human-like text. Consider the sentence:
```
John saw the cat and saw the dog
```

We can generate a markov chain modeling this sentence with the following algorithm:
```ruby
def createChain(sentence)
  hash = Hash.new {[]}
  sentence.split(" ").each do |word| 
    hash[word] << word
  end 
  hash 
end
```

For the above sentence, our hash will look like the following: 
```
{John: [saw], the: [cat, dog], cat: [and], and: [the], dog: []}
```

We can use this hash to generate a sentence using the following algorithm: 
1. First, pick a random key from the hash, making it the first word in our sentence
2. Choose a random word from the array this key is mapped to
3. Append this word to the end of our sentence
4. Return to step 2, using our new word as a key 

While our above example may be simple, markov chains can generate human-like text when given a large enough corpus. 

## Functionality and MVPs 
1. Users can generate a markov chain based on pre-provided corpuses
2. Users can generate a markov chain for uploaded corpuses 
3. Users can see how the markov chain is generating their text in real-time (with a provided animation) 

## Architecture and Technologies 
* Vanilla Javascript for generating and using the markov chain 
* React for handling user input and displaying the animation 

The app will consist of the following components 
* `chain.js` for generating the markov chains 
* `app.js` for handling user input and displaying the landing page 
* `animation.js` for updating the state of the markov chain's text-generation 

## Timeline 
* Day 1: Implement the landing page, style the landing page, write `chain.js`
* Day 2: Allow for user-uploaded corpuses and provide default corpuses 
* Day 3: Create the markov chain animation 
* Day 4: Styling and finishing touches 
