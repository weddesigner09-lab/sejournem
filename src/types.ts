/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string; // Embed or mock video
  pdfUrl?: string;
  backingTrackUrl?: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  instructorId: string;
  instrument: 'Piano' | 'Guitare' | 'Chant' | 'Batterie' | 'Théorie' | 'Production';
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string; // e.g. "8h"
  price: number; // e.g. 49
  image: string;
  description: string;
  longDescription: string;
  syllabus: string[];
  prerequisites: string[];
  lessons: Lesson[];
  quiz?: Quiz;
  rating: number;
  reviewsCount: number;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  avatar: string;
  quote: string;
}

export interface StudentProgress {
  courseId: string;
  completedLessonIds: string[];
  quizPassed: boolean;
  score?: number;
  unlockedBadge?: string;
}

export interface ForumComment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  avatar: string;
  instrument: string;
  content: string;
  likes: number;
  comments: ForumComment[];
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Astuce' | 'Tutoriel' | 'Théorie' | 'Matériel';
  readTime: string;
  image: string;
  author: string;
  date: string;
  videoUrl?: string; // Short video tutorial
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}
