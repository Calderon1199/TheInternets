'use strict';

const { Post, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "Posts";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                categoryId: 1,
                title: 'Code Showcase: Share Your Latest Projects',
                postText: `It's time to showcase your coding skills! Share your latest programming projects, whether it's a web app, game, or open-source contribution. Provide details about the technologies used, challenges faced, and the lessons learned during development. Get feedback and inspire fellow developers with your coding creations.`,
            },
            {
                userId: 2,
                categoryId: 1,
                title: 'Tech Stack Recommendations: What\'s Your Go-To Toolkit?',
                postText: `Discuss and share your preferred tech stack! Whether you're a backend developer, frontend wizard, or full-stack enthusiast, let the community know about your go-to programming languages, frameworks, and tools. Provide insights into why you love your tech stack and how it has enhanced your development workflow.`,
            },
            {
                userId: 3,
                categoryId: 1,
                title: 'Learning Resources: Must-Read Books for Programmers',
                postText: `Expand your programming knowledge! Share your recommendations for must-read books that have helped you grow as a programmer. Whether it's classic programming literature or the latest industry insights, contribute to the community's collective knowledge and help others on their learning journey.`,
            },
            {
                userId: 1,
                categoryId: 1,
                title: 'Debugging Chronicles: Tales from the Trenches',
                postText: `Share your most memorable debugging stories! From mysterious bugs to late-night coding sessions, recount your experiences in the debugging trenches. Whether you found a clever solution or learned a valuable lesson, let the community in on your debugging adventures.`,
            },
            {
                userId: 2,
                categoryId: 1,
                title: 'Remote Work Tips for Programmers: Boost Your Productivity',
                postText: `Embrace the remote coding life! Share your tips and tricks for staying productive while working remotely. Whether you have advice on setting up a home office, managing time effectively, or maintaining work-life balance, help fellow programmers thrive in the world of remote work.`,
            },
            {
                userId: 2,
                categoryId: 1,
                title: 'Introduction to JavaScript',
                postText: 'Hey everyone, just wanted to share my excitement about learning JavaScript. It opens up a whole new world of possibilities!'
            },
            {
                userId: 3,
                categoryId: 1,
                title: 'Favorite Python Libraries',
                postText: 'What are your go-to Python libraries? I love using Pandas and NumPy for data manipulation and analysis.'
            },
            {
                userId: 1,
                categoryId: 1,
                title: 'Getting Started with React',
                postText: 'New to React? Here are some beginner-friendly resources to help you get started with building modern web applications.'
            },
            {
                userId: 1,
                categoryId: 2,
                title: 'Global Climate Agreement Reached',
                postText: `Exciting news! World leaders have come together to reach a historic global climate agreement, aiming to address the pressing issue of climate change. The agreement includes ambitious targets for reducing carbon emissions, promoting sustainable practices, and fostering international cooperation. What are your thoughts on this development? How do you think this will impact the future of our planet? Share your insights and engage in a conversation about the importance of environmental sustainability.`,
            },
            {
                userId: 1,
                categoryId: 2,
                title: 'Climate Change Summit 2023: Key Takeaways',
                postText: `Discuss the highlights of the recent Climate Change Summit. Share insights into global efforts to combat climate change, agreements reached, and challenges ahead. Whether you're passionate about environmental issues or curious about the impact on world affairs, join the conversation.`,
            },
            {
                userId: 2,
                categoryId: 2,
                title: 'Economic Trends: Analyzing Global Market Shifts',
                postText: `Dive into the world of economics! Explore recent global market trends, trade developments, and financial shifts. Whether you're an investor, economist, or just interested in understanding the dynamics of the global economy, share your perspectives and engage with the community.`,
            },
            {
                userId: 3,
                categoryId: 2,
                title: 'Humanitarian Crisis in [Region]: How Can We Help?',
                postText: `Raise awareness about a humanitarian crisis and discuss potential ways to provide support. Share information, resources, and initiatives aimed at addressing the crisis. Whether it's a conflict zone, natural disaster, or social issue, join the conversation on making a positive impact.`,
            },
            {
                userId: 1,
                categoryId: 2,
                title: 'Global Health Initiatives: Progress and Challenges',
                postText: `Explore the latest updates on global health efforts. Discuss initiatives, breakthroughs, and challenges in addressing health issues on a global scale. Whether you're interested in infectious diseases, healthcare policies, or medical advancements, share your insights and contribute to the conversation.`,
            },
            {
                userId: 2,
                categoryId: 2,
                title: 'Diplomacy Unveiled: Current International Relations',
                postText: `Delve into the world of international relations! Discuss diplomatic developments, geopolitical shifts, and current affairs impacting global relations. Whether you're a student of political science or simply intrigued by world events, share your perspectives and engage in insightful conversations.`,
            },
            {
                userId: 2,
                categoryId: 2,
                title: 'Political Developments in Asia',
                postText: `Discussing recent political changes in Asia. From diplomatic relations to regional conflicts, there's a lot happening on the global stage. Share your insights and opinions on the current geopolitical landscape and its potential impact on the world. How do you perceive the role of Asia in shaping international affairs? Let's explore and analyze the complexities of global politics together.`,
            },
            {
                userId: 3,
                categoryId: 2,
                title: 'Advancements in Space Exploration',
                postText: `Breaking news in space exploration! A new mission has been launched to explore distant planets, uncovering the mysteries of the cosmos. Scientists and engineers are pushing the boundaries of what we know about the universe. Join the conversation about the latest discoveries, technological advancements, and the future of space exploration. What excites you the most about the possibilities that space holds for humanity?`,
            },
            {
                userId: 1,
                categoryId: 3,
                title: 'Classic Films Worth Revisiting',
                postText: `Let's talk about timeless classics! Share your favorite classic films and why they hold a special place in your heart. Whether it's the captivating storytelling, iconic performances, or groundbreaking cinematography, classic films have left a lasting impact on the world of cinema. What are some must-watch classics that you recommend to fellow movie enthusiasts? Join the discussion and rediscover the magic of cinema's golden age.`,
            },
            {
                userId: 1,
                categoryId: 3,
                title: 'Hidden Gems of Cinema: Underrated Masterpieces',
                postText: `Share your favorite underrated films that deserve more recognition. Whether it's an indie gem, a foreign classic, or a forgotten masterpiece, introduce fellow film enthusiasts to hidden treasures and engage in discussions about cinematic gems.`,
            },
            {
                userId: 2,
                categoryId: 3,
                title: 'Director Spotlight: Exploring [Director\'s Name]',
                postText: `Dive into the filmography of a specific director. Discuss their unique style, notable works, and the impact they've had on the world of cinema. Whether it's a legendary director or a rising star, share your insights and recommendations.`,
            },
            {
                userId: 3,
                categoryId: 3,
                title: 'Favorite Movie Quotes: Share Yours!',
                postText: `What are your all-time favorite movie quotes? Whether they're inspiring, funny, or thought-provoking, share the lines that have stayed with you. Engage with the community and discover new memorable quotes from the world of film.`,
            },
            {
                userId: 1,
                categoryId: 3,
                title: 'Classic Film Marathon: Recommendations Needed',
                postText: `Planning a classic film marathon? Seek recommendations from the community for timeless films to include. Whether you're into golden age cinema or iconic classics, get suggestions and share your must-watch list for the perfect movie marathon experience.`,
            },
            {
                userId: 2,
                categoryId: 3,
                title: 'Film Score Appreciation: Your Favorite Soundtracks',
                postText: `Celebrate the magic of film scores! Share your favorite soundtracks that have enhanced your movie-watching experience. Whether it's a memorable theme or a composition that perfectly complements a scene, discuss the power of music in cinema.`,
            },
            {
                userId: 2,
                categoryId: 3,
                title: 'Hidden Gems of Contemporary Cinema',
                postText: `Exploring hidden gems in modern cinema! Sometimes, exceptional films fly under the radar despite their brilliance. Share your discoveries of underrated or overlooked movies that deserve more recognition. Whether it's an indie masterpiece, a foreign gem, or an unconventional storytelling approach, let's shine a spotlight on the hidden treasures within the diverse landscape of contemporary cinema.`,
            },
            {
                userId: 3,
                categoryId: 3,
                title: 'Anticipated Movie Releases of the Year',
                postText: `Excitement is in the air for upcoming movie releases! Share your most anticipated films of the year and discuss the trailers, cast, and plot expectations. Whether it's a blockbuster, indie darling, or highly anticipated sequel, let's build the anticipation together. Which movies are you counting down the days to see? Join the conversation and create a buzz about the cinematic experiences that lie ahead!`,
            },
            {
                userId: 1,
                categoryId: 4,
                title: 'Favorite Video Game Soundtracks',
                postText: `Let's dive into the world of gaming music! Share your favorite video game soundtracks and the memorable tracks that have enhanced your gaming experience. Whether it's the epic tunes of RPGs, the adrenaline-pumping beats of action games, or the nostalgic melodies from classic titles, music plays a crucial role in shaping our gaming memories. What game soundtracks hold a special place in your heart, and why? Join the discussion and discover new musical gems!`,
            },
            {
                userId: 3,
                categoryId: 4,
                title: 'Top 10 Indie Games You Shouldn\'t Miss',
                postText: `Discover hidden indie gems! Share your top picks for indie games that have captivated you. Whether it's unique gameplay mechanics, compelling stories, or stunning visuals, introduce the community to indie titles that deserve attention.`,
            },
            {
                userId: 1,
                categoryId: 4,
                title: 'Gaming Nostalgia: Your Favorite Childhood Games',
                postText: `Take a trip down memory lane! Share your favorite video games from your childhood. Discuss the games that shaped your gaming experience and find fellow gamers who share similar nostalgic memories.`,
            },
            {
                userId: 2,
                categoryId: 4,
                title: 'Game Review: [Title of the Game]',
                postText: `Write a review for a recent game you've played! Share your thoughts on the gameplay, graphics, and overall experience. Encourage discussions about the game's strengths and weaknesses, and let the community know if it's worth playing.`,
            },
            {
                userId: 3,
                categoryId: 4,
                title: 'Virtual Reality Gaming: Experiences and Recommendations',
                postText: `Explore the world of virtual reality! Share your experiences with VR gaming, recommend VR titles, and discuss the potential of this immersive gaming technology. Whether you're a VR enthusiast or a curious gamer, join the conversation.`,
            },
            {
                userId: 1,
                categoryId: 4,
                title: 'Upcoming Game Releases: What Are You Excited About?',
                postText: `Anticipating new game releases? Discuss upcoming titles that have caught your attention. Whether it's the latest AAA blockbuster or an indie gem, share your excitement and find out what others are looking forward to.`,
            },
            {
                userId: 2,
                categoryId: 4,
                title: 'Most Challenging Boss Battles',
                postText: `Battle-tested gamers, unite! Share your experiences facing the most challenging boss battles in gaming history. Whether it's overcoming an epic raid boss, defeating a seemingly unbeatable foe, or conquering a punishing level, we've all faced our share of gaming trials. What boss battles stand out as the most difficult, and how did you overcome them? Swap strategies, share war stories, and celebrate the victories that tested your gaming skills to the limit!`,
            },
            {
                userId: 3,
                categoryId: 4,
                title: 'Gaming Nostalgia: Your First Console/Game',
                postText: `Take a trip down memory lane! Share the nostalgia of your first gaming console or the first video game that captured your heart. Whether it's reminiscing about the pixelated adventures of classic consoles or the groundbreaking moments that defined your gaming journey, let's celebrate the joy of gaming nostalgia. What was your introduction to the world of gaming, and how did it shape your love for this immersive form of entertainment? Share your cherished gaming memories with fellow enthusiasts!`,
            },
            {
                userId: 1,
                categoryId: 5,
                title: 'Book Recommendations: Your Top Picks',
                postText: 'Share your favorite books! Create a list of your top recommendations and provide a brief overview of each. Whether it\'s fiction, non-fiction, mystery, or fantasy, let\'s exchange reading gems and discover new literary treasures.',
            },
            {
                userId: 2,
                categoryId: 5,
                title: 'Book Club Announcement: Join the Reading Journey!',
                postText: 'Start a book club discussion! Announce the launch of a book club, share the chosen book, and invite members to join. Discuss reading schedules, meeting plans, and the excitement of delving into a shared literary adventure.',
            },
            {
                userId: 3,
                categoryId: 5,
                title: 'Author Spotlight: Discovering Hidden Gems',
                postText: 'Highlight lesser-known authors! Introduce the community to talented writers who might be flying under the radar. Share information about their works, discuss writing styles, and encourage others to explore these hidden literary gems.',
            },
            {
                userId: 1,
                categoryId: 5,
                title: 'Book-to-Film Adaptations: Hits and Misses',
                postText: 'Explore the world of book-to-film adaptations! Discuss your favorite adaptations, compare them to the source material, and share thoughts on casting choices. Whether it\'s a cinematic success or a disappointment, let\'s talk about these literary journeys on the big screen.',
            },
            {
                userId: 2,
                categoryId: 5,
                title: 'Reading Challenges: Setting and Achieving Goals',
                postText: 'Embark on a reading challenge together! Share your reading goals, whether it\'s a certain number of books, exploring specific genres, or tackling a classic. Discuss progress, recommend books that fit the challenge, and motivate each other to achieve literary milestones.',
            },
            {
                userId: 3,
                categoryId: 5,
                title: 'Bookstore Finds: Hidden Treasures on the Shelves',
                postText: 'Discover hidden treasures at your local bookstore! Share your recent finds, whether they\'re new releases, discounted gems, or rare editions. Discuss the joy of browsing through bookstores and stumbling upon unexpected literary delights.',
            },
            {
                userId: 1,
                categoryId: 5,
                title: 'Book Review: Share Your Honest Opinions',
                postText: 'Write a book review! Share your thoughts on a recently finished book, covering aspects like plot, characters, writing style, and overall impressions. Encourage others to share their reviews and create a space for diverse literary discussions.',
            },
            {
                userId: 2,
                categoryId: 5,
                title: 'Bookish Quotes: Inspirational and Memorable',
                postText: 'Collect and share your favorite book quotes! Whether they\'re inspirational, thought-provoking, or simply beautifully written, compile a list of quotes that resonate with you. Discuss the impact of these words and invite others to contribute their most cherished bookish quotes.',
            },
            {
                userId: 2,
                categoryId: 6,
                title: 'Classic Car Showdown: Your Favorite Vintage Models',
                postText: 'Showcase your love for classic cars! Share pictures and stories of your favorite vintage models. Whether it\'s the iconic design, historical significance, or personal memories, let\'s celebrate the timeless beauty of classic automobiles.',
            },
            {
                userId: 1,
                categoryId: 6,
                title: 'DIY Car Maintenance Tips for Beginners',
                postText: 'Empower fellow car enthusiasts with DIY maintenance tips! Share your knowledge on basic car maintenance, from changing oil and replacing air filters to handling minor repairs. Help beginners get started on keeping their vehicles in top condition.',
            },
            {
                userId: 2,
                categoryId: 6,
                title: 'Car Modifications: Before and After',
                postText: 'Share your car transformation journey! Post pictures of your vehicle before and after modifications. Discuss the changes you\'ve made, whether it\'s performance upgrades, cosmetic enhancements, or personalized touches that make your car stand out.',
            },
            {
                userId: 3,
                categoryId: 6,
                title: 'Dream Car Wishlist: What\'s on Your Automotive Bucket List?',
                postText: 'Fantasize about your dream cars! Share your automotive bucket list and discuss the cars you\'ve always dreamed of owning. Whether it\'s a sleek sports car, rugged off-roader, or luxury sedan, let\'s talk about the cars that fuel our automotive dreams.',
            },
            {
                userId: 1,
                categoryId: 6,
                title: 'Car Enthusiast Meetup: Plan and Discuss!',
                postText: 'Connect with local car enthusiasts! Plan a meetup, share details about car shows or events in your area, and discuss the excitement of meeting fellow car lovers. Whether it\'s a casual gathering or a big car meet, bring the community together.',
            },
            {
                userId: 1,
                categoryId: 6,
                title: 'Dream Car Discussion',
                postText: `Rev up the engines, car enthusiasts! Let's talk about our dream cars. Whether it's a sleek sports car, a rugged off-roader, or a classic beauty, share the details of your dream ride. What features make it stand out for you, and what adventures would you embark on with your dream car? From speed demons to vintage classics, this is the place to gush about the cars that fuel your automotive fantasies!`,
            },
            {
                userId: 2,
                categoryId: 6,
                title: 'DIY Car Maintenance Tips',
                postText: `Calling all DIY mechanics! Share your best tips and tricks for maintaining your car at home. From changing oil and replacing brake pads to tackling more advanced repairs, let's compile a knowledge base of practical car maintenance advice. Whether you're a seasoned gearhead or a novice enthusiast, everyone can benefit from learning how to keep their vehicles running smoothly. Share your insights and help fellow car owners become masters of DIY car care!`,
            },
            {
                userId: 1,
                categoryId: 7,
                title: 'Recent Scientific Breakthroughs: A Summary',
                postText: 'Explore the latest scientific breakthroughs! Summarize recent discoveries in various fields such as physics, biology, chemistry, and astronomy. Discuss the potential impact of these breakthroughs on our understanding of the world and future applications.',
            },
            {
                userId: 2,
                categoryId: 7,
                title: 'Ask a Scientist: Your Science Questions Answered',
                postText: 'Curious about science? Start an "Ask Me Anything" thread with scientists! Encourage community members to ask questions about scientific concepts, research, or any topic of interest. Create a space for informative and engaging conversations with experts.',
            },
            {
                userId: 3,
                categoryId: 7,
                title: 'Science Fiction vs. Science Facts: Discussing the Parallels',
                postText: 'Delve into the world of science fiction and its connection to real science. Discuss popular sci-fi themes and concepts, exploring the parallels between speculative fiction and current scientific advancements. Share recommendations for science fiction that inspired or accurately predicted future discoveries.',
            },
            {
                userId: 1,
                categoryId: 7,
                title: 'DIY Science Experiments: Fun and Educational',
                postText: 'Share your favorite science experiments! Whether it\'s a simple at-home experiment or a more complex project, provide step-by-step instructions. Discuss the scientific principles behind the experiments and encourage others to share their hands-on science activities.',
            },
            {
                userId: 2,
                categoryId: 7,
                title: 'Environmental Science: Addressing Climate Change',
                postText: 'Discuss environmental issues and solutions! Explore topics related to climate change, biodiversity, and sustainable practices. Share articles, studies, and personal initiatives that contribute to a better understanding of environmental science and its implications.',
            },
            {
                userId: 3,
                categoryId: 7,
                title: 'The Wonders of Space: Astronomy Adventures',
                postText: 'Embark on a journey through space! Share fascinating facts about celestial bodies, upcoming astronomical events, and the latest findings in astronomy. Encourage discussions about the mysteries of the universe and the technological advancements in space exploration.',
            },
            {
                userId: 1,
                categoryId: 7,
                title: 'Biotechnology Innovations: Changing the Future',
                postText: 'Explore the world of biotechnology! Discuss recent innovations, breakthroughs, and ethical considerations in the field of biotech. Share articles, news, and personal insights into how biotechnology is shaping the future of medicine, agriculture, and more.',
            },
            {
                userId: 2,
                categoryId: 7,
                title: 'Science Education: Engaging Students in STEM',
                postText: 'Share tips and resources for science education! Discuss effective ways to engage students in STEM (science, technology, engineering, and mathematics) subjects. Share experiences, lesson plans, and online resources that make learning science fun and accessible.',
            },
            {
                userId: 1,
                categoryId: 8,
                title: 'Favorite Family Recipes',
                postText: `Let's celebrate the heart of every kitchen – family recipes! Share your favorite recipes that have been passed down through generations. Whether it's grandma's secret sauce, a beloved holiday dish, or a comforting weeknight meal, spread the joy of home-cooked traditions. Include the ingredients, step-by-step instructions, and any personal stories that make these recipes special to you. Get ready for a virtual potluck filled with flavor and nostalgia!`,
            },
            {
                userId: 1,
                categoryId: 8,
                title: 'Cooking Challenge: One-Pot Wonders',
                postText: 'Join the one-pot wonders challenge! Share your favorite recipes that require only one pot for cooking. Whether it\'s a hearty stew, pasta dish, or flavorful curry, inspire the community with your delicious creations. Don\'t forget to include cooking tips and modifications!',
            },
            {
                userId: 2,
                categoryId: 8,
                title: 'International Flavors: Recipe Exchange',
                postText: 'Explore international cuisines with a recipe exchange! Share your go-to recipes inspired by different cultures and encourage others to do the same. Discuss unique ingredients, cooking techniques, and the stories behind your favorite international dishes.',
            },
            {
                userId: 3,
                categoryId: 8,
                title: 'Dessert Delights: Sweet Tooth Satisfaction',
                postText: 'Indulge in the world of desserts! Share your favorite dessert recipes, whether it\'s decadent cakes, cookies, or creative treats. Discuss baking tips, flavor combinations, and showcase your sweet creations. Let\'s satisfy those sweet cravings!',
            },
            {
                userId: 1,
                categoryId: 8,
                title: 'Kitchen Hacks: Time-Saving Tips and Tricks',
                postText: 'Share your best kitchen hacks! Whether it\'s a time-saving technique, a clever utensil repurpose, or a cooking shortcut, contribute to a collection of helpful tips. Encourage the community to share their own kitchen hacks for smoother cooking experiences.',
            },
            {
                userId: 2,
                categoryId: 8,
                title: 'Seasonal Cooking: Embracing Fresh Ingredients',
                postText: 'Celebrate the seasons with fresh and seasonal cooking! Share recipes that highlight the best ingredients each season has to offer. Discuss your favorite seasonal dishes, local produce, and creative ways to incorporate freshness into your meals.',
            },
            {
                userId: 2,
                categoryId: 8,
                title: 'Cooking Challenge: One-Pot Wonders',
                postText: `Time to test your culinary creativity! Join the one-pot wonders challenge and share your go-to recipes that require only a single pot or pan. Whether it's a hearty stew, a flavorful stir-fry, or a comforting pasta dish, show off your skills in creating delicious meals with minimal cleanup. Don't forget to share tips for maximizing flavor with limited cookware. Let the one-pot feast begin!`,
            },
            {
                userId: 3,
                categoryId: 8,
                title: 'Ingredient Spotlight: Avocado Extravaganza',
                postText: `Avocado lovers, unite! In this ingredient spotlight, let's explore the versatile world of avocados. Share your favorite avocado-based recipes – from creamy guacamole to avocado toast with creative toppings. Discuss the health benefits, cooking techniques, and unique flavor combinations that make avocados a kitchen staple. Whether you're a seasoned avocado aficionado or looking to try something new, join the discussion and discover the many ways to enjoy this green superfood!`,
            },
            {
                userId: 1,
                categoryId: 10,
                title: 'Morning Workout Routine for Energy Boost',
                postText: `Rise and shine, fitness enthusiasts! Share your invigorating morning workout routines that help kickstart your day with energy. Whether it's a quick jog, a high-intensity interval training (HIIT) session, or a yoga flow, inspire others to embrace a healthy start. Include your favorite exercises, motivational tips, and how you stay consistent with your morning fitness regimen. Let's build a community of early birds committed to wellness!`,
            },
            {
                userId: 3,
                categoryId: 10,
                title: 'Home Workout Essentials: Building Your Fitness Space',
                postText: 'Create the perfect home workout space! Share your tips on selecting essential equipment, arranging your workout area, and maintaining motivation for home fitness routines. Whether you have a dedicated gym space or make the most of limited room, inspire others to achieve their fitness goals at home.',
            },
            {
                userId: 1,
                categoryId: 7,
                title: 'Nutrition Tips: Fueling Your Fitness Journey',
                postText: 'Discuss nutrition strategies for fitness success! Share your favorite pre-workout snacks, post-workout meals, and dietary tips to support your fitness goals. Whether you\'re focused on muscle gain, weight loss, or overall well-being, help the community make informed choices about nutrition and fitness.',
            },
            {
                userId: 2,
                categoryId: 10,
                title: 'Running Enthusiasts Unite: Favorite Routes and Tips',
                postText: 'Calling all runners! Share your favorite running routes, race experiences, and tips for improving endurance. Whether you\'re a seasoned marathoner or just starting with casual jogs, connect with fellow running enthusiasts and exchange insights on the joy of running.',
            },
            {
                userId: 3,
                categoryId: 10,
                title: 'Mind-Body Connection: Yoga and Meditation Practices',
                postText: 'Explore the mind-body connection through yoga and meditation! Share your favorite practices, recommended resources, and experiences with finding balance. Whether you\'re a seasoned yogi or a beginner looking for guidance, contribute to a community focused on holistic well-being.',
            },
            {
                userId: 1,
                categoryId: 10,
                title: 'Fitness Challenges: Setting and Achieving Goals Together',
                postText: 'Embark on a fitness challenge journey! Share your fitness goals, progress updates, and tips for staying motivated. Whether it\'s a weightlifting challenge, running streak, or a month of yoga, invite others to join and support each other on the path to a healthier lifestyle.',
            },
            {
                userId: 2,
                categoryId: 10,
                title: 'Fitness Challenges: Plank Challenge!',
                postText: `Calling all plank enthusiasts! Join the fitness challenge and see how long you can hold the plank position. Share your progress, tips for improving plank endurance, and encourage fellow community members to join in. Whether you're a plank pro or a beginner, everyone is welcome to participate. Let's support each other on the journey to a stronger core and overall fitness!`,
            },
            {
                userId: 3,
                categoryId: 10,
                title: 'Nutrition Q&A: Ask the Experts',
                postText: `Have burning questions about nutrition and fitness? In this post, we're hosting a Nutrition Q&A session with fitness experts. Ask about meal planning, dietary tips, pre/post-workout nutrition, or any nutrition-related queries you have. Our knowledgeable community members and fitness experts will provide insights to help you make informed choices on your fitness journey. Don't be shy – ask away and prioritize your health!`,
            },
            {
                userId: 1,
                categoryId: 11,
                title: 'Seasonal Fashion Trends: Fall Edition',
                postText: `Embrace the crisp air and falling leaves with the latest autumn fashion trends! Share your favorite fall wardrobe essentials, styling tips, and must-have accessories. From cozy sweaters to chic boots, let's discuss how to stay both stylish and comfortable during the fall season. Don't forget to include photos of your favorite fall outfits for inspiration. Fashionistas, unite!`,
            },
            {
    userId: 3,
    categoryId: 11,
    title: 'Fashion Trends 2023: What’s In and What’s Out',
    postText: 'Stay ahead in the fashion game! Share insights on the latest trends for 2023, discuss emerging styles, and provide inspiration for fellow fashion enthusiasts. Whether it\'s streetwear, haute couture, or DIY fashion, let the community know what\'s hot and what\'s not.',
  },
  {
    userId: 1,
    categoryId: 11,
    title: 'DIY Fashion: Upcycling Old Clothes into New Treasures',
    postText: 'Get creative with your wardrobe! Share your best DIY fashion projects, from upcycling old garments to creating unique accessories. Inspire others with your crafting skills and sustainable fashion practices. Join the discussion on reducing fashion waste and expressing individual style through creativity.',
  },
  {
    userId: 2,
    categoryId: 11,
    title: 'Fashion Icons: Who Inspires Your Style?',
    postText: 'Celebrate fashion icons and influencers! Discuss the personalities who inspire your style choices, share their impact on the fashion industry, and explore the timeless influence of iconic figures. Whether it\'s vintage elegance or contemporary chic, dive into the world of fashion inspiration.',
  },
  {
    userId: 3,
    categoryId: 11,
    title: 'Budget-Friendly Fashion: Tips for Affordable Style',
    postText: 'Look fabulous on a budget! Share your favorite tips for finding affordable yet stylish clothing, accessories, and beauty products. Whether it\'s thrifting, sales, or DIY hacks, help the community achieve a chic look without breaking the bank.',
  },
  {
    userId: 1,
    categoryId: 11,
    title: 'Fashion Hacks: Quick Tips for Elevating Your Everyday Look',
    postText: 'Upgrade your style with simple hacks! Share quick tips for enhancing your everyday fashion, from accessorizing to mixing and matching. Whether it\'s maximizing wardrobe versatility or styling on the go, contribute to a thread of fashion shortcuts for the community.',
  },
            {
                userId: 2,
                categoryId: 11,
                title: 'DIY Fashion: Upcycling Old Clothes',
                postText: `Get creative and sustainable with your fashion choices! Share your DIY fashion projects and tips for upcycling old clothes into trendy and unique pieces. Whether it's transforming an old pair of jeans into shorts or adding embellishments to a plain shirt, inspire others to reduce waste and revamp their wardrobes. Include before-and-after photos of your upcycling adventures. Let's make fashion eco-friendly and fun!`,
            },
            {
                userId: 3,
                categoryId: 11,
                title: 'Fashion Haul: Recent Finds and Favorites',
                postText: `It's time for a fashion haul! Showcase your recent fashion finds, whether they're thrift store treasures, online purchases, or unique boutique discoveries. Share your styling ideas, where you snagged the best deals, and any fashion-related stories behind your new pieces. Encourage fellow fashion enthusiasts to share their own hauls, and let's celebrate the diversity of personal style within our community.`,
            },
            {
                userId: 1,
                categoryId: 12,
                title: 'Mars Exploration: The Latest Discoveries',
                postText: `Dive into the latest updates on Mars exploration! Discuss recent findings from rovers, upcoming missions, and breakthroughs in our understanding of the Red Planet. Whether you're a space enthusiast, scientist, or just curious about the mysteries of Mars, share your thoughts and engage in conversations about the future of interplanetary exploration.`,
            },
            {
                userId: 2,
                categoryId: 12,
                title: 'Stargazing Tips for Beginners',
                postText: `Calling all aspiring astronomers! Share your best stargazing tips for beginners. From identifying constellations and planets to choosing the right telescope, help newcomers navigate the wonders of the night sky. Share your favorite stargazing spots, recommended equipment, and any celestial events worth watching. Let's inspire a new generation of stargazers and foster a love for the cosmos!`,
            },
            {
                userId: 3,
                categoryId: 7,
                title: 'The Great Beyond: Exploring Exoplanets',
                postText: `Embark on a journey beyond our solar system and explore the fascinating world of exoplanets. Discuss recent discoveries, research findings, and the potential for finding habitable exoplanets. Whether you're a space science enthusiast or simply intrigued by the vastness of the universe, join the conversation about the possibilities of life beyond Earth. Share your favorite resources and articles on exoplanetary exploration.`,
            },
            {
                userId: 3,
                categoryId: 3,
                title: 'Wildlife Photography: Share Your Best Shots!',
                postText: `Calling all wildlife photographers! Showcase your best shots of animals in their natural habitat. Whether it's a majestic lion on the savannah, a playful dolphin in the ocean, or a curious squirrel in your backyard, share the beauty and diversity of wildlife through your lens. Don't forget to include any interesting stories or experiences behind your photos.`,
            },
            {
                userId: 1,
                categoryId: 13,
                title: 'Pet Tales: Heartwarming Stories About Your Furry Friends',
                postText: `Share heartwarming stories about your beloved pets! Whether it's a tale of loyalty, funny antics, or unexpected friendships, let's celebrate the joy that our furry, feathered, or finned companions bring to our lives. Share photos, videos, and anecdotes that capture the special moments with your pets.`,
            },
            {
                userId: 2,
                categoryId: 13,
                title: 'Animal Conservation: Initiatives and Success Stories',
                postText: `Join the discussion on animal conservation! Share information about ongoing initiatives, success stories, and challenges in the world of wildlife preservation. Whether it's efforts to protect endangered species, restore habitats, or promote ethical practices, let's explore how we can contribute to the well-being of our planet's diverse fauna.`,
            },
            {
                userId: 3,
                categoryId: 13,
                title: 'Birdwatching Diary: Recent Sightings and Discoveries',
                postText: `Birdwatchers unite! Keep a diary of your recent birdwatching adventures. Share your sightings, identify new species, and discuss the fascinating world of avian creatures. Whether you're a seasoned birder or a beginner, this is the place to connect with fellow bird enthusiasts and appreciate the beauty of our feathered friends.`,
            },
            {
                userId: 1,
                categoryId: 13,
                title: 'Marine Life Wonders: Underwater Encounters',
                postText: `Dive into the world of marine life! Share your underwater encounters, whether it's swimming with dolphins, discovering vibrant coral reefs, or encountering mysterious sea creatures. From scuba diving adventures to marine conservation efforts, let's explore and appreciate the wonders of the ocean together.`,
            },
            {
                userId: 1,
                categoryId: 11,
                title: 'Hidden Gems: Share Your Unexplored Travel Destinations',
                postText: `Discover and share hidden gems around the world! Whether it's a secluded beach, a charming village, or a breathtaking hiking trail, share your favorite unexplored travel destinations. Provide tips, recommendations, and captivating stories about your off-the-beaten-path adventures.`,
            },
            {
                userId: 2,
                categoryId: 14,
                title: 'Solo Travel Chronicles: Memorable Moments on the Road',
                postText: `Calling all solo travelers! Chronicle your memorable moments on the road. Share stories of self-discovery, unexpected encounters, and the joys of navigating the world alone. Whether you've backpacked through Europe or explored remote landscapes, inspire others to embark on their solo travel journeys.`,
            },
            {
                userId: 3,
                categoryId: 14,
                title: 'Local Cuisine Exploration: Food Adventures Abroad',
                postText: `Indulge in the flavors of travel! Share your culinary adventures from around the world. Whether it's savoring street food in Asia, enjoying a traditional European feast, or discovering hidden cafes, take us on a journey through the diverse and delicious world of global cuisine.`,
            },
            {
                userId: 1,
                categoryId: 14,
                title: 'Cultural Exchange: Immersive Experiences with Locals',
                postText: `Immerse yourself in different cultures! Share your experiences of cultural exchange, from participating in local traditions to forging connections with residents. Whether it's a homestay, cultural festival, or language immersion, let's celebrate the beauty of connecting with communities worldwide.`,
            },
            {
                userId: 2,
                categoryId: 14,
                title: 'Epic Road Trips: Your Unforgettable On-the-Road Stories',
                postText: `Hit the road and share your epic road trip stories! Whether it's a cross-country adventure, a scenic drive through mountains, or a spontaneous journey with friends, recount your unforgettable moments on the open road. Inspire fellow travelers to embark on their own road trip escapades.`,
            },

        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = "Posts";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options.tableName, {
            userId: { [Op.in]: [1, 2, 3, 4] }
        }, {});
    }
};
