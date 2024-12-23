const express = require("express");
const app = express();
const port = 3005;
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes');
const menuItems = require("./routes/menuItemsRoutes");
app.use('/person', personRoutes);
app.use('/menu', menuItems);


// app.get('/', (req, res) => {
//     res.send("hello Server is run with get")
// })


// app.post('/', (req, res) => {
//     res.send("hello Server is run with post")
// })

app.listen(port, () => {
    console.log(`Server is run on ${port}`)
})