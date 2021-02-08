const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const mongoose = require('mongoose');
const { isAuth, createSession, logOut } = require('./middleware/authentication');
const admin = require("firebase-admin");
const logger = require('./libs/utils/logger');
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.FIREBASE_ACC)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();

// Init Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((err, req, res, next) => {
  logger.error('error: ', error);
  res.status(500).send('Something broke!')
})

app.use(csrf({
  cookie: {
    cookie: true,
    httpOnly: true,
    secure:false,
    sameSite: true
  }
}));

app.get("/api/get-token", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.end(JSON.stringify({ status: "success" }));
});
app.post('/api/create-session', createSession);
app.post('/api/log-out', logOut);

// Define Routes
app.use('/api/users', isAuth, require('./routes/users'));
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
// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });

const PORT = process.env.PORT || 5000;

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-qs7yd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
).then(() => {
  logger.info(`Connected to db!`);
  app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
}).catch(err => {
  logger.error('error: ', error);
});
