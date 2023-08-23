const conn = require('./conn');
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

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

module.exports = Course;
