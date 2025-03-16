import Link from "next/link"
import { ArrowRight, CheckCircle, BarChart2, MessageSquare, Database, Shield, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">EvalAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium"
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className="bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-medium">
                Plateforme d'IA pour l'éducation
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Évaluation Automatisée <span className="text-brand-600 dark:text-brand-400">Intelligente</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Optimisez l'évaluation des exercices de bases de données grâce à l'intelligence artificielle avancée et
                obtenez des résultats précis en temps réel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="brand" size="lg" className="group">
                  <Link href="/register">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/demo">Voir la démo</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-blue-500 rounded-2xl blur-xl opacity-30 dark:opacity-40"></div>
              <div className="relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                <img src="/placeholder.svg?height=400&width=600" alt="Dashboard Preview" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-slate-900/50 border-y border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400">98%</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Précision d'évaluation</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400">5000+</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Exercices évalués</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400">200+</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Institutions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400">30min</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Temps économisé par exercice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-medium mb-4">
              Fonctionnalités principales
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Une solution complète pour l'évaluation automatisée
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Notre plateforme combine intelligence artificielle et expertise pédagogique pour offrir une expérience
              d'évaluation sans précédent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl p-6 transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-medium mb-4">
              Processus simplifié
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Comment ça marche ?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Un processus en trois étapes simples pour une évaluation efficace et précise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-2">
                Soumettez votre exercice
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Téléversez votre fichier PDF contenant votre solution via notre interface intuitive.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-2">Correction automatique</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Notre IA analyse votre travail en profondeur et attribue une note précise selon les critères établis.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-2">Recevez un feedback</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Obtenez des conseils personnalisés et des suggestions d'amélioration pour progresser rapidement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à transformer votre approche d'évaluation ?
          </h2>
          <p className="text-xl text-brand-100 mb-8 max-w-3xl mx-auto">
            Rejoignez des centaines d'institutions qui font confiance à notre plateforme pour simplifier et améliorer
            leur processus d'évaluation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
              <Link href="/register">Commencer gratuitement</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-brand-700">
              <Link href="/contact">Contacter l'équipe</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">EvalAI</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Plateforme intelligente d'évaluation automatisée pour les exercices de bases de données.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Produit</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testimonials"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Témoignages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    Mentions légales
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} EvalAI. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

const features = [
  {
    title: "Correction automatique",
    description: "Correction automatisée des exercices via DeepSeek et Ollama pour une notation équitable et précise.",
    icon: <CheckCircle className="h-6 w-6" />,
  },
  {
    title: "Tableaux de bord analytiques",
    description: "Visualisez les performances avec des graphiques détaillés pour les étudiants et les professeurs.",
    icon: <BarChart2 className="h-6 w-6" />,
  },
  {
    title: "Feedback personnalisé",
    description: "Recevez des retours détaillés sur vos erreurs et des suggestions d'amélioration.",
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    title: "Spécialisé en bases de données",
    description: "Plateforme optimisée pour l'évaluation des exercices SQL et de conception de bases de données.",
    icon: <Database className="h-6 w-6" />,
  },
  {
    title: "Détection de plagiat",
    description: "Algorithmes avancés pour détecter les similitudes entre les soumissions des étudiants.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "IA adaptative",
    description:
      "L'IA s'améliore continuellement grâce aux retours des professeurs pour des évaluations plus précises.",
    icon: <Brain className="h-6 w-6" />,
  },
]

