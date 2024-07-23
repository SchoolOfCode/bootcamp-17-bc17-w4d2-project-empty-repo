import express from 'express';
import helmet from 'helmet';

import activities from './activities.json' assert {type: "json"};

const port = 3000;
const app = express();

app.use(helmet());

app.use(express.json());

app.get( '/', (req, res) => {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log(`terminal is now running on ${port}`)
});

app.get( '/activities', (req, res) => {
    res.json(activities)
})

app.post('/activities', (req, res) => {
    let activityType = req.body.activity_type;
    let activityDuration = req.body.activity_duration;
    let uniqueIdentifier = randomIdGenerator()
    let timestamp = Date.now()
    activities.push({
        uniqueIdentifier,
        timestamp,
        activityType,
        activityDuration
    })
    res.json(activities[activities.length - 1])
})


function randomIdGenerator() {
    let randomId = Math.floor((Math.random() * 1000000))
    for (let i=0; i<activities.length; i++) {
        if (randomId === activities[i].id) {
            randomIdGenerator()
        } 
    }
    return randomId
}