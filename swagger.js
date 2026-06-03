const swaggerAutogen = require('swagger-autogen')();



const doc = {
    info: {
        title: 'Fight Companion API',
        description: 'API documentation for the Fight Companion application',
    },
    host: 'cse-341-fight-companion.onrender.com',
    schemes: ['https'],

    definitions: {
        Event: {
            eventCode: "UFC300",
            title: "UFC 300: Pereira vs. Hill",
            date: "2024-04-13T22:00:00.000Z",
            venue: "T-Mobile Arena",
            city: "Las Vegas",
            country: "USA",
            broadcastNetwork: "ESPN+ PPV"
            
        },
        Fight: {
            eventCode: "UFC300",
            fighterOne: "Alex Pereira",
            fighterTwo: "Jamahal Hill",
            weightClass: "Light Heavyweight",
            scheduledRounds: 5,
            mainEvent: true,
            weightLimitLbs: 205,
            tags: ["Championship", "Main Event"]
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);