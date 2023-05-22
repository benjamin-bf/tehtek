const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('Connected to Database'));
}
app.listen(process.env.PORT, () => console.log('Server listening on port 3000!'));

connectToDB();


app.use(express.static('public'));


