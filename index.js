const express = require('express');
const sequelize = require('./config/database');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Serveur Node.js avec PostgreSQL fonctionne !');
});

// Importation des modèles
const User = require('./models/User');
const Exercise = require('./models/Exercice');
const Submission = require('./models/Submission');
const Correction = require('./models/Correction');

// Synchronisation de la base de données
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true }); // Synchronise la base de données avec les nouveaux modèles
    console.log("✅ Base de données synchronisée avec les nouveaux modèles");

    // Définir les relations entre les modèles
    User.hasMany(Exercise, { foreignKey: 'professorId' });
    Exercise.belongsTo(User, { foreignKey: 'professorId' });

    User.hasMany(Submission, { foreignKey: 'studentId' });
    Submission.belongsTo(User, { foreignKey: 'studentId' });

    Exercise.hasMany(Submission, { foreignKey: 'exerciseId' });
    Submission.belongsTo(Exercise, { foreignKey: 'exerciseId' });

    Submission.hasOne(Correction, { foreignKey: 'submissionId' });
    Correction.belongsTo(Submission, { foreignKey: 'submissionId' });
    const authRoutes = require('./routes/auth');
    app.use('/api/auth', authRoutes);


    // Démarrer le serveur
    const PORT = process.env.PORT || 5000;

    const exerciseRoutes = require('./routes/exercices');
    const submissionRoutes = require('./routes/submission');
    const correctionRoutes = require('./routes/corrections');

    app.use('/api/exercices', exerciseRoutes);
    app.use('/api/submissions', submissionRoutes);
    app.use('/api/corrections', correctionRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Erreur lors de la synchronisation de la base de données:', err);
  }
};

startServer();
