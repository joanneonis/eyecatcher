// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17
//
//! edited version

// Some utility functions
function tokenize(text) {
  // Split into array of tokens
  return text.split(/\W+/);
}

// A function to validate a toke
function validate(token) {
  return /\w{2,}/.test(token);
}

class TFIDF {
  constructor() {
    this.dict = {};
    this.keys = [];
    this.totalwords = 0;
  }

  // Count the words
  termFreq(data) {
    var tokens = tokenize(data);
    // For every token
    for (var i = 0; i < tokens.length; i++) {
      // Lowercase everything to ignore case
      var token = tokens[i].toLowerCase();
      if (validate(token)) {
        this.increment(token);
        this.totalwords++;
      }
    }
  }

  // Get all the keys
  getKeys() {
    return this.keys;
  }

  // Get the count for one word
  getCount(word) {
    return this.dict[word].count;
  }

  // Get the score for one word
  getScore(word) {
    return this.dict[word].tfidf;
  }

  // Increment the count for one word
  increment(word) {
    // Is this a new word?
    if (this.dict[word] == undefined) {
      this.dict[word] = {};
      this.dict[word].count = 1;
      this.dict[word].docCount = 0;
      this.dict[word].word = word;
      this.keys.push(word);
      // Otherwise just increment its count
    } else {
      this.dict[word].count++;
    }
  }

  // Finish and calculate everything
  finish(totaldocs) {
    // calculate tf-idf score
    for (var i = 0; i < this.keys.length; i++) {
      var key = this.keys[i];
      var word = this.dict[key];
      var tf = word.count / this.totalwords;
      // See:
      var idf = Math.log(totaldocs / word.docCount);
      word.tfidf = tf;
    }
  }

  // Sort by word counts
  sortByCount() {
    var tfidf = this;
    this.keys.sort(function(a, b) {
      return (tfidf.getCount(b) - tfidf.getCount(a));
    });
  }

  // Sort by TFIDF score
  sortByScore() {
    var tfidf = this;
    this.keys.sort(function(a, b) {
      return (tfidf.getScore(b) - tfidf.getScore(a));
    });
  }
}