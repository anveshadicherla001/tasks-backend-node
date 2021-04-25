require('dotenv').config();
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors');

//Custom routes
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");

app.use('/public', express.static(__dirname + '/public'));

//Middlewares
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());

//Routes configuration
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

//Port configuration
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.json({message: `Server Running On ${port}`})
});

//Listening to port
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})