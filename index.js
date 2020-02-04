require('dotenv').config();

const {GoogleSpreadsheet} = require('google-spreadsheet');

// spreadsheet key is the long id in the sheets URL https://docs.google.com/spreadsheets/d/SHEET_ID/
const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

const metascraper = require('metascraper')([
    require('metascraper-author')(),
    require('metascraper-video')(),
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-date')(),
    require('metascraper-clearbit')({
        format: 'png'
    })
]);

const got = require('got');

//const targetUrl = 'https://www.alibaba.com/product-detail/Food-Beverage-Cosmetics-Natural-Preservative-Nisin_60718821637.html?spm=a2700.8270666-2.201612261929.9.2f306978lj1GzV';
const targetUrl = 'https://www.google.com';

(async () => {
    const {body: html, url} = await got(targetUrl);
    /** @type {object} */
    const metadata = await metascraper(
        {
            html,
            url
        });

    //console.log(metadata); You can uncomment this at the time of testing.

    // use service account creds
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    //const newSheet = await doc.addSheet({ title: 'Test-Sheet' });
    //const sheet = await doc.addSheet({ headers: ['author', 'image','video','description','date','logo','publisher'] });

    const sheet = doc.sheetsByIndex[0];

    //console.log(sheet.cellStats.loaded);
    //const rows = await sheet.getRows();
    //console.log(rows.length);

    // append rows
    await sheet.addRow({
        url: url,
        author: metadata.author,
        image: metadata.image,
        video: metadata.video,
        description: metadata.description,
        date: metadata.date,
        logo: metadata.logo,
        publisher: metadata.publisher
    });
    console.log('Yahoo! Sheet updated');
})();