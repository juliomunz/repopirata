const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

require('./server/config/mongoose.config.js');

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/pirates.routes')(app);
app.use('/api/user', require('./server/routes/user.routes'));

app.listen(8000, () => {
    console.log("Listening at Port 8000")
});

// const express = require('express');
// const app = express();
// app.listen(8000, () => {
//     console.log("Listening at Port 8000")
// });