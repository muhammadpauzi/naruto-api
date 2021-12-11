require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Character = require('./models/Character');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/characters', async (req, res) => {
    try {
        const { skip = 0, limit = 10, q = '' } = req.params;
        limit = Number(limit);
        skip = Number(skip);

        const characters = await Character.find({ $text: { $search: q } })
            .sort({ 'createdAt': 'DESC' })
            .limit(limit)
            .skip(skip);

        return res.status(200).json({
            total: characters.length,
            previous: skip <= 0 ? false : { skip: limit + 1, limit: limit + 10 },
            next: characters ? { skip: limit + 1, limit: limit + 10 } : false,
            data: characters
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch(error => {
    console.log(error);
});