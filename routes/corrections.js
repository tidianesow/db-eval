const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Correction = require('../models/Correction');
const Submission = require('../models/Submission');

// Middleware pour vérifier le token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Aucun token fourni' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

// Route pour ajouter une correction (par un professeur)
router.post('/corrections', authenticateToken, async (req, res) => {
    if (req.user.role !== 'professeur' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès interdit' });
    }
    try {
        const { submissionId, grade, feedback } = req.body;

        // Vérifier si submissionId est fourni
        if (!submissionId) {
            return res.status(400).json({ message: 'submissionId est requis' });
        }

        // Vérifier si la soumission existe
        const submission = await Submission.findByPk(submissionId);
        if (!submission) {
            return res.status(404).json({ message: 'Soumission non trouvée' });
        }

        // Créer la correction
        const correction = await Correction.create({
            submissionId,
            grade,
            feedback,
        });

        res.status(201).json({ message: 'Correction ajoutée', correction });
    } catch (error) {
        console.error('❌ Erreur lors de l\'ajout de la correction :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

// Route pour récupérer une correction (optionnel, pour tester avec GET si besoin)
router.get('/corrections/:submissionId', authenticateToken, async (req, res) => {
    try {
        const { submissionId } = req.params;

        const correction = await Correction.findOne({
            where: { submissionId },
        });

        if (!correction) {
            return res.status(404).json({ message: 'Correction non trouvée' });
        }

        res.status(200).json(correction);
    } catch (error) {
        console.error('❌ Erreur lors de la récupération de la correction :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

module.exports = router;