const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pankaj360:Asd123_asd@apipankaj.fpcfi.mongodb.net/apipankaj?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./instructor.model');