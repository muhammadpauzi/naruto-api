const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');

const getAllCharacterPageNamesByFirstLetter = async (firstLetter = "") => {
    // initial variables
    const characters = [];
    const baseURL = `https://naruto.fandom.com/wiki/Category:Characters?from=${firstLetter}`;

    // Download page
    console.log(`Downloading page "${firstLetter}"...`);
    const { data } = await axios.get(baseURL);
    console.log(`Page "${firstLetter}" downloaded!`);

    // Scriping process
    const $ = cheerio.load(data);
    const categoriesUL = $('ul.category-page__members-for-char');
    const categoriesLIs = categoriesUL.find('li.category-page__member')

    for (let i = 0; i < categoriesLIs.length; i++) {
        const li = categoriesLIs[i];

        const characterLink = $(li).find('a.category-page__member-link');
        const name = characterLink.attr('href').replace('/wiki/', '');
        characters.push(name);
    }
    return characters;
}

const getAllCharacterPageNames = async () => {
    // initial variables
    const firstLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // const firstLetters = ['A'];
    let allCharacters = [];

    for (let i = 0; i < firstLetters.length; i++) {
        const letter = firstLetters[i];
        const characters = await getAllCharacterPageNamesByFirstLetter(letter)
        allCharacters = [...allCharacters, ...characters];
    }
    return allCharacters;
}

const getCharacterInfo = async (link = "") => {
    // initial variables
    let info = { name: '', picture: 'default.jpg' };
    const baseURL = `https://naruto.fandom.com/wiki/${link}`;

    // Download page
    console.log(`Downloading page "${link}"...`);
    const { data } = await axios.get(baseURL);
    console.log(`Page "${link}" downloaded!`);

    // Scriping process
    const $ = cheerio.load(data);
    const infoBox = $('table.infobox');
    info.name = $(infoBox).find('.title').text() || info.name;
    info.picture = $(infoBox).find('.imagecell img').attr('src') || info.picture;

    return info;
}

const getAllCharacterInfos = async (characterLinks = []) => {
    let allCharacterInfos = [];

    for (let i = 0; i < characterLinks.length; i++) {
        const characterLink = characterLinks[i];
        const characterInfo = await getCharacterInfo(characterLink)
        allCharacterInfos = [...allCharacterInfos, characterInfo];
    }
    return allCharacterInfos;
}

(async () => {
    const allCharacters = await getAllCharacterPageNames();
    const allCharacterInfos = await getAllCharacterInfos(allCharacters);
    fs.writeFileSync('data.json', JSON.stringify(allCharacterInfos));
})();