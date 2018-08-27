var fs = require('fs');
const readMultipleFiles = require('read-multiple-files');
var allReviews = [];

const output = "allReviews.json";
var id = 1;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var files = [];

fs.readdirSync('/Users/Chad/Documents/Uni/Project/Review Data').forEach(file => {
  if (file.includes('result.txt'))
    files.push(file);
});

readMultipleFiles(files).subscribe({
  next(result) {
    console.log("Read " + result.path);
    const steamId = result.path.replace('result.txt', '');
    var contents = Array.from(new Set(result.contents.toString().split('\n')));
    for (var i = 0; i < contents.length; i++) {
      if (contents[i].trim().length > 1) {
        id++;
        allReviews.push({reviewId: id, steamId: steamId, review: contents[i]})
      }

    }
  },
  complete() {
    console.log("Read complete, shuffling");
    shuffle(allReviews);
    fs.writeFile(output, JSON.stringify(allReviews), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
  }
})


