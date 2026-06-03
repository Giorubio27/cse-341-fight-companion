const mongodb = require('../data/db');
const ObjectId = require('mongodb').ObjectId;

const getAllFights = async (req, res) => {
    //#swagger.tags = ['Fights']
    try {
        const results = await mongodb.getDb()
            .collection('fights')
            .find({})
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: "error in getting the fights" });
    }
};

const getFightById = async (req, res) => {
    //#swagger.tags = ['Fights']
    try {
        const fightId = new ObjectId(req.params.id);

        const fight = await mongodb.getDb()
            .collection('fights')
            .findOne({ _id: fightId });
        
        if (!fight) {
            return res.status(404).json({ message: "Fight not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(fight);
    } catch (err) {
        res.status(500).json({ message: "error in getting the fight" });
    }
};

const createFight = async (req, res) => {
    //#swagger.tags = ['Fights']
    try {
        const fight = {
            eventCode: req.body.eventCode,
            fighterOne: req.body.fighterOne,
            fighterTwo: req.body.fighterTwo,
            weightClass: req.body.weightClass,
            scheduledRounds: req.body.scheduledRounds,
            mainEvent: req.body.mainEvent,
            weightLimitLbs: req.body.weightLimitLbs,
            tags: req.body.tags
        };
        const response = await mongodb.getDb().collection('fights').insertOne(fight);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: "error in creating the fight" });
        }
    } catch (err) {
        res.status(500).json({ message: "error in creating the fight" });
    }
};

const updateFight = async (req, res) => {
    //#swagger.tags = ['Fights']
    try {
        const fightId = new ObjectId(req.params.id);
        const updatedFight = {
    
            fighterOne: req.body.fighterOne,
            fighterTwo: req.body.fighterTwo,
            weightClass: req.body.weightClass,
            scheduledRounds: req.body.scheduledRounds,
            mainEvent: req.body.mainEvent,
            weightLimitLbs: req.body.weightLimitLbs,
            tags: req.body.tags
            
        }
        const response = await mongodb.getDb().collection('fights').updateOne({ _id: fightId }, { $set: updatedFight });
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: "error in updating the fight" });
        }
    } catch (err) {
        res.status(500).json({ message: "error in updating the fight" });
    }

};

const deleteFight = async (req, res) => {
    //#swagger.tags = ['Fights']
    try {
        
        const fightId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('fights').deleteOne({ _id: fightId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: "error in deleting the fight" });
        }
    } catch (err) {
        res.status(500).json({ message: "error in deleting the fight" });
    }
};


module.exports = {
    getAllFights,
    getFightById,
    createFight,
    deleteFight,
    updateFight
};