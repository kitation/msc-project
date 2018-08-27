# msc-project

## Review Puller

This takes a local HTML document of a review page from Steam Community (eg https://steamcommunity.com/app/570940/reviews/), it returns a CSV of the text of each review. HTML must be saved as <SteamID>.html

`node review-puller.js <SteamID>`

## Review Combiner

This takes in all the result text files, adds the Steam ID of the game they come from, adds an ID to the review and writes a JSON file of the shuffled reviews

`node review-combiner.js`

## Review Picker

Given a list of review IDs, generate a new JSON file of just those. (IDs are hardcoded in the code for now)

`node review-picker.js`
