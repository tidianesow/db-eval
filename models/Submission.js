const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Submission = sequelize.define('Submission', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    exerciceId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Exercices',
            key: 'id',
        },
    },
    fileUrl: {
        type: DataTypes.STRING, // Lien vers le fichier PDF soumis
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('en attente', 'corrigé'),
        defaultValue: 'en attente',
    },
}, {
    tableName: 'Submissions',
    timestamps: true,
});

module.exports = Submission;