import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/urlData.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { url, validity = 30, shortcode } = req.body;
    let code = shortcode || nanoid(6);

    if (!/^[a-zA-Z0-9]{4,10}$/.test(code)) {
        return res.status(400).json({ error: 'Invalid shortcode format' });
    }

    const existing = await Url.findOne({ shortcode: code });
    if (existing) {
        return res.status(409).json({ error: 'Shortcode already in use' });
    }

    const expiryDate = new Date(Date.now() + validity * 60000);

    const newUrl = new Url({
        shortcode: code,
        url,
        expiry: expiryDate
    });

    await newUrl.save();

    res.status(201).json({
        shortLink: `http://localhost:3000/${code}`,
        expiry: expiryDate.toISOString()
    });
});

router.get('/:shortcode', async (req, res) => {
    const { shortcode } = req.params;

    const urlData = await Url.findOne({ shortcode });

    if (!urlData) {
        return res.status(404).json({ error: 'Shortcode not found' });
    }

    res.json({
        url: urlData.url,
        createdAt: urlData.createdAt,
        expiry: urlData.expiry,
        clicks: urlData.clicks,
        clickDetails: urlData.clickDetails
    });
});

export default router;
