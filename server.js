const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const authorRoutes = require('./routes/authors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(logger);


app.use('/posts', postRoutes);
app.use('/authors', authorRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Blogging Platform API!');
});


app.use(errorHandler);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
