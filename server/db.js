const Sequelize = require('sequelize');
const { TEXT, STRING, UUID, UUIDV4 } = Sequelize;

// connecting to postgres db
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/snap_sage_db',
  {
    // Set the logging option to false to turn off logging
    logging: false,
  }
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
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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
    defaultValue: UUIDV4,
  },
  courseId: {
    type: UUID,
    allowNull: false,
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
  topicId: {
    type: UUID,
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
Topic.belongsTo(User);
User.hasMany(Topic);
Topic.belongsTo(Course);
Course.hasMany(Topic);
File.belongsTo(Topic);
Topic.hasMany(File);
File.belongsTo(User);
User.hasMany(File);
File.belongsTo(Course);
Course.hasMany(File);

// SEEDING DATA
const syncAndSeed = async () => {
  await conn.sync({ force: true });
  // user(s)
  const [felix] = await Promise.all(
    ['felix'].map((name) =>
      User.create({
        username: name,
        password: '789',
        email: 'felixlee.music@gmail.com',
      })
    )
  );

  // course(s)
  const [bootcamp, pixelArt, gameDesign] = await Promise.all([
    Course.create({ name: 'FSA bootcamp', userId: felix.id }),
    Course.create({ name: 'Pixel Art', userId: felix.id }),
    Course.create({ name: 'JS Game Design', userId: felix.id }),
  ]);
  // topic(s)
  const [dsa, express] = await Promise.all([
    Topic.create({
      userId: felix.id,
      courseId: bootcamp.id,
      name: 'Data Structures & Algorithms',
    }),
    Topic.create({
      userId: felix.id,
      courseId: bootcamp.id,
      name: 'Express Routes',
    }),
  ]);

  // file(s)
  const [calc, soup, hasCoworker, pixelGems, pixelTiles, pixelH20Textures] =
    await Promise.all([
      File.create({
        userId: felix.id,
        courseId: bootcamp.id,
        mediaUrl: '/static/img/CreateCalculator.png',
      }),
      File.create({
        userId: felix.id,
        courseId: bootcamp.id,
        topicId: dsa.id,
        mediaUrl: '/static/img/soupSolution.png',
        description:
          "some algorithm I don't remember, hence why I need this app!",
      }),
      File.create({
        userId: felix.id,
        courseId: bootcamp.id,
        mediaUrl: '/static/img/hasCoworker.png',
        description: 'working w/ objects',
      }),
      File.create({
        userId: felix.id,
        courseId: pixelArt.id,
        mediaUrl: '/static/img/drakthug-pixel-gems.png',
        description: 'pixel art gems',
      }),
      File.create({
        userId: felix.id,
        courseId: pixelArt.id,
        mediaUrl: '/static/img/make-a-pixel-art-tile-pack-for-you.jpg',
        description: 'pixel art tile',
      }),
      File.create({
        userId: felix.id,
        courseId: pixelArt.id,
        mediaUrl: '/static/img/pixel_water_textures.png',
        description: 'pixel art water textures',
      }),
    ]);

  // console.log('user: ', felix.get());
  // console.log('course: ', bootcamp.get());
  //console.log('file1: ', soup.get());
  // console.log('file2: ', hasCoworker.get());
};

module.exports = {
  syncAndSeed,
  conn,
  models: {
    User,
    Course,
    Topic,
    File,
  },
};
