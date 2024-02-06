const mongoose = require('mongoose');

const connectionDb = mongoose.connect(process.env.MONGODB_PATH)
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));

module.exports = connectionDb