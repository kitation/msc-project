var fs = require('fs');

fs.readFile( __dirname + '/allReviews.json', function (err, data) {
  if (err) {
    throw err; 
  }
  doIt(JSON.parse(data.toString()));
});

function doIt(data) {
    var reviewsToPull = [
        264,1181,652,647,1198,15,405,587,669,1047,
        94,1220,1178,225,1006,253,45,563,1185,538,
        161,617,782,454,1193,254,1191,418,780,550,
        1132,1177,163,551,1222,592,504,564,1197,885,
        677,735,218,234,713,475,479,1178,225,1032,
        937,1195,660
    ];
    var output = data.filter(item => reviewsToPull.includes(item.reviewId));
    console.log("Saving " + output.length + " reviews");
    fs.writeFile("pickedReviews.json", JSON.stringify(output), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}