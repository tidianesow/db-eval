export type UserRole = "student" | "teacher" | "admin"

export interface User {
  id: string
  name: string
  email: string
  image?: string
  role: UserRole
  createdAt: Date
}

export interface Exercise {
  id: string
  title: string
  description: string
  pdfUrl?: string
  createdAt: Date
  updatedAt: Date
  authorId: string
  author?: User
  dueDate?: Date
  published: boolean
  solutions?: Solution[]
  submissions?: Submission[]
}

export interface Solution {
  id: string
  exerciseId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface Submission {
  id: string
  exerciseId: string
  studentId: string
  student?: User
  pdfUrl: string
  score?: number
  feedback?: string
  status: "pending" | "graded" | "reviewed"
  createdAt: Date
  updatedAt: Date
  plagiarismScore?: number
}

export interface Feedback {
  id: string
  submissionId: string
  content: string
  score: number
  createdAt: Date
  teacherId?: string
  aiGenerated: boolean
}

export interface Stats {
  totalExercises: number
  totalSubmissions: number
  averageScore: number
  recentSubmissions: Submission[]
}

export interface StudentStats extends Stats {
  completedExercises: number
  pendingExercises: number
  scoreDistribution: { score: number; count: number }[]
  progressOverTime: { date: string; score: number }[]
}

export interface TeacherStats extends Stats {
  totalStudents: number
  exercisePerformance: { exerciseId: string; title: string; averageScore: number }[]
  studentPerformance: { studentId: string; name: string; averageScore: number }[]
}

