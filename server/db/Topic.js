const conn = require('./conn');
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

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

module.exports = Topic;
