// Import the express in typescript file
import express from "express";
import dotenv from "dotenv";
import personRoutes from './src/routes/person.routes'

dotenv.config();
const app: express.Application = express();
app.use(express.json());

const port = process.env.PORT;
app.use('/api/v1/person',personRoutes);



// Server setup
app.listen(port, () => {
  console.log(`
         http://localhost:${port}/`);
});




