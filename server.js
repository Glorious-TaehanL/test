require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');

const app = express();
passportConfig();
const port = process.env.PORT;

const adminRouter = require('./routes/adminRoute');
const noticeRouter = require('./routes/noticeRoute');

const Notice = require('./models/Notice');

app.use(
  session({
    secret: '비밀코드',
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use('/admin', adminRouter);
app.use('/tt', noticeRouter);

app.get('/', (req, res) => res.render('index.ejs'));
app.get('/write', (req, res) => res.sendFile(__dirname + '/views/write.ejs'));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Sever Listening port number is : ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
