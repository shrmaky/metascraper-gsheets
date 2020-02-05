## Introduction

There are specific use cases when you need to scrape the website meta(opengraph). Metascraper & google-spreadsheet are an amazing packages which makes this easy. My use case was to scrape the website meta & save it in data, so i thought of why not saving directly in google sheet to make in more friendly to non-tech people as well. 

## What it does
1. Give a web URL
2. Metascraper generates meta from the url
3. Saving the scraped data in google sheets

---

### Step:1 Generate Google auth for accessing the google sheet through this program-

1. Google Developers Console - https://console.developers.google.com/
2. Create a Project/Select if you already have
3. Enable the Sheets API for the project
4. Create Credentials
5. Create Key -> Json
6. Download Json
6. Copy the client_email & private_key & update .env

### Step:2 Setup Instructions -
1. create an .env file from .env.example
2. Generate the .env credentials by following the below instructions to generate credentials
3. Create a google sheet from your account & share your sheet with the client_email generated.
4. Copy the sheet id - https://docs.google.com/spreadsheets/d/SHEET_ID/
5. Inside the project folder
6. npm install
7. node index.js


### Thanks to developers of 

* [Metascraper](https://github.com/microlinkhq/metascraper)
* [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet)
* [Open Graph](https://ogp.me/)




