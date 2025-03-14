const express = require('express');
const sequelize = require('./config/database');
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
    res.send('🚀 Serveur Node.js avec PostgreSQL fonctionne !');
});

// Importation des modèles
const User = require('./models/User');
const Exercice = require('./models/Exercice');
const Submission = require('./models/Submission');
const Correction = require('./models/Correction');

// Importation des routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const exerciceRoutes = require('./routes/exercices'); // Corrige pour correspondre au fichier exercises.js
const submissionRoutes = require('./routes/submission');
const correctionRoutes = require('./routes/corrections');

// Définir les relations entre les modèles
User.hasMany(Exercice, { foreignKey: 'professorId' });
Exercice.belongsTo(User, { foreignKey: 'professorId' });

User.hasMany(Submission, { foreignKey: 'studentId' });
Submission.belongsTo(User, { foreignKey: 'studentId' });

Exercice.hasMany(Submission, { foreignKey: 'exerciceId' });
Submission.belongsTo(Exercice, { foreignKey: 'exerciceId' });

Submission.hasOne(Correction, { foreignKey: 'submissionId' });
Correction.belongsTo(Submission, { foreignKey: 'submissionId' });

// Montage des routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', exerciceRoutes); // Préfixe /api, donc POST /exercices devient POST /api/exercices
app.use('/api', submissionRoutes);
app.use('/api', correctionRoutes);

// Synchronisation de la base de données et démarrage du serveur
const startServer = async () => {
    try {
        await sequelize.sync({ alter: true }); // Synchronise la base de données avec les nouveaux modèles
        console.log("✅ Base de données synchronisée avec les nouveaux modèles");

        // Démarrer le serveur
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Erreur lors de la synchronisation de la base de données:', err);
    }
};

startServer();