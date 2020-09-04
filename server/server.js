const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Cloudant = require('@cloudant/cloudant');
const authentication = require('./middleware/authentication');
require('dotenv').config();

const app = express();

// Connect Database
const cloudant = Cloudant(process.env.CLOUDANT);
// Init Middleware
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(bodyParser.json());
authentication.init(app);

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hugo', require('./routes/hugo'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/profile', require('./routes/api/profile'));
// app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//     // Set static folder
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

// app.get('*', (req, res) => {
//             res.send('API running');
// });
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));