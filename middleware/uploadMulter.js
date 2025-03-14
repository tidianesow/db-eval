const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 📌 Vérifier si le dossier "uploads" existe, sinon le créer
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 📌 Configuration du stockage local avec Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où enregistrer les fichiers
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// 📌 Initialisation de Multer avec la configuration
const upload = multer({ storage: storage });

module.exports = upload;
