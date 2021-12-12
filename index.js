require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Character = require('./models/Character');
const { connectToMongoDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/characters', async (req, res) => {
    let { skip = 0, limit = 10, q = '' } = req.query;
    limit = Number(limit);
    skip = Number(skip);
    const filters = q ? { $text: { $search: q } } : {};

    try {
        const characters = await Character.find(filters)
            .sort({ 'name': 'ASC' })
            .limit(limit)
            .skip(skip);

        return res.status(200).json({
            total: characters.length,
            previous: skip <= 0 ? false : { skip: skip - limit },
            next: characters ? { skip: limit + skip } : false,
            data: characters
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});


connectToMongoDB(process.env.MONGODB_URI, (error) => {
    if (error) {
        console.log(error);
        return false;
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});