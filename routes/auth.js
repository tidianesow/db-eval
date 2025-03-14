const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Route d'inscription (REGISTER)
router.post('/register', async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        // Nettoyage des entrées
        email = email.trim().toLowerCase();
        password = password.trim();

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "L'utilisateur existe déjà" });
        }

        // Création du nouvel utilisateur (le hook beforeCreate va hasher le mot de passe)
        const newUser = await User.create({ 
            name, 
            email, 
            password, // Le mot de passe sera hashé par le hook
            role 
        });

        res.status(201).json({ 
            message: 'Utilisateur créé avec succès', 
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            } 
        });
    } catch (error) {
        console.error("❌ Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

// Route de connexion (LOGIN)
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        // Nettoyage des entrées
        email = email.trim().toLowerCase();
        password = password.trim();

        console.log(`🔍 Email reçu : ${email}`);
        console.log(`🔍 Mot de passe reçu : ${password}`);

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ where: { email } });
        console.log(`🔍 Utilisateur trouvé : ${user ? JSON.stringify(user.toJSON()) : 'aucun'}`);

        if (!user) {
            console.log('🔍 Aucun utilisateur trouvé');
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`🔍 Mot de passe correspond : ${isMatch}`);

        if (!isMatch) {
            console.log('🔍 Mot de passe incorrect');
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Génération du token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET || 'secret', 
            { expiresIn: '7d' }
        );

        // Retourner les informations de l'utilisateur et son profil
        res.json({
            message: 'Connexion réussie',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("❌ Erreur de connexion :", err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

// Route pour tester bcrypt
router.get('/test-bcrypt', async (req, res) => {
    try {
        const password = 'passer123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('🔍 Hash généré :', hashedPassword);

        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log('🔍 Comparaison avec le même mot de passe :', isMatch);

        // Comparaison avec le hash stocké dans la base
        const storedHash = '$2b$10$gHE9swiewDn3FLK19DER../XM/qqM2mGp3muNjvTMgUyfZhLSVHB2';
        const isMatchWithStored = await bcrypt.compare(password, storedHash);
        console.log('🔍 Comparaison avec le hash stocké :', isMatchWithStored);

        res.json({ hashedPassword, isMatch, isMatchWithStored });
    } catch (error) {
        console.error('❌ Erreur lors du test bcrypt :', error);
        res.status(500).json({ message: 'Erreur lors du test bcrypt' });
    }
});

// Route pour vérifier le token/profil
router.get('/verify-token', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Aucun token fourni' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findByPk(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        console.error("❌ Erreur de vérification de token :", error);
        res.status(401).json({ message: 'Token invalide' });
    }
});

module.exports = router;