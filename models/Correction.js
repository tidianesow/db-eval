const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Correction = sequelize.define('Correction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  submissionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  grade: {
    type: DataTypes.FLOAT, // Note sur 20
    allowNull: false,
  },
  feedback: {
    type: DataTypes.TEXT, // Commentaires de correction
    allowNull: true,
  },
});

module.exports = Correction;
