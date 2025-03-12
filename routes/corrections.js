const express = require('express');
const Correction = require('../models/Correction');
const router = express.Router();

// 📌 Ajouter une correction (Professeur ou IA)
router.post('/', async (req, res) => {
  try {
    const { submissionId, grade, feedback } = req.body;
    const correction = await Correction.create({ submissionId, grade, feedback });
    res.status(201).json({ message: 'Correction ajoutée', correction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 Obtenir la correction d'une soumission
router.get('/submission/:submissionId', async (req, res) => {
  try {
    const correction = await Correction.findOne({ where: { submissionId: req.params.submissionId } });
    if (!correction) return res.status(404).json({ message: 'Correction non trouvée' });
    res.json(correction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
