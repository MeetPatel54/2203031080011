
import mongoose from './mongoose.js';

const urlSchema = new mongoose.Schema({
    shortcode: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiry: { type: Date, required: true },
    clicks: { type: Number, default: 0 },
    clickDetails: [{
        timestamp: { type: Date, default: Date.now },
        referrer: String,
        location: String
    }]
});

const Url = mongoose.model('Url', urlSchema);

export default Url;
