import { extractTextFromPdf, cleanExtractedText } from "./pdf-utils"

/**
 * Appelle l'API Ollama pour l'analyse de réponse
 */
export async function callOllamaApi(prompt: string) {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-coder",
        prompt: prompt,
        stream: false,
        options: { temperature: 0.2 },
      }),
    })

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Erreur API Ollama: ${error instanceof Error ? error.message : String(error)}`)
    return null
  }
}

/**
 * Extrait la note et le feedback de la réponse de l'IA
 */
export function parseAiResponse(responseText: string): { grade: number; feedback: string } {
  try {
    // Logique d'analyse basique (à améliorer)
    let grade = 10.0 // Valeur par défaut

    if (responseText.includes("/20")) {
      const parts = responseText.split("/20")
      if (parts.length > 0) {
        const gradePart = parts[0].slice(-2).trim()
        if (!isNaN(Number.parseFloat(gradePart))) {
          grade = Number.parseFloat(gradePart)
        }
      }
    }

    const feedback = responseText.slice(0, 2000) // Limite la longueur
    return { grade, feedback }
  } catch (error) {
    console.error("Erreur d'analyse de la réponse:", error)
    return { grade: 0.0, feedback: "Erreur d'analyse de la réponse" }
  }
}

/**
 * Fonction principale d'évaluation
 */
export async function evaluateSubmission(submissionId: string, answerFilePath: string, correctionFilePath: string) {
  try {
    // Extraction des textes avec nettoyage
    const studentAnswer = cleanExtractedText(await extractTextFromPdf(answerFilePath))
    const correctionText = cleanExtractedText(await extractTextFromPdf(correctionFilePath))

    // Construction du prompt
    const prompt = `  
    [ROLE] Correcteur automatique d'exercices SQL
    
    [CORRECTION OFFICIELLE] ${correctionText}  
    
    [RÉPONSE ÉTUDIANT] ${studentAnswer}  
    
    [TÂCHE] Donnez :
    - Une note sur 20 avec justification
    - Les erreurs techniques détectées
    - Des conseils d'amélioration
    `

    // Appel à l'IA
    const aiResponse = await callOllamaApi(prompt)

    if (aiResponse && "response" in aiResponse) {
      const { grade, feedback } = parseAiResponse(aiResponse.response)

      // Dans une application réelle, nous mettrions à jour la base de données ici
      // Exemple avec Prisma:
      // await prisma.submission.update({
      //   where: { id: submissionId },
      //   data: { grade, feedback }
      // });

      return { grade, feedback }
    } else {
      return { grade: 0.0, feedback: "Échec de l'analyse par l'IA" }
    }
  } catch (error) {
    console.error(`ERREUR CRITIQUE dans evaluateSubmission: ${error instanceof Error ? error.message : String(error)}`)

    // Dans une application réelle, nous mettrions à jour la base de données ici
    // Exemple avec Prisma:
    // await prisma.submission.update({
    //   where: { id: submissionId },
    //   data: { feedback: `Erreur système: ${String(error).slice(0, 200)}` }
    // });

    return { grade: 0.0, feedback: `Erreur système: ${String(error).slice(0, 200)}` }
  }
}

