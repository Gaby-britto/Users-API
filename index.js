const express = require('express');
const port = 3002;
const app = express();
const router = require("./src/routes/router");
const cors = require('cors');
app.use(cors({
    methods: ['GET' , 'POST']
  }));

app.use(express.json());
app.use(express.static("public"));
app.use("/", router);

app.listen(port, () =>{
    console.log(`funcionandoo! http://localhost:${port}`);
})