const {
  syncAndSeed,
  conn,
  models: { User, Course, Topic, File },
} = require('./db');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../static/index.html'))
);

// get a user and their courses
app.get('/api/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      include: [{ model: Course }],
    });
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

// create new user
app.post('/api/register', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    res.json(user);
  } catch (ex) {
    next(ex);
  }
});

// create a new course
app.post('/api/:username', async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    const userId = user.id;
    const course = await Course.create({ userId, name });
    res.status(200).send(course);
  } catch (ex) {
    next(ex);
  }
});

//get all of a user's files
app.get('/api/:username/files', async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
    });
    const userId = user.id;

    const files = await File.findAll({
      where: { userId },
      include: [{ model: Course, attributes: ['name'] }],
    });
    res.send(files);
  } catch (ex) {
    next(ex);
  }
});

// add a new file
app.post('/api/:username/file', async (req, res, next) => {
  try {
    const { username } = req.params;
    const { courseId, topicId, mediaUrl, description } = req.body;

    const user = await User.findOne({
      where: { username },
    });
    console.log(req.body);
    const userId = user.id;

    const file = await File.create({
      userId,
      courseId,
      mediaUrl,
      description,
    });
    console.log('file:', file);
    res.json(file);
  } catch (ex) {
    next(ex);
  }
});

// get all course topics
app.get('/api/:username/:courseName', async (req, res, next) => {
  try {
    const { username, courseName } = req.params;
    const user = await User.findOne({
      where: { username },
    });
    const course = await Course.findOne({
      where: { name: courseName },
    });
    console.log(course);
    const courseId = course.id;
    const topics = await Topic.findAll({
      where: { courseId },
    });
    res.json(topics);
  } catch (ex) {
    next(ex);
  }
});

// create a new topic
app.post('/api/:username/:course', async (req, res, next) => {
  try {
    const { topicName } = req.body;

    const user = await User.findOne({
      where: { username: req.params.username },
    });
    const course = await Course.findOne({
      where: { name: req.params.course },
    });

    const userId = user.id;
    const courseId = course.id;

    const topic = await Topic.create({
      userId,
      courseId,
      name: topicName,
    });
    res.status(200).send(topic);
  } catch (ex) {
    next(ex);
  }
});

// i'll eventually want to protect this route, restict it to admin only
app.get('/api', async (req, res, next) => {
  try {
    const [users, courses, topics, files] = await Promise.all([
      User.findAll(),
      Course.findAll({
        include: [File],
      }),
      Topic.findAll(),
      File.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      }),
    ]);
    res.send(users);
  } catch (ex) {
    next(ex);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (er) {
    console.log(er);
  }
};
init();
