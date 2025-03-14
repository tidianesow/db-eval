const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Exercice = require('../models/Exercice'); 
const Submission = require('../models/Submission');
const multer = require('multer');

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

// Configuration de multer pour le stockage des PDF
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Route pour qu'un professeur dépose un exercice
router.post('/exercices', authenticateToken, async (req, res) => {
    if (req.user.role !== 'professeur' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès interdit' });
    }
    try {
        const { title, description } = req.body;
        const exercice = await Exercice.create({
            professorId: req.user.id,
            title,
            description,
        });
        res.status(201).json({ message: 'Exercice créé', exercice });
    } catch (error) {
        console.error('❌ Erreur lors de la création de l’exercice :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

// Route pour qu'un étudiant soumette une réponse
router.post('/submissions', authenticateToken, upload.single('fileUrl'), async (req, res) => {
    if (req.user.role !== 'etudiant') {
        return res.status(403).json({ message: 'Accès interdit' });
    }
    try {
        const { exerciceId } = req.body;
        const submission = await Submission.create({
            studentId: req.user.id,
            exerciceId,
            fileUrl: req.file.path,
        });
        res.status(201).json({ message: 'Soumission enregistrée', submission });
    } catch (error) {
        console.error('❌ Erreur lors de la soumission :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

module.exports = router;