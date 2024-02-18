const random = require('getrandomjs');
const { faker } = require('@faker-js/faker');

const makePostSeeds = () => {
    const photoOptions = {
        width: 150,
        height: 150,
        category: 'House'
    }

    let seeders = [];

    for (let i = 0; i < 100; i++) {
        let seed = {};
        seed.title = faker.lorem.sentence()
        seed.postText = faker.lorem.sentences(5);
        seed.userId = random(1, 3)
        seed.categoryId = random(1, 3)
        seeders.push(seed)
    }

    return seeders;
}


const makeGroupSeeds = () => {

    let seeders = [];

    for (let i = 0; i < 4; i++) {
        let seed = {};
        seed.url = faker.image.avatar()
        seeders.push(seed)
    }

    return seeders;
}

console.log(makeGroupSeeds());

module.exports = { makePostSeeds }
