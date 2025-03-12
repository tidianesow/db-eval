const express = require('express');
const Exercice = require('../models/Exercice');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// 📌 Ajouter un nouvel exercice (Professeur)
router.post('/', async (req, res) => {
  try {
    const { title, description, fileUrl, professorId } = req.body;
    const exercise = await Exercice.create({ title, description, fileUrl, professorId });
    res.status(201).json({ message: 'Exercice créé avec succès', exercise });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 Obtenir tous les exercices
router.get('/', async (req, res) => {
  try {
    const exercices = await Exercice.findAll();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Obtenir un exercice par ID
router.get('/:id', async (req, res) => {
  try {
    const exercices = await Exercice.findByPk(req.params.id);
    if (!exercise) return res.status(404).json({ message: 'Exercice non trouvé' });
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
