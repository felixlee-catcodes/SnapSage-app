const {
  syncAndSeed,
  conn,
  models: { User, Course, Topic, File },
} = require('./db');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

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
app.get('/', async (req, res, next) => {
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
    res.send();
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
