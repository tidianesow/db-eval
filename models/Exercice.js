const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exercice = sequelize.define('Exercice', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fileUrl: {
        type: DataTypes.STRING, // URL du fichier PDF déposé
        allowNull: true,
    },
    professorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
}, {
    tableName: 'Exercices',
    timestamps: true, // Active createdAt et updatedAt
});

module.exports = Exercice;