const Sequelize = require('sequelize');
const { TEXT, STRING, UUID, UUIDV4 } = Sequelize;

// connecting to postgres db
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/snap_sage_db'
);

// MODELS
const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
});

const Course = conn.define('course', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

const Topic = conn.define('topic', {
  id: {
    type: UUID,
    primaryKey: true,
  },
  courseId: {
    type: UUID,
    allowNull: false,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
});

const File = conn.define('file', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  courseId: {
    type: UUID,
    allowNull: false,
  },
  topic: {
    type: STRING,
    allowNull: true,
  },
  description: {
    type: TEXT,
  },
  mediaUrl: {
    type: TEXT,
    allowNull: false,
  },
});

// ASSOCIATIONS
Course.belongsTo(User);
User.hasMany(Course);
File.belongsTo(Course);
Course.hasMany(File);

// SEEDING DATA
const syncAndSeed = async () => {
  await conn.sync({ force: true });
  // user(s)
  const [felix] = await Promise.all(
    ['felix'].map((name) => User.create({ username: name }))
  );

  // course(s)
  const [bootcamp] = await Promise.all([
    Course.create({ name: 'FSA bootcamp', userId: felix.id }),
  ]);

  // file(s)
  const [calc, soup, hasCoworker] = await Promise.all([
    File.create({
      userId: felix.id,
      courseId: bootcamp.id,
      mediaUrl: 'static/img/CreateCalculator.png',
    }),
    File.create({
      userId: felix.id,
      courseId: bootcamp.id,
      mediaUrl: 'static/img/Soup Solution 1st Checkpoint.png',
      description:
        "some algorithm I don't remember, hence why I need this app!",
      topic: 'Data Structures & Algorithms',
    }),
    File.create({
      userId: felix.id,
      courseId: bootcamp.id,
      mediaUrl: 'static/img/hasCoworker.png',
      description: 'working w/ objects',
      topic: 'Data Structures: Objects',
    }),
  ]);

  console.log(felix.get());
  console.log(bootcamp.get());
  console.log(soup.get());
  console.log(hasCoworker.get());
};

module.exports = {
  syncAndSeed,
};
