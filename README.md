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
* In the GIF below, a sample user views existing burgers and burgers that have already been eaten.
* They then add a brand new burger to the database and eat said burger, moving it to the other section of the page.
  
![Screenshot](README_images/burger-demo.gif)

### Menu Section - Existing Burgers
* This section of the page shows all existing burgers that have not been eaten. 
* This is pull from a jQuery AJAX call.
![Screenshot](README_images/Menu.png)

### Add a Burger - Creating a new SQL Entry
* This section of the page allows the user to add a new burger.
* The burger will be coerced into the SQL schema via the ORM functions.
![Screenshot](README_images/New-burger.png)

### Burgers Already Enjoyed - Burgers that have been updated
* This section of the page shows burgers that were prevously created and "devoured".
* These burgers display here based on a boolean value in the database.
![Screenshot](README_images/eaten.png)
