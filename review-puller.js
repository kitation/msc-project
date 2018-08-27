var fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var steamID = process.argv[2];
console.log(steamID);

var document;

fs.readFile( __dirname + '/'+steamID+'.html', function (err, data) {
  if (err) {
    throw err; 
  }
  const dom = new JSDOM(data.toString());
  doIt(dom.window.document);
});

function isUseable(text) {
    return text.split(" ").length > 20;
}

function getRandomIntInclusive(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function doIt(document) {
    var reviewHtml = document.querySelectorAll('.apphub_CardTextContent');
    var reviewText = [];
    for (var i = 0; i < reviewHtml.length; i++) {
        const thing = reviewHtml[i];
        let reviewString = "";
        for (var j = 0; j < thing.childNodes.length; j++) {
            if (thing.childNodes[j].data !== undefined)
                reviewString += thing.childNodes[j].data;
        }
        reviewText.push(reviewString.trim() + "\n");
    }
    reviewText = reviewText.filter(isUseable);
    console.log(reviewText.length)
    const filename = steamID + "result.txt";
    console.log(filename);

    fs.writeFile(filename, reviewText,
 (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

}

