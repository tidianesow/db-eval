const sequelize = require('./config/database');
const User = require('./models/User');
const Exercice = require('./models/Exercice');
const Submission = require('./models/Submission');
const Correction = require('./models/Correction');

(async () => {
    await sequelize.sync({ alter: true }); // Ajuste les tables sans supprimer les données
    console.log('Modèles synchronisés');
})();