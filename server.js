require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

const noticeRouter = require('./routes/noticeRoute');

const Notice = require('./models/Notice');

app.use(express.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tt', noticeRouter);

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/write', (req, res) => res.sendFile(__dirname + '/write.html'));

app.post('/add', (req, res) => {
  res.json(req.body);
  Notice.create(req.body);
});
app.get('/list', async (req, res) => {
  const items = await Notice.find({});
  console.log(items);
  res.render('list.ejs', { items: items });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Sever Listening port number is : ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
