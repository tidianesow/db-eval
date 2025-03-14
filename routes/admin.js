const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const User = require('../models/User');

const router = express.Router();

// 📌 Obtenir tous les utilisateurs (Admin uniquement)
router.get('/users', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Modifier un utilisateur (Admin uniquement)
router.put('/users/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        await user.update(req.body);
        res.json({ message: 'Utilisateur mis à jour avec succès', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Supprimer un utilisateur (Admin uniquement)
router.delete('/users/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        await user.destroy();
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
