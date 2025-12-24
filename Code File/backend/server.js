const express = require("express");
const app = express();
const dotenv=require('dotenv')
const path=require('path')
const connectdatabase=require('./config/db')
const cors = require('cors');


dotenv.config({path:path.join(__dirname,'config','config.env')})


connectdatabase();
app.use(cors()); 

app.use(express.json()); 


const complaint= require('./routes/complaintroute')

app.use('/complaint',complaint)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});
