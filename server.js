require('dotenv').config();
require('express-async-errors');

const express = require('express');
const connectDB = require('./db/connect');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { isLoggedin } = require('./middleware/authentication');

const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');

const app = express();
passportConfig();
const port = process.env.PORT;

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Middleware
const authenticateUser = require('./middleware/authenticationUser');

// Router init.
const adminRouter = require('./routes/adminRoute');
const authRouter = require('./routes/authRoute');
const courseRouter = require('./routes/courseRoute');
const noticeRouter = require('./routes/noticeRoute');
const reportRouter = require('./routes/reportRoute');
const customerApiRouter = require('./routes/customerApiRoute');
const jobsApiRouter = require('./routes/jobsApiRoute');

//swagger
const { swaggerUi, specs } = require('./swagger/swagger');

const secret = process.env.SESSION_KEY || '';

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use('/assets', express.static('assets'));

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/course', isLoggedin, courseRouter);
app.use('/notice', isLoggedin, noticeRouter);

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1/customer', customerApiRouter);
app.use('/api/v1/jobs', authenticateUser, jobsApiRouter);

app.get('/', isLoggedin, reportRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Sever Listening port number is : ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
