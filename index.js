const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

async function checkPumpkinSpice() {
    const url = 'https://www.starbucks.com/menu'; // Adjust if needed

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const bodyText = $('body').text();

        if (bodyText.toLowerCase().includes('pumpkin spice')) {
            return { found: true, message: '🎃 Pumpkin Spice is BACK!' };
        } else {
            return { found: false, message: '😢 No Pumpkin Spice yet.' };
        }
    } catch (err) {
        return { found: false, message: `Error: ${err.message}` };
    }
}

app.get('/check', async (req, res) => {
    const result = await checkPumpkinSpice();
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
