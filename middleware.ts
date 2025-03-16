import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Vérifier si l'utilisateur est authentifié
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  
  // Routes publiques qui ne nécessitent pas d'authentification
  const publicRoutes = ["/", "/login", "/register", "/forgot-password", "/reset-password"]
  
  // Routes qui nécessitent un rôle spécifique
  const teacherRoutes = ["/dashboard/teacher", "/dashboard/exercises/create", "/dashboard/students"]
  const studentRoutes = ["/dashboard/student"]
  
  // Vérifier si la route est publique
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))
  
  // Si la route est publique, autoriser l'accès
  if (isPublicRoute) {
    return NextResponse.next()
  }
  
  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }
  
  // Vérifier si la route nécessite un rôle spécifique
  const isTeacherRoute = teacherRoutes.some((route) => pathname.startsWith(route))
  const isStudentRoute = studentRoutes.some((route) => pathname.startsWith(route))
  
  // Si la route nécessite un rôle d'enseignant et que l'utilisateur n'est pas un enseignant
  if (isTeacherRoute && token.role !== "teacher" && token.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }
  
  // Si la route nécessite un rôle d'étudiant et que l'utilisateur n'est pas un étudiant
  if (isStudentRoute && token.role !== "student") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }
  
  // Autoriser l'accès à toutes les autres routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}