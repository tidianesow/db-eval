export function jaccardSimilarity(text1: string, text2: string): number {
  // Convertir les textes en ensembles de mots
  const set1 = new Set(tokenize(text1))
  const set2 = new Set(tokenize(text2))

  // Calculer l'intersection
  const intersection = new Set([...set1].filter((x) => set2.has(x)))

  // Calculer l'union
  const union = new Set([...set1, ...set2])

  // Calculer la similarité de Jaccard
  return intersection.size / union.size
}

/**
 * Calcule la similarité cosinus entre deux textes
 * La similarité cosinus mesure l'angle entre deux vecteurs
 */
export function cosineSimilarity(text1: string, text2: string): number {
  const tokens1 = tokenize(text1)
  const tokens2 = tokenize(text2)

  // Créer des vecteurs de fréquence pour chaque texte
  const freqMap1 = createFrequencyMap(tokens1)
  const freqMap2 = createFrequencyMap(tokens2)

  // Calculer le produit scalaire
  let dotProduct = 0
  for (const [token, freq1] of Object.entries(freqMap1)) {
    const freq2 = freqMap2[token] || 0
    dotProduct += freq1 * freq2
  }

  // Calculer les normes des vecteurs
  const norm1 = Math.sqrt(Object.values(freqMap1).reduce((sum, freq) => sum + freq * freq, 0))
  const norm2 = Math.sqrt(Object.values(freqMap2).reduce((sum, freq) => sum + freq * freq, 0))

  // Éviter la division par zéro
  if (norm1 === 0 || norm2 === 0) return 0

  // Calculer la similarité cosinus
  return dotProduct / (norm1 * norm2)
}

/**
 * Calcule la similarité de Levenshtein entre deux textes
 * La distance de Levenshtein est le nombre minimum d'opérations (insertions, suppressions, substitutions)
 * nécessaires pour transformer une chaîne en une autre
 */
export function levenshteinSimilarity(text1: string, text2: string): number {
  // Pour les textes longs, on utilise une approche par blocs
  if (text1.length > 1000 || text2.length > 1000) {
    return blockLevenshteinSimilarity(text1, text2)
  }

  const len1 = text1.length
  const len2 = text2.length

  // Créer une matrice pour stocker les distances
  const matrix: number[][] = Array(len1 + 1)
    .fill(null)
    .map(() => Array(len2 + 1).fill(0))

  // Initialiser la première colonne et la première ligne
  for (let i = 0; i <= len1; i++) {
    matrix[i][0] = i
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j
  }

  // Remplir la matrice
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = text1[i - 1] === text2[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // suppression
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost, // substitution
      )
    }
  }

  // Calculer la similarité normalisée (1 - distance/max(len1, len2))
  const maxLen = Math.max(len1, len2)
  return maxLen === 0 ? 1 : 1 - matrix[len1][len2] / maxLen
}

/**
 * Calcule la similarité de Levenshtein par blocs pour les textes longs
 */
function blockLevenshteinSimilarity(text1: string, text2: string): number {
  // Diviser les textes en blocs
  const blockSize = 100
  const blocks1 = chunkText(text1, blockSize)
  const blocks2 = chunkText(text2, blockSize)

  // Calculer la similarité pour chaque paire de blocs
  let totalSimilarity = 0
  let comparisons = 0

  for (const block1 of blocks1) {
    for (const block2 of blocks2) {
      totalSimilarity += levenshteinSimilarity(block1, block2)
      comparisons++
    }
  }

  // Retourner la similarité moyenne
  return comparisons === 0 ? 0 : totalSimilarity / comparisons
}

/**
 * Divise un texte en blocs de taille spécifiée
 */
function chunkText(text: string, size: number): string[] {
  const chunks: string[] = []
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size))
  }
  return chunks
}

/**
 * Tokenize un texte en mots
 */
function tokenize(text: string): string[] {
  // Convertir en minuscules et supprimer la ponctuation
  const cleanedText = text.toLowerCase().replace(/[^\w\s]/g, "")

  // Diviser en mots et filtrer les mots vides
  return cleanedText.split(/\s+/).filter((word) => word.length > 0)
}

/**
 * Crée une carte de fréquence des tokens
 */
function createFrequencyMap(tokens: string[]): Record<string, number> {
  const freqMap: Record<string, number> = {}
  for (const token of tokens) {
    freqMap[token] = (freqMap[token] || 0) + 1
  }
  return freqMap
}

/**
 * Compare deux requêtes SQL et détermine leur similarité
 */
export function compareSqlQueries(query1: string, query2: string): number {
  // Normalisation des requêtes SQL
  const normalize = (query: string) => {
    return query
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/\s*,\s*/g, ",")
      .replace(/\s*=\s*/g, "=")
      .replace(/\s*>\s*/g, ">")
      .replace(/\s*<\s*/g, "<")
      .replace(/\s*\(\s*/g, "(")
      .replace(/\s*\)\s*/g, ")")
      .trim()
  }

  const normalizedQuery1 = normalize(query1)
  const normalizedQuery2 = normalize(query2)

  // Calculer la similarité de Jaccard sur les requêtes normalisées
  return jaccardSimilarity(normalizedQuery1, normalizedQuery2)
}

