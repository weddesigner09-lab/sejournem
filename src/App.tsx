/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalogue from './components/Catalogue';
import InstructorProfile from './components/InstructorProfile';
import StudentDashboard from './components/StudentDashboard';
import Community from './components/Community';
import Blog from './components/Blog';
import Pricing from './components/Pricing';
import AboutContactFAQ from './components/AboutContactFAQ';
import { Sparkles, Award, BookOpen, CheckCircle2, Music, X } from 'lucide-react';
import { COURSES, INSTRUCTORS, BADGES } from './data/musicData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('accueil');
  const [selectedInstrumentFilter, setSelectedInstrumentFilter] = useState<string>('Tous');
  const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    // Clear toast automatically after 3.5 seconds
    setTimeout(() => {
      setToast((current) => current?.message === message ? null : current);
    }, 3500);
  };

  // Core User Learning Progression State
  const [userProgress, setUserProgress] = useState({
    enrolledCourses: ['course-piano-1'], // Pre-enrolled in introductory piano so they have content immediately!
    completedLessons: ['cp1-l1'],        // Pre-completed first lesson to show progress bar active!
    badges: ['badge-1'],                // Pre-unlocked first badge for welcome encouragement
    isPremium: false                    // Can be upgraded in Tarifs / Pricing tab
  });

  // Action: Enroll in a course
  const handleEnrollInCourse = (courseId: string) => {
    if (!userProgress.enrolledCourses.includes(courseId)) {
      setUserProgress((prev) => ({
        ...prev,
        enrolledCourses: [...prev.enrolledCourses, courseId]
      }));
      // Auto redirect to active student workspace
      setActiveTab('dashboard');
      showToast(`Félicitations ! Vous êtes inscrit au cours. Retrouvez vos leçons dans l'Espace Élève.`, 'success');
    }
  };

  // Action: Complete a single lesson
  const handleCompleteLesson = (lessonId: string) => {
    if (!userProgress.completedLessons.includes(lessonId)) {
      setUserProgress((prev) => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      }));
    }
  };

  // Action: Passing a course final quiz
  const handlePassQuiz = (courseId: string, unlockedBadgeId: string) => {
    setUserProgress((prev) => {
      const updatedBadges = prev.badges.includes(unlockedBadgeId) 
        ? prev.badges 
        : [...prev.badges, unlockedBadgeId];
      
      // Also add final master badge "badge-3" (Doigts d'Or) if they finished piano
      const hasFingerstyleBadge = prev.badges.includes('badge-3');
      const finalBadges = hasFingerstyleBadge ? updatedBadges : [...updatedBadges, 'badge-3'];

      return {
        ...prev,
        badges: finalBadges
      };
    });
  };

  // Action: Unlock an individual badge (e.g. submitted recording or download sheet)
  const handleUnlockBadge = (badgeId: string) => {
    if (!userProgress.badges.includes(badgeId)) {
      setUserProgress((prev) => ({
        ...prev,
        badges: [...prev.badges, badgeId]
      }));
    }
  };

  // Action: Upgrade user to Premium subscription tier
  const handleUpgradeToPremium = () => {
    setUserProgress((prev) => ({
      ...prev,
      isPremium: true,
      badges: prev.badges.includes('badge-2') ? prev.badges : [...prev.badges, 'badge-2'] // Give theory/upgrade award badge
    }));
  };

  const handleSelectInstrument = (instrument: string) => {
    setSelectedInstrumentFilter(instrument);
    setActiveTab('catalogue');
    setSelectedInstructorId(null);
  };

  const handleExploreInstructors = (instId: string) => {
    setSelectedInstructorId(instId);
    setActiveTab('instructor');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 selection:bg-indigo-500 selection:text-white antialiased">
      
      {/* Universal Sticky Navigation Header */}
      <Navbar
        activeTab={activeTab === 'instructor' ? 'accueil' : activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedInstructorId(null); // Reset detail views when moving tabs
        }}
        userProgress={userProgress}
        onOpenProfile={() => setShowProfileModal(true)}
      />

      {/* Main Dynamic Workspace Router */}
      <main className="flex-grow">
        {activeTab === 'accueil' && (
          <Hero
            onExploreCourses={() => {
              setSelectedInstrumentFilter('Tous');
              setActiveTab('catalogue');
            }}
            onExploreInstructors={handleExploreInstructors}
            onSelectInstrument={handleSelectInstrument}
          />
        )}

        {activeTab === 'catalogue' && (
          <Catalogue
            onEnrollInCourse={handleEnrollInCourse}
            enrolledCourseIds={userProgress.enrolledCourses}
            selectedInstrumentFilter={selectedInstrumentFilter}
            setSelectedInstrumentFilter={setSelectedInstrumentFilter}
            isPremiumUser={userProgress.isPremium}
            onOpenPricing={() => setActiveTab('tarifs')}
            onSelectInstructor={handleExploreInstructors}
          />
        )}

        {activeTab === 'instructor' && selectedInstructorId && (
          <InstructorProfile
            instructorId={selectedInstructorId}
            onBackToAccueil={() => {
              setActiveTab('accueil');
              setSelectedInstructorId(null);
            }}
            onExploreCourse={(courseId) => {
              // Find matching course and focus on catalogue with that filter
              const course = COURSES.find((c) => c.id === courseId);
              if (course) {
                setSelectedInstrumentFilter(course.instrument);
                setActiveTab('catalogue');
              }
            }}
          />
        )}

        {activeTab === 'dashboard' && (
          <StudentDashboard
            enrolledCourseIds={userProgress.enrolledCourses}
            userProgress={userProgress}
            onCompleteLesson={handleCompleteLesson}
            onPassQuiz={handlePassQuiz}
            onUnlockBadge={handleUnlockBadge}
            onOpenCatalog={() => {
              setSelectedInstrumentFilter('Tous');
              setActiveTab('catalogue');
            }}
            showToast={showToast}
          />
        )}

        {activeTab === 'communaute' && (
          <Community showToast={showToast} />
        )}

        {activeTab === 'blog' && (
          <Blog showToast={showToast} />
        )}

        {activeTab === 'tarifs' && (
          <Pricing
            onUpgradeToPremium={handleUpgradeToPremium}
            isPremium={userProgress.isPremium}
            onOpenCatalog={() => {
              setSelectedInstrumentFilter('Tous');
              setActiveTab('catalogue');
            }}
            showToast={showToast}
          />
        )}

        {activeTab === 'faq' && (
          <AboutContactFAQ />
        )}
      </main>

      {/* Premium Footer Section */}
      <footer className="border-t border-gray-100 bg-white py-12 text-center text-xs text-gray-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-b border-gray-50 pb-6">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
                <Music className="h-4 w-4" />
              </div>
              <span className="font-display font-bold text-sm tracking-tight text-gray-900">
                Harmonia Academy
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-gray-600">
              <button onClick={() => { setSelectedInstrumentFilter('Tous'); setActiveTab('catalogue'); }} className="hover:text-indigo-600">Formations</button>
              <button onClick={() => setActiveTab('tarifs')} className="hover:text-indigo-600">Tarifs & Offres</button>
              <button onClick={() => setActiveTab('faq')} className="hover:text-indigo-600">FAQ & Aide</button>
              <button onClick={() => setActiveTab('blog')} className="hover:text-indigo-600">Ressources Gratuites</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-gray-400">
            <p>© 2026 Harmonia Academy. Tous droits réservés. L'apprentissage de la musique par excellence.</p>
            <div className="flex space-x-4">
              <span className="hover:underline cursor-pointer">Conditions d'Utilisation</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Politique de Confidentialité</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ----------------- DIALOG POPUP: STUDENT DIGITAL CARD ----------------- */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 text-left border border-gray-100 relative">
            
            {/* Close */}
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Profile content */}
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg uppercase shadow-inner">
                EM
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-gray-900">Élève Académie</h3>
                <p className="text-xs text-gray-400">Inscrit depuis Juin 2026</p>
              </div>

              {/* Status banner */}
              {userProgress.isPremium ? (
                <div className="inline-flex items-center space-x-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                  <span>Abonné Illimité Premium</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  <span>Compte d'Essai Gratuit</span>
                </div>
              )}

              {/* Progress Summary cards */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-left">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <BookOpen className="h-4.5 w-4.5 text-indigo-500 mb-1" />
                  <p className="text-xs text-gray-400">Formations</p>
                  <p className="text-sm font-bold text-gray-900 font-mono">
                    {userProgress.enrolledCourses.length} active{userProgress.enrolledCourses.length > 1 ? 's' : ''}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <Award className="h-4.5 w-4.5 text-emerald-500 mb-1" />
                  <p className="text-xs text-gray-400">Badges</p>
                  <p className="text-sm font-bold text-gray-900 font-mono">
                    {userProgress.badges.length} / 4 débloqués
                  </p>
                </div>
              </div>

              {/* Progress and badges descriptions list */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Badges acquis :</p>
                <div className="space-y-1.5">
                  {BADGES.map((badge) => {
                    const hasBadge = userProgress.badges.includes(badge.id);
                    return (
                      <div key={badge.id} className="flex items-center justify-between text-xs">
                        <span className={`font-semibold ${hasBadge ? 'text-gray-800' : 'text-gray-300'}`}>{badge.name}</span>
                        <span className={`text-[10px] font-mono ${hasBadge ? 'text-emerald-600 font-bold' : 'text-gray-300'}`}>
                          {hasBadge ? 'Acquis ✓' : 'En cours'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setShowProfileModal(false)}
                className="w-full rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 text-xs transition mt-2"
              >
                Fermer mon profil
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div id="toast-notification" className="fixed bottom-22 sm:bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-[100] max-w-sm rounded-xl bg-gray-900/95 backdrop-blur-md p-4 text-white shadow-2xl border border-gray-800 animate-slide-up flex items-center space-x-3">
          {toast.type === 'success' ? (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sparkles className="h-4.5 w-4.5 text-indigo-400 animate-pulse" />
            </div>
          )}
          <div className="text-left flex-grow">
            <p className="text-xs font-medium leading-relaxed">{toast.message}</p>
          </div>
          <button 
            onClick={() => setToast(null)}
            className="text-gray-400 hover:text-white transition p-1 rounded-full hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
}
