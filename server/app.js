import express from 'express';
import shortUrlRouter from './routes/shorturl.js';
import logger from './middlewares/logger.js';
import Url from './models/urlData.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use('/shorturls', shortUrlRouter);

app.get('/:shortcode', async (req, res) => {
    const { shortcode } = req.params;
    const urlData = await Url.findOne({ shortcode });

    if (!urlData) {
        return res.status(404).json({ error: 'Shortcode not found' });
    }

    const now = new Date();
    if (now > urlData.expiry) {
        return res.status(410).json({ error: 'Shortcode expired' });
    }

    // Update analytics
    urlData.clicks++;
    urlData.clickDetails.push({
        timestamp: now,
        referrer: req.get('Referrer') || 'Direct',
        location: 'Unknown'
    });
    await urlData.save();

    return res.redirect(urlData.url);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
