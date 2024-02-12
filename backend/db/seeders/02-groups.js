'use strict';

const { Group, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Groups';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "Groups";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                name: 'Programming',
                avatar: "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg",
                banner: "https://www.hp.com/us-en/shop/app/assets/images/uploads/prod/10-Best-Free-Drawing-Software-Programs16746752375285.jpg",
                description: "Explore the world of coding and programming at Programming. Share your projects, seek advice, and engage with a community of fellow developers. Whether you're a seasoned coder or just starting, this is the place to discuss languages, frameworks, and everything in between. Let's code together!"
            },
            {
                userId: 1,
                name: 'WorldNews',
                avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/live-news-10494126-8447434.png",
                banner: "https://static.vecteezy.com/system/resources/previews/004/941/460/original/breaking-news-live-banner-on-world-map-background-illustration-vector.jpg",
                description: "Stay informed and join the conversation on global events at WorldNews. Discuss breaking news, share perspectives, and engage with a diverse community. From politics to cultural events, this subreddit is your hub for staying connected to the world. Explore different viewpoints and contribute to the ongoing dialogue on the latest happenings worldwide."
            },
            {
                userId: 1,
                name: 'Film',
                avatar: "https://i.pinimg.com/736x/6a/1d/7c/6a1d7c77fecd83549c46144c02f28a22.jpg",
                banner: "https://static.vecteezy.com/system/resources/previews/015/416/101/original/movie-time-sign-banner-recording-projector-icons-old-picture-roll-frame-filmstrip-spotlight-festival-cinema-poster-or-flyer-template-for-your-design-illustration-free-vector.jpg",
                description: "Welcome to FilmTalks, where movie enthusiasts gather to discuss the latest releases, timeless classics, and everything in between.Whether you're into heartwarming dramas, edge-of-your-seat thrillers, or laugh-out-loud comedies, this is the place to share your thoughts, recommendations, and dive into the world of cinema. Join us for insightful conversations, reviews, and a community passionate about the magic of storytelling through film. Lights, camera, discussion!"
            },
            {
                userId: 1,
                name: 'Gaming',
                avatar: "https://img.freepik.com/premium-photo/neon-poster-playstation-controller-with-controller-middle_705708-21634.jpg",
                banner: "https://wpimg.pixelied.com/blog/wp-content/uploads/2021/08/03132930/branded-banner-reddit-banner-size.jpg",
                description: 'Welcome to Gaming, your hub for all things gaming! Join the discussion on the latest releases, share your favorite moments, and connect with gamers worldwide. Level up your gaming experience with a community that understands your passion.'
            },
            {
                userId: 1,
                name: 'Books',
                description: "Immerse yourself in the world of literature at BookWorms. Share your favorite books, discover new genres, and engage in lively discussions with fellow book lovers. Whether you're a seasoned reader or just starting your literary journey, this community is your bookish haven."
            },
            {
                userId: 2,
                name: 'Cars',
                description: "For car enthusiasts, by car enthusiasts. Welcome to Cars, where petrolheads gather to discuss their favorite rides, share news about the automotive world, and connect with fellow car lovers. Whether you're into muscle cars, imports, or electric vehicles, you'll find your place in our community."
            },
            {
                userId: 2,
                name: 'Science',
                description: 'Dive into the fascinating world of science at ScienceHub. Explore groundbreaking discoveries, discuss scientific advancements, and connect with curious minds. From physics to biology, this subreddit is your gateway to the wonders of the natural world.'
            },
            {
                userId: 2,
                name: 'Cooking',
                description: "Savor the Flavor! Welcome to Cooking, where culinary enthusiasts gather to share recipes, tips, and tales from the kitchen. Whether you're a seasoned chef or a kitchen rookie, this community is your go-to destination for all things food."
            },
            {
                userId: 2,
                name: 'Photography',
                description: "Capture the moment at ShutterBuds. Join a community passionate about photography, share your best shots, and exchange tips on composition, editing, and gear. Whether you're a professional photographer or a smartphone snapper, this is the place to showcase your visual storytelling."
            },
            {
                userId: 2,
                name: 'Fitness',
                description: "Achieve your fitness goals with the community at Fitness! Share workout tips, get advice on nutrition, and connect with fellow enthusiasts. From strength training to yoga, everyone is welcome."
            },
            {
                userId: 3,
                name: 'Fashion',
                description: "Elevate your style game at Fashion! Discover the latest trends, share your unique looks, and discuss everything fashion-related. Whether you're into streetwear, haute couture, or DIY fashion hacks, our community celebrates individuality and creative expression."
            },
            {
                userId: 3,
                name: 'Space',
                description: "Discover the universe with Space! Join a community of space enthusiasts sharing captivating images, latest cosmic news, and engaging discussions about the final frontier. Whether you're a casual observer or an aspiring astronaut, this subreddit is your window to the cosmos. Explore, discuss, and marvel at the wonders of space."
            },
            {
                userId: 3,
                name: 'Animals',
                description: "Welcome to r/WildCreatures! A community dedicated to the incredible diversity of the animal kingdom. Share captivating photos, intriguing facts, and heartwarming stories about our furry, feathery, and finned friends."
            },
            {
                userId: 3,
                name: 'Travel',
                description: "Embark on a journey around the globe with TravelersUnite. Share your travel experiences, seek recommendations, and connect with fellow adventurers. Whether you're a backpacker, luxury traveler, or digital nomad, this subreddit welcomes all explorers to share their stories and tips."
            },
            {
                userId: 3,
                name: 'DIY',
                description: "Unleash your creativity at DIYCrafts. Share your craft projects, home improvement ideas, and DIY hacks with a community of fellow creators. Whether you're into woodworking, crafting, or upcycling, this subreddit is your workshop for inspiration and collaboration."
            }


        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Groups";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.in]: [1, 2, 3, 5] }
        })
    }
}
