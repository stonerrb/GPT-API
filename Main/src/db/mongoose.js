const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://Rushabh:ed8bD3RqBPY9H4qO@gpt-api.8nqm1lg.mongodb.net/",
    {
        useNewUrlParser : true,
    }
)

const db = mongoose.connection;

db.on('error',(error) => {
    console.log("Database not connected due to :",error);
});

db.once('open',() => {
    console.log('Conncted to the Database');
});

db.on('disconnected',() => {
    console.log("Disconnected to the Database");
})

module.exports = mongoose