import * as pdfjs from "pdfjs-dist"

/**
 * Extrait le texte d'un fichier PDF
 */
export async function extractTextFromPdf(filePath: string): Promise<string> {
  try {
    // Initialiser pdfjs worker
    const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry")
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

    // Charger le document PDF
    const data = await pdfjs.getDocument(filePath).promise
    let fullText = ""

    // Extraire le texte de chaque page
    for (let i = 1; i <= data.numPages; i++) {
      const page = await data.getPage(i)
      const content = await page.getTextContent()
      const pageText = content.items.map((item: any) => item.str).join(" ")

      fullText += pageText + "\n"
    }

    return fullText
  } catch (error) {
    console.error("Erreur lors de l'extraction du texte du PDF:", error)
    return ""
  }
}

/**
 * Nettoie le texte extrait du PDF
 */
export function cleanExtractedText(text: string): string {
  if (!text) return ""

  // Supprimer les caractères spéciaux et les espaces multiples
  let cleanedText = text.replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim()

  // Supprimer les en-têtes et pieds de page communs
  cleanedText = cleanedText.replace(/Page \d+ of \d+/gi, "").replace(/Page \d+/gi, "")

  return cleanedText
}

