// models/mongoose.js
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://2203031080011:pGS3gkiAqGOlCiSH@cluster0.csjwkp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

export default mongoose;
