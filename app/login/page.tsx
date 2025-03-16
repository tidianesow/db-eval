"use client"
import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">EvalAI</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Connexion à votre compte
          </h1>

          <AuthForm type="login" />
        </div>
      </div>
    </div>
  )
}

