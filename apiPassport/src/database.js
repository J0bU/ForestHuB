const mongoose = require('mongoose');

const  {FORESTHUB_APP_MONGODB_DATABASE, FORESTHUB_APP_MONGODB_HOST}  = process.env;
const MONGODB_URI = `mongodb://${FORESTHUB_APP_MONGODB_HOST}/${FORESTHUB_APP_MONGODB_DATABASE}`;

// ---------- Creating connection to MongoDB -----------

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}). then (db => console.log('Database is connected'))
.catch(error => console.log(error));