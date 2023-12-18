const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
// const axios = require('axios');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp_camp');

  const campgrounds = await Campground.find({});
  console.log('Database connected');
}

// async function seedImg() {
//     try {
//       const resp = await axios.get('https://api.unsplash.com/photos/random', {
//         params: {
//           client_id: 'CpCVKYNICTohH6iwh7sf_EyH-Vokbs-4skey_Fx0cgU',
//           collections: 1114848,
//         },
//       })
//       return resp.data.urls.small
//     } catch (err) {
//       console.error(err)
//     }
//   }

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
            //YOUR USER ID
            author: '65708adf7feeefb78602a05d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dipxo2tau/image/upload/v1702682761/YelpCamp/rmvtnlepwv4o2p3vlhbt.jpg',
                  filename: 'YelpCamp/rmvtnlepwv4o2p3vlhb'
                },
                {
                  url: 'https://res.cloudinary.com/dipxo2tau/image/upload/v1702682790/YelpCamp/thwolocbdtzbhnemwv8j.jpg',
                  filename: 'YelpCamp/thwolocbdtzbhnemwv8j'
                },
              ]
        })
        await camp.save();
    }
}

// const seedDB = async () => {
//     await Campground.deleteMany({})
//     for (let i = 0; i < 20; i++) {
//       // setup
//       const placeSeed = Math.floor(Math.random() * places.length)
//       const descriptorsSeed = Math.floor(Math.random() * descriptors.length)
//       const citySeed = Math.floor(Math.random() * cities.length)
   
//       // seed data into campground
//       const camp = new Campground({
//         imageUrl: await seedImg(),
//         title: `${descriptors[descriptorsSeed]} ${places[placeSeed]}`,
//         location: `${cities[citySeed].city}, ${cities[citySeed].state}`,
//         description:
//           'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!',
//       })
   
//       await camp.save()
//     }
//   }
  

seedDB().then(() => {
    mongoose.connection.close();
})