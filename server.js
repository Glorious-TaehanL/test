require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

const noticeRouter = require('./routes/noticeRoute');

const Notice = require('./models/Notice');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use('/tt', noticeRouter);

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/write', (req, res) => res.sendFile(__dirname + '/write.html'));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Sever Listening port number is : ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
