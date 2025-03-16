import type { Feedback } from "@/types"

// Cette fonction simule l'appel à l'API Ollama avec DeepSeek
export async function evaluateSubmission(
  submissionId: string,
  submissionContent: string,
  solutionContent: string,
): Promise<Feedback> {
  // Dans une implémentation réelle, nous ferions un appel à l'API Ollama
  // avec DeepSeek pour évaluer la soumission

  console.log(`Évaluation de la soumission ${submissionId}...`)

  // Simuler un délai pour l'évaluation par l'IA
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Générer un feedback fictif
  const score = Math.floor(Math.random() * 10) + 10 // Note entre 10 et 20

  return {
    id: `feedback-${Date.now()}`,
    submissionId,
    content: generateFeedback(score),
    score,
    createdAt: new Date(),
    aiGenerated: true,
  }
}

// Fonction pour détecter le plagiat entre les soumissions
export async function detectPlagiarism(submissionContent: string, otherSubmissions: string[]): Promise<number> {
  // Dans une implémentation réelle, nous utiliserions des algorithmes
  // comme Jaccard, TF-IDF ou des techniques de NLP

  console.log("Détection de plagiat en cours...")

  // Simuler un délai pour la détection
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Retourner un score de plagiat fictif (pourcentage)
  return Math.floor(Math.random() * 30)
}

// Fonction pour générer un feedback fictif basé sur le score
function generateFeedback(score: number): string {
  if (score >= 18) {
    return `# Excellent travail!

## Points forts
- Excellente compréhension des concepts de bases de données
- Requêtes SQL optimisées et bien structurées
- Bonne gestion des cas limites

## Suggestions d'amélioration
- Continuez à explorer des techniques d'optimisation avancées
- Essayez d'implémenter des index composites pour améliorer davantage les performances

Votre solution démontre une maîtrise exceptionnelle des concepts de bases de données. Continuez ainsi!`
  } else if (score >= 14) {
    return `# Bon travail!

## Points forts
- Bonne compréhension des concepts de bases de données
- Requêtes SQL fonctionnelles et correctes
- Structure claire des solutions

## Points à améliorer
- Certaines requêtes pourraient être optimisées davantage
- Attention à la gestion des valeurs NULL dans vos requêtes
- Pensez à utiliser des index appropriés pour améliorer les performances

Voici une suggestion d'amélioration pour l'une de vos requêtes:
\`\`\`sql
-- Votre requête originale
SELECT * FROM users WHERE age > 18;

-- Version optimisée
SELECT id, name, email FROM users WHERE age > 18;
\`\`\`

Cette version sélectionne uniquement les colonnes nécessaires, ce qui peut améliorer les performances.`
  } else {
    return `# Des progrès à faire

## Points forts
- Certaines requêtes de base sont correctes
- Bonne tentative d'utilisation des jointures

## Points à améliorer
- Revoir les concepts fondamentaux des requêtes SQL
- Attention à la syntaxe des requêtes complexes
- Pratiquer davantage les jointures et les sous-requêtes
- Utiliser les fonctions d'agrégation de manière appropriée

Voici un exemple de correction pour l'une de vos requêtes:
\`\`\`sql
-- Votre requête originale (incorrecte)
SELECT users.name, count(orders) FROM users, orders;

-- Version corrigée
SELECT users.name, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.name;
\`\`\`

Je vous recommande de revoir les concepts de jointures et de fonctions d'agrégation.`
  }
}

