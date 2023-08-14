// importing dependencies
const express = require('express');
const cron = require('node-cron');
require('./db/mongoose');

// importing util files
const { updateGoldPrice } = require('../src/utils')

// importing routers
const goldpriceRouter = require('./router/goldprice');

// -------------------- Main ---------------------------

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(goldpriceRouter);

cron.schedule('0 0 * * *',() => {
    updateGoldPrice();
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});