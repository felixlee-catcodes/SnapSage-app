const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT } = conn.Sequelize;

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

module.exports = File;
