const mongodb = require('../data/db');
const ObjectId = require('mongodb').ObjectId;

const getAllEvents = async (req, res) => {
    //#swagger.tags = ['Events']
    try {
        console.log("connected db name: " + mongodb.getDb().databaseName);
        const result = await mongodb.getDb()
            .collection('events')
            .find({})
            .toArray();
        console.log("Documents found in 'events':", result.length);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
        
    } catch (err) {
        res.status(500).json({ message: "error in getting the events" });
    }
};

const getEventById = async (req, res) => {
    //#swagger.tags = ['Events']
    try {
        const eventId = new ObjectId(req.params.id);

        const event = await mongodb.getDb()
            .collection('events')
            .findOne({ _id: eventId });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: "error in getting the event" });
    }
};

const createEvent = async (req, res) => {
    //#swagger.tags = ['Events']
    

    const event = {
        eventCode: req.body.eventCode,
        title: req.body.title,
        date: req.body.date,
        venue: req.body.venue,
        city: req.body.city,
        country: req.body.country,
        broadcastNetwork: req.body.broadcastNetwork
    }
    
    const response = await mongodb.getDb().collection('events').insertOne(event);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the event.');
    }
};

const updateEvent = async (req, res) => {
    //#swagger.tags = ['Events']
    try {
        const eventId = new ObjectId(req.params.id);
        const updatedEvent = {
            eventCode: req.body.eventCode,
            title: req.body.title,
            date: req.body.date,
            venue: req.body.venue,
            city: req.body.city,
            country: req.body.country,
            broadcastNetwork: req.body.broadcastNetwork
        };
        const response = await mongodb.getDb().collection('events').replaceOne({ _id: eventId }, updatedEvent);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "error in updating the event" });
    };
};

const deleteEvent = async (req, res) => {
    //#swagger.tags = ['Events']
    try {
        const eventId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('events').deleteOne({ _id: eventId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "error in deleting the event" });
    };
};



module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};