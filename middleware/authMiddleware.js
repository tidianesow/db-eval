const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Récupérer le token depuis l'en-tête Authorization
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    }

    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded; // Ajouter les infos du user au `req`
        next(); // Passer au middleware suivant
    } catch (err) {
        res.status(403).json({ message: 'Token invalide' });
    }
};
