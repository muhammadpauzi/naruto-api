const fs = require('fs');
require('dotenv').config();
const { connectToMongoDB } = require('./db');
const Character = require('./models/Character');

const generateData = () => {
    const data = JSON.parse(fs.readFileSync('data.json', { encoding: 'utf-8' }));
    generatedData = []
    data.map((character, i) => {
        const name = character.name;
        character.name = character.name.replace(/[^\x00-\x7F\n]/g, "").trim();
        character.nameInJapan = name.replace(/[^\W\n]/g, "").trim() || null;
        character.picture = character.picture;
        if (!character.name)
            return
        generatedData.push(character);
    });
    return generatedData;
}

const insertToDB = async () => {
    try {
        console.log("Inserting data...");
        await Character.deleteMany({});
        await Character.insertMany(generateData());
        console.log("Data have successfully inserted!");
    } catch (error) {
        console.log(error);
    }
}

connectToMongoDB(process.env.MONGODB_URI, (error) => {
    if (error) {
        console.log(error);
        return false;
    }

    insertToDB();
});