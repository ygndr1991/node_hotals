const express = require('express');
const router = express.Router();
const person = require('./../models/person');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data);
        const result = await newPerson.save();
        console.log("Data Save Successfully..........");
        res.status(200).json(result);
    } catch (err) {
        console.log("Does not save employee data", err)
        res.status(500).json({ error: "Server error" })
    }
})

// Fetch Data

router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log("All Data fetched Successfully..........");
        res.status(200).json(data);
    }
    catch (err) {
        console.log("Data not Find", err)
        res.status(500).json({ error: "Server error" })
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const result = await person.find({ work: workType });
            console.log("Worker Data fetched Successfully..........");
            res.status(200).json(result);
        }
        else {
            res.status(200).json("Invalid Worker Type............");
        }

    } catch (err) {
        console.log("Data not Find", err)
        res.status(500).json({ error: "Data not Find" })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const personUpdateData = req.body;
        const result = await person.findByIdAndUpdate(personId, personUpdateData, {
            new: true,
            runValidators: true
        })
        if (!result) {
            res.status(500).json({ error: "Person not Found" });
        }
        console.log("Data update Sucessfully..............");
        res.status(500).json(result);

    }
    catch (err) {
        console.log("Data not Find", err)
        res.status(500).json({ error: "Data not Update" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        console.log("OK1")

        const result = await person.findByIdAndDelete(personId);
        console.log("OK2")
        if (result) {
            res.status(500).json({ error: "Person not Found" });
        }
        console.log("Data deleted Sucessfully..............");
        res.status(500).json(result);
    } catch (err) {
        console.log("Sever error", err)
        res.status(500).json({ error: "Data not Deleted" })
    }
})

module.exports = router;