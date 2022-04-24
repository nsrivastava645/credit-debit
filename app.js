import express, { json } from 'express'; //import express and express.json from express
import dotenv from "dotenv/config.js"; //for initialising environment variables
import dbConnection from "./src/db/dbConfig.js"; //for testing db connection
import { Transactions } from './src/routes/index.js'; //Separate routing
//creating a basic app
const app = express();
app.use(json());
const PORT = process.env.PORT || 3000;

//health check
app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});

// routes 
app.use('/transact', Transactions)

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));