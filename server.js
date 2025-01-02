const express = require("express");
const passport = require("passport");
const app = express();
const port = 3005;
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes');
const menuItems = require("./routes/menuItemsRoutes");
const middleware = require("./middleware/auth")
app.use(passport.initialize());
passport.use(middleware);
const authMiddleware = passport.authenticate('local', { session: false });
app.get('/', (req, res, next) => {
    res.status(200).json({ message: "Welcome in My Hotal" })
    next();
})

app.use('/person', personRoutes);
app.use('/menu', menuItems);

// app.get('/', (req, res) => {
//     res.send("hello Server is run with get")
// })

app.listen(port, () => {
    console.log(`Server is run on ${port}`)
})