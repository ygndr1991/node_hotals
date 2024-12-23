const express = require('express');
const router = express.Router();
const menuItem = require('./../models/menuItems');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new menuItem(data);
        const result = await newMenuItem.save();
        console.log("MenuData Save Successfully..........");
        res.status(200).json("MenuData Save Successfully..........");
    }
    catch (err) {
        console.log("Does not save employee data", err)
        res.status(500).json({ error: "Server error" })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await menuItem.find();
        console.log("All Data fetched Successfully..........");
        res.status(200).json(data);

    }
    catch (err) {
        console.log("Data not found", err)
        res.status(500).json({ error: "Server error" })
    }
})


module.exports = router;