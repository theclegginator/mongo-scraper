# MongoDB Japanese News Scraper
## Summary
This mongo-scraper application scrapes my favorite Japanese news website (thank you, JapaneseToday.com!) for the latest news headlines from Japan. It then takes these headlines and adds them to a MongoDB database. Users can access the website and add comments or notes to the articles that will be saved to the database. These notes will persist so users can revisit them later.

### Module Dependencies
The following Node modules are used (and are included in the package.json file):
* axios - used for making API route calls in the JavaScript
* express - used for server-side code and hosting
* mongoose - used for object modeling in conjunction with MongoDB
* mongoose-unique-validator - a simple addition to mongoose for ensuring duplicate entries cannot be inserted
* morgan - used for logging HTTP requests
* cheerio - a convenient tool for structuing scraping parameters

### App Demo
* In the GIF below, a sample user scrapes for the latest articles and automatically add them to the database.
* To accomplish this, cheerio is used with an axios call to pull the latest headlines from JapaneseToday.com. 
* An article title, URL, and summary are all grabbed from the site and reformatted into bootstrap HTML here on the main page. 
* A JSON object containing the above information is preserved in the Mongo Database via Mongoose.
  
![Screenshot](README-images/scraping.gif)

### Adding Notes
* Clicking this button will produce a modal that will allow the user to add a note to an article he or she is interested in. 
* These notes are tied to an article ID in the database so they can be reviewed (or removed) late.

![Screenshot](README-images/adding-note.gif)

### Deleting Notes
* Clicking this button will allow the user to delete existing notes/comments on an entry.
* The app will check to ensure there are notes to display. If none exist for the article in question, a special message will appear asking the user to first create a note.

![Screenshot](README-images/delete-note.gif)
