const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const Submission = require('../models/Submission');
const router = express.Router();

// 📌 Soumettre un exercice (Étudiant) - Protégé par authMiddleware
// 📌 Seuls les étudiants peuvent soumettre un devoir
router.post('/', authMiddleware, roleMiddleware(['etudiant']), async (req, res) => {
  try {
      const { exerciseId, fileUrl } = req.body;
      const studentId = req.user.id;

      const submission = await Submission.create({ studentId, exerciseId, fileUrl });
      res.status(201).json({ message: 'Soumission réussie', submission });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// 📌 Obtenir toutes les soumissions d'un exercice (Professeur/Admin) - Protégé
router.get('/exercice/:exerciceId', authMiddleware, async (req, res) => {
  try {
    const submissions = await Submission.findAll({ where: { exerciseId: req.params.exerciceId } });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Obtenir une soumission par ID - Protégé
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Soumission non trouvée' });
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
