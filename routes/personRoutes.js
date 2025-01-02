const express = require('express');
const router = express.Router();
const person = require('./../models/person');
const { jwtAuthMiddleware, jenerateToken } = require('../middleware/jwt');
const middleware = require("./../middleware/auth");

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data);
        const result = await newPerson.save();
        console.log("Data Save Successfully..........");
        // const token = jenerateToken(result.username);
        // console.log("Token-", token);
        res.status(200).json(result);
    } catch (err) {
        console.log("Does not save employee data", err)
        res.status(500).json({ error: "Server error" })
    }
})
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await person.findOne({ username: username });
        if (!user) {
            res.status(500).json({ message: 'Incorrect Username' })
        }
        else {
            const isPasswordMatch = await user.comparePassword(password);
            if (isPasswordMatch) {
                const payload = {
                    id: user.id,
                    username: user.username
                }
                const token = jenerateToken(payload);
                console.log("Token-", token);
                res.json({ token: token })
            }
            else {

                res.status(500).json({ message: 'Incorrect Password' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: "server side error" });
    }


})

// Fetch Data

router.get('/', jwtAuthMiddleware, async (req, res) => {
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

// Profile Route

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        const userId = userData.id;
        console.log(userId);
        const result = await person.findById(userId);
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: "Invalid user" })
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
        const result = await person.findByIdAndDelete(personId);
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