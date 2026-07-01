/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, CheckCircle, FileText, Download, Upload, AlertCircle, Award, 
  BookOpen, Clock, RefreshCw, Volume2, Mic, CheckCircle2, ChevronRight, Sparkles, Trophy, DownloadCloud, X 
} from 'lucide-react';
import { COURSES, INSTRUCTORS, BADGES } from '../data/musicData';
import { Course, Lesson, Quiz, Badge, StudentProgress } from '../types';

interface StudentDashboardProps {
  enrolledCourseIds: string[];
  userProgress: {
    enrolledCourses: string[];
    completedLessons: string[];
    badges: string[];
    isPremium: boolean;
  };
  onCompleteLesson: (lessonId: string) => void;
  onPassQuiz: (courseId: string, unlockedBadgeId: string) => void;
  onUnlockBadge: (badgeId: string) => void;
  onOpenCatalog: () => void;
  showToast?: (message: string, type?: 'success' | 'info') => void;
}

export default function StudentDashboard({
  enrolledCourseIds,
  userProgress,
  onCompleteLesson,
  onPassQuiz,
  onUnlockBadge,
  onOpenCatalog,
  showToast
}: StudentDashboardProps) {
  const toast = showToast || ((message: string) => alert(message));
  
  // Navigation tabs inside the dashboard
  const [activeSubTab, setActiveSubTab] = useState<'cours' | 'devoirs' | 'recompenses'>('cours');
  
  // Active course being studied
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  
  // Media player state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Homework (Devoirs) State
  const [recordings, setRecordings] = useState<{ id: string; title: string; date: string; size: string; status: 'En attente de correction' | 'Corrigé'; feedback?: string; grade?: string }[]>([
    { id: 'rec-1', title: 'Vocalise_Sarah_Exercice2.wav', date: '28 Juin 2026', size: '4.2 MB', status: 'Corrigé', feedback: 'Très beau soutien diaphragmatique ! Attention à relâcher la mâchoire sur le vibrato final.', grade: '16/20' }
  ]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);

  // Quiz solver state
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Certificate rendering
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [certificateCourse, setCertificateCourse] = useState<Course | null>(null);

  // Scratchpad notepad state
  const [scratchpad, setScratchpad] = useState<string>('');

  // 1. Manage simulated play/pause progress bar
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (activeLesson) {
              // auto complete lesson when video is completed
              onCompleteLesson(activeLesson.id);
            }
            return 100;
          }
          return prev + (1 * playbackSpeed);
        });
      }, 350);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying, activeLesson, playbackSpeed]);

  // 2. Beautiful HTML5 Canvas Waves Visualizer Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 120);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        width = canvas.width;
      }
    };
    window.addEventListener('resize', handleResize);

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw static background lines
      ctx.strokeStyle = 'rgba(238, 242, 255, 0.5)';
      ctx.lineWidth = 1;
      for (let i = 20; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Draw responsive musical wave
      const amplitude = isPlaying ? 35 : 2; // Flat line when paused, active wave when playing
      const frequency = isPlaying ? 0.015 : 0.005;
      const speed = isPlaying ? 0.15 * playbackSpeed : 0.02;

      ctx.beginPath();
      ctx.lineWidth = 3;
      
      // Create primary natural tone gradient line
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#5D6D5F'); // Sage Green
      gradient.addColorStop(0.5, '#8D9B8E'); // Soft Sage
      gradient.addColorStop(1, '#B68D40'); // Ochre Gold
      ctx.strokeStyle = gradient;

      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * frequency + phase) * amplitude + Math.cos(x * 0.003 + phase * 0.5) * (amplitude / 2);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Secondary background wave
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(93, 109, 95, 0.35)';
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * (frequency * 1.5) - phase) * (amplitude * 0.7) + Math.cos(x * 0.005 - phase * 0.3) * (amplitude / 3);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      phase += speed;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Handle setting a course active
  const selectCourseToStudy = (course: Course) => {
    setActiveCourse(course);
    setActiveLesson(course.lessons[0]);
    setIsPlaying(false);
    setVideoProgress(0);
    setShowQuiz(false);
    setQuizFinished(false);
  };

  const getInstructor = (instructorId: string) => {
    return INSTRUCTORS.find((inst) => inst.id === instructorId);
  };

  // Simulate audio homework recording
  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    onUnlockBadge('badge-4'); // give badge-4 "Maître du Rythme" on recording trigger!
    recordingTimer.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecordingAndSubmit = () => {
    if (recordingTimer.current) clearInterval(recordingTimer.current);
    setIsRecording(false);
    const durationMin = Math.floor(recordingSeconds / 60);
    const durationSec = recordingSeconds % 60;
    const formattedDuration = `${durationMin}:${durationSec < 10 ? '0' : ''}${durationSec}`;
    
    // Add new simulation recording
    const newRec = {
      id: `rec-${Date.now()}`,
      title: `Enregistrement_Exercice_${formattedDuration}.wav`,
      date: 'Aujourd\'hui',
      size: '1.8 MB',
      status: 'En attente de correction' as const
    };
    setRecordings([newRec, ...recordings]);
  };

  // Quiz operations
  const handleAnswerSelect = (optIdx: number) => {
    if (answered) return;
    setSelectedAnswerIdx(optIdx);
    setAnswered(true);
    const isCorrect = optIdx === activeCourse?.quiz?.questions[currentQuestionIdx].correctAnswerIndex;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (!activeCourse?.quiz) return;
    if (currentQuestionIdx < activeCourse.quiz.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedAnswerIdx(null);
      setAnswered(false);
    } else {
      // Finished
      setQuizFinished(true);
      const passed = quizScore >= (activeCourse.quiz.questions.length - 1);
      if (passed) {
        // Unlock badge and pass quiz!
        onPassQuiz(activeCourse.id, 'badge-2');
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const generateAndShowCertificate = (course: Course) => {
    setCertificateCourse(course);
    setShowCertificate(true);
  };

  const enrolledCourses = COURSES.filter((c) => enrolledCourseIds.includes(c.id));

  return (
    <div id="student-dashboard-view" className="py-8 bg-gray-50/50 min-h-screen text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Navigation Title & Sub-tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
              Mon Espace Élève
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Pilotez votre parcours, suivez vos vidéos éducatives, soumettez vos devoirs et imprimez vos diplômes d'études.
            </p>
          </div>

          <div className="flex space-x-1.5 mt-4 md:mt-0 bg-white p-1 rounded-xl border border-gray-200 shrink-0">
            {[
              { id: 'cours', label: 'Mes Formations', icon: BookOpen },
              { id: 'devoirs', label: 'Espace Devoirs', icon: Mic },
              { id: 'recompenses', label: 'Badges & Diplômes', icon: Trophy }
            ].map((subTab) => {
              const Icon = subTab.icon;
              const isActive = activeSubTab === subTab.id;
              return (
                <button
                  key={subTab.id}
                  id={`subtab-btn-${subTab.id}`}
                  onClick={() => {
                    setActiveSubTab(subTab.id as any);
                    if (subTab.id !== 'cours') {
                      setActiveCourse(null); // return to lists when leaving player
                    }
                  }}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
                    isActive ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{subTab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ----------------- SUB-TAB 1: MES FORMATIONS ----------------- */}
        {activeSubTab === 'cours' && (
          <div>
            {!activeCourse ? (
              // 1.1 Course List Enrolled
              enrolledCourses.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
                  <BookOpen className="h-12 w-12 text-indigo-400 mx-auto" />
                  <h3 className="font-display font-bold text-lg text-gray-900">Vous n'avez aucun cours en cours</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Parcourez notre catalogue et rejoignez un cours d'instrument ou de production pour débloquer les leçons et les vidéos interactives.
                  </p>
                  <button
                    id="dashboard-explore-catalog-btn"
                    onClick={onOpenCatalog}
                    className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition"
                  >
                    Découvrir le Catalogue
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {enrolledCourses.map((course) => {
                    // Calculate completed percentage
                    const totalLessons = course.lessons.length;
                    const completedInCourse = course.lessons.filter((l) => userProgress.completedLessons.includes(l.id)).length;
                    const progressPercent = Math.round((completedInCourse / totalLessons) * 100);
                    const instructor = getInstructor(course.instructorId);

                    return (
                      <div
                        key={course.id}
                        id={`dashboard-course-card-${course.id}`}
                        className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition relative flex flex-col justify-between"
                      >
                        <div>
                          {/* Top row */}
                          <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-3">
                            <span>{course.instrument}</span>
                            <span>{course.level}</span>
                          </div>

                          <h3 className="font-display text-base font-bold text-gray-900 group-hover:text-indigo-600 transition mb-2">
                            {course.title}
                          </h3>

                          {/* Instructor name */}
                          {instructor && (
                            <p className="text-xs text-gray-500 mb-4">Avec {instructor.name}</p>
                          )}

                          {/* Progress slider bar */}
                          <div className="space-y-1.5 mb-5">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-gray-500">Progression</span>
                              <span className="font-mono text-indigo-600 font-bold">{progressPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-gray-400">
                              {completedInCourse} sur {totalLessons} leçons complétées
                            </p>
                          </div>
                        </div>

                        {/* CTAs */}
                        <div className="grid grid-cols-1 gap-2 pt-3 border-t border-gray-50">
                          <button
                            id={`study-course-btn-${course.id}`}
                            onClick={() => selectCourseToStudy(course)}
                            className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition text-center flex items-center justify-center space-x-1"
                          >
                            <Play className="h-3 w-3 fill-current" />
                            <span>Entrer dans le Studio</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              // 1.2 Learning Studio (Custom Player, Canvas Waves, Resources, Quiz)
              <div id="learning-studio-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Side: Video Visualizer, Resources, Note Scratchpad */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Studio Video Canvas Card */}
                  <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl relative">
                    {/* Header bar of the player */}
                    <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center text-white">
                      <div className="text-left">
                        <span className="text-[9px] font-bold text-indigo-400 tracking-widest uppercase font-mono">
                          Studio d'Apprentissage • {activeCourse.title.split(':')[0]}
                        </span>
                        <h4 className="text-sm font-bold truncate mt-0.5">
                          {activeLesson?.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => {
                          setActiveCourse(null);
                          setIsPlaying(false);
                        }}
                        className="text-xs font-bold text-gray-400 hover:text-white transition"
                      >
                        Quitter le studio
                      </button>
                    </div>

                    {/* Canvas Stage representing audio visualizer frequencies */}
                    <div className="relative bg-slate-950 flex flex-col justify-center items-center py-6 min-h-[160px] select-none">
                      <canvas ref={canvasRef} className="w-full max-w-full block" />
                      
                      {isPlaying && (
                        <div className="absolute top-4 left-4 flex space-x-1 items-end">
                          <span className="w-1 h-3 bg-indigo-500 rounded-full animate-pulse-music" style={{ animationDelay: '0.1s' }} />
                          <span className="w-1 h-5 bg-purple-500 rounded-full animate-pulse-music" style={{ animationDelay: '0.3s' }} />
                          <span className="w-1 h-4 bg-pink-500 rounded-full animate-pulse-music" style={{ animationDelay: '0.5s' }} />
                        </div>
                      )}

                      {!isPlaying && videoProgress === 0 && (
                        <button
                          onClick={() => setIsPlaying(true)}
                          className="absolute inset-0 flex items-center justify-center bg-slate-950/70 group"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition duration-200">
                            <Play className="h-6 w-6 fill-current ml-1" />
                          </div>
                        </button>
                      )}
                    </div>

                    {/* Video Progress and controls */}
                    <div className="bg-slate-950 p-4 border-t border-slate-800 text-white">
                      {/* Progress bar line */}
                      <div className="relative w-full h-1.5 bg-slate-800 rounded-full mb-4 cursor-pointer overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-3.5">
                          {isPlaying ? (
                            <button
                              id="studio-pause-btn"
                              onClick={() => setIsPlaying(false)}
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition"
                            >
                              <Pause className="h-4.5 w-4.5 fill-current" />
                            </button>
                          ) : (
                            <button
                              id="studio-play-btn"
                              onClick={() => setIsPlaying(true)}
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 transition"
                            >
                              <Play className="h-4.5 w-4.5 fill-current ml-0.5" />
                            </button>
                          )}

                          <button
                            id="studio-replay-btn"
                            onClick={() => {
                              setVideoProgress(0);
                              setIsPlaying(true);
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition"
                            title="Recommencer"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>

                          <div className="h-4 w-px bg-slate-800" />
                          <span className="text-xs font-mono text-gray-400">
                            Durée de la vidéo : {activeLesson?.duration}
                          </span>
                        </div>

                        {/* Speed controller */}
                        <div className="flex items-center space-x-3 text-xs">
                          <span className="text-gray-400">Vitesse :</span>
                          {[0.75, 1, 1.25, 1.5].map((speed) => (
                            <button
                              key={speed}
                              onClick={() => setPlaybackSpeed(speed)}
                              className={`px-2 py-1 rounded font-mono font-bold ${
                                playbackSpeed === speed ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-gray-400 hover:text-white'
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Syllabus Lesson Description */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h5 className="font-display font-bold text-gray-900 text-base">
                      À propos de cette leçon
                    </h5>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {activeLesson?.description}
                    </p>
                  </div>

                  {/* Download Resources (PDF Sheet, backing tracks) */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                    <h5 className="font-display font-bold text-gray-900 text-base flex items-center space-x-2">
                      <Download className="h-5 w-5 text-indigo-500" />
                      <span>Ressources téléchargeables de la leçon</span>
                    </h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeLesson?.pdfUrl && (
                        <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center space-x-2 text-left">
                            <FileText className="h-5 w-5 text-red-500 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-gray-900 truncate max-w-[180px]">{activeLesson.pdfUrl}</p>
                              <p className="text-[10px] text-gray-400">Partition & Exercice PDF</p>
                            </div>
                          </div>
                          <a 
                            href="#"
                            onClick={(e) => { e.preventDefault(); onUnlockBadge('badge-1'); toast('Téléchargement simulé de la partition.', 'success'); }}
                            className="text-indigo-600 hover:text-indigo-800 p-1.5 rounded-lg hover:bg-indigo-50 transition"
                          >
                            <DownloadCloud className="h-4.5 w-4.5" />
                          </a>
                        </div>
                      )}

                      {activeLesson?.backingTrackUrl && (
                        <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center space-x-2 text-left">
                            <Volume2 className="h-5 w-5 text-emerald-500 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-gray-900 truncate max-w-[180px]">{activeLesson.backingTrackUrl}</p>
                              <p className="text-[10px] text-gray-400">Piste d'Accompagnement MP3</p>
                            </div>
                          </div>
                          <a 
                            href="#"
                            onClick={(e) => { e.preventDefault(); toast('Téléchargement simulé du playback MP3.', 'info'); }}
                            className="text-indigo-600 hover:text-indigo-800 p-1.5 rounded-lg hover:bg-indigo-50 transition"
                          >
                            <DownloadCloud className="h-4.5 w-4.5" />
                          </a>
                        </div>
                      )}

                      {!activeLesson?.pdfUrl && !activeLesson?.backingTrackUrl && (
                        <p className="text-xs text-gray-400 col-span-2 italic">Aucune ressource téléchargeable requise pour cette introduction.</p>
                      )}
                    </div>
                  </div>

                  {/* Personal Scratchpad / Notepad */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h5 className="font-display font-bold text-gray-900 text-base">
                      Mes Notes de Cours
                    </h5>
                    <textarea
                      placeholder="Notez ici les repères, diagrammes d'accords ou astuces de rythme pour vos entraînements..."
                      value={scratchpad}
                      onChange={(e) => setScratchpad(e.target.value)}
                      className="mt-3 w-full h-24 rounded-xl border border-gray-200 bg-white p-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] text-gray-400 font-mono">Sauvegardé automatiquement en local</span>
                      <button
                        onClick={() => { setScratchpad(''); toast('Notes réinitialisées.', 'info'); }}
                        className="text-[10px] text-red-500 font-semibold hover:underline"
                      >
                        Effacer
                      </button>
                    </div>
                  </div>

                </div>

                {/* Right Side: Playlist checklist & Final Quiz link */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Lessons checklist playlist */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
                    <h5 className="font-display font-bold text-gray-900 text-sm">
                      Liste des modules
                    </h5>

                    <div className="space-y-2">
                      {activeCourse.lessons.map((lesson, idx) => {
                        const isActive = activeLesson?.id === lesson.id;
                        const isCompleted = userProgress.completedLessons.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setActiveLesson(lesson);
                              setIsPlaying(false);
                              setVideoProgress(0);
                            }}
                            className={`w-full text-left rounded-xl p-3 flex items-start space-x-3 border transition ${
                              isActive 
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-semibold' 
                                : 'bg-gray-50/50 hover:bg-gray-50 border-gray-100 text-gray-700'
                            }`}
                          >
                            <span className="font-mono text-[11px] text-indigo-500 font-bold mt-0.5">
                              0{idx + 1}
                            </span>
                            
                            <div className="flex-1 min-w-0">
                              <p className="text-xs truncate leading-snug">{lesson.title}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{lesson.duration}</p>
                            </div>

                            <span className="shrink-0">
                              {isCompleted ? (
                                <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
                              ) : (
                                <span className="block h-4.5 w-4.5 rounded-full border-2 border-gray-200" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Progress feedback and Quiz button */}
                    <div className="pt-4 border-t border-gray-100 space-y-3">
                      {/* Check if all lessons are completed */}
                      {activeCourse.lessons.every((l) => userProgress.completedLessons.includes(l.id)) ? (
                        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3.5 space-y-2 text-center">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" />
                          <p className="text-xs font-bold text-emerald-950">Félicitations !</p>
                          <p className="text-[11px] text-emerald-800 leading-relaxed">
                            Vous avez visionné l'ensemble des modules pédagogiques de ce cours. Lancez le quiz de validation pour décrocher votre diplôme de fin de formation.
                          </p>
                          <button
                            id="studio-launch-quiz-btn"
                            onClick={() => { setShowQuiz(true); restartQuiz(); }}
                            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 py-2.5 text-xs font-bold text-white shadow-sm transition"
                          >
                            Passer le Quiz de Validation
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            id="studio-complete-active-btn"
                            onClick={() => {
                              if (activeLesson) {
                                onCompleteLesson(activeLesson.id);
                                onUnlockBadge('badge-1'); // unlock first chord badge on first complete!
                              }
                            }}
                            className="w-full rounded-xl border border-indigo-200 hover:bg-indigo-50 py-2.5 text-xs font-bold text-indigo-700 transition flex items-center justify-center space-x-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Marquer la leçon comme vue</span>
                          </button>
                          
                          {/* Force test bypass option */}
                          <button
                            onClick={() => setShowQuiz(true)}
                            className="w-full text-center text-[10px] text-indigo-500 font-semibold hover:underline"
                          >
                            Accéder directement au quiz de validation
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Instructor detail box */}
                  {getInstructor(activeCourse.instructorId) && (
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
                      <div className="flex items-center space-x-3 text-left">
                        <img 
                          src={getInstructor(activeCourse.instructorId)?.avatar} 
                          alt={getInstructor(activeCourse.instructorId)?.name} 
                          className="h-9 w-9 rounded-full object-cover" 
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-900">{getInstructor(activeCourse.instructorId)?.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold">Conseiller Pédagogique</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed italic">
                        "Prenez le temps d'appuyer sur pause et de rejouer les passages difficiles. L'apprentissage se fait par la répétition."
                      </p>
                    </div>
                  )}

                </div>

              </div>
            )}
          </div>
        )}

        {/* ----------------- SUB-TAB 2: ESPACE DEVOIRS ----------------- */}
        {activeSubTab === 'devoirs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Recording Panel */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
              <div>
                <h3 className="font-display font-bold text-gray-900 text-lg flex items-center space-x-2">
                  <Mic className="h-5 w-5 text-indigo-500" />
                  <span>Soumettre un Enregistrement</span>
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  Enregistrez votre chant, vos accords de piano ou de guitare directement depuis votre micro. Nos mentors écouteront vos fichiers et vous fourniront un commentaire détaillé avec une note !
                </p>
              </div>

              {/* Recorder Box */}
              <div className="border border-dashed border-gray-200 rounded-2xl p-6 bg-gray-50/50 flex flex-col items-center justify-center text-center space-y-4">
                {isRecording ? (
                  <div className="space-y-4 w-full">
                    <div className="flex justify-center items-center space-x-1.5">
                      <span className="h-3 w-3 rounded-full bg-rose-500 animate-ping" />
                      <span className="text-xs font-bold text-rose-600 font-mono">ENREGISTREMENT EN COURS...</span>
                    </div>

                    {/* Simulating recording frequency bars */}
                    <div className="flex justify-center items-end space-x-1 h-12">
                      {Array.from({ length: 12 }).map((_, i) => {
                        const randomHeight = Math.floor(Math.random() * 35) + 10;
                        return (
                          <span 
                            key={i} 
                            className="w-1.5 bg-rose-500 rounded-full transition-all duration-150 animate-pulse-music" 
                            style={{ height: `${randomHeight}px`, animationDelay: `${i * 0.1}s` }} 
                          />
                        );
                      })}
                    </div>

                    <p className="text-2xl font-mono font-bold text-slate-800">
                      00:{recordingSeconds < 10 ? '0' : ''}{recordingSeconds}
                    </p>

                    <button
                      id="stop-rec-btn"
                      onClick={stopRecordingAndSubmit}
                      className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 text-xs transition"
                    >
                      Arrêter & Soumettre
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mx-auto">
                      <Mic className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Enregistrer maintenant</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Autorisez le micro dans le navigateur pour débuter.</p>
                    </div>
                    <button
                      id="start-rec-btn"
                      onClick={startRecording}
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 text-xs transition inline-flex items-center space-x-1.5"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Démarrer la capture</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Alternative file upload */}
              <div className="border-t border-gray-100 pt-4 text-center">
                <span className="text-xs text-gray-400">Ou chargez un fichier audio externe (MP3, WAV, M4A)</span>
                <label className="mt-3 flex items-center justify-center space-x-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50 transition">
                  <Upload className="h-4 w-4 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-600">Sélectionner un fichier local</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={() => {
                      toast("Fichier importé avec succès en tant que devoir ! Statut : En attente de correction.", 'success');
                      // add file trigger
                      setRecordings([{
                        id: `rec-upload-${Date.now()}`,
                        title: 'Exercice_Importé_Local.mp3',
                        date: 'Aujourd\'hui',
                        size: '3.4 MB',
                        status: 'En attente de correction'
                      }, ...recordings]);
                    }} 
                  />
                </label>
              </div>
            </div>

            {/* Submitted Homework List */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <div>
                <h3 className="font-display font-bold text-gray-900 text-lg">
                  Suivi de mes devoirs
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  Retrouvez ici vos derniers enregistrements soumis et consultez les retours audio/écrits détaillés de vos enseignants.
                </p>
              </div>

              <div className="space-y-3">
                {recordings.map((rec) => (
                  <div key={rec.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3 text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold text-gray-900 leading-tight">{rec.title}</p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">{rec.date} • {rec.size}</p>
                      </div>

                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        rec.status === 'Corrigé' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rec.status}
                      </span>
                    </div>

                    {rec.status === 'Corrigé' && (
                      <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-xl p-3 space-y-1.5 text-left">
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] font-bold text-indigo-950 uppercase tracking-wide">Correction par le Mentor :</p>
                          {rec.grade && (
                            <span className="font-mono text-xs font-black text-indigo-700 bg-white px-2 py-0.5 rounded-md shadow-sm">
                              Note : {rec.grade}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-indigo-800 leading-relaxed italic">
                          "{rec.feedback}"
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------- SUB-TAB 3: RECOMPENSES & DIPLOMES ----------------- */}
        {activeSubTab === 'recompenses' && (
          <div className="space-y-8">
            
            {/* Badges Earned Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
              <div>
                <h3 className="font-display font-bold text-gray-900 text-lg flex items-center space-x-2">
                  <Award className="h-5.5 w-5.5 text-indigo-500" />
                  <span>Mes Badges Académiques ({userProgress.badges.length} / 4)</span>
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  Débloquez des récompenses uniques en visionnant des leçons, en validant des examens théoriques ou en soumettant des enregistrements.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {BADGES.map((badge) => {
                  const isUnlocked = userProgress.badges.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`relative rounded-2xl border p-4 text-center space-y-3 transition flex flex-col justify-between ${
                        isUnlocked 
                          ? 'bg-white border-indigo-100 shadow-sm' 
                          : 'bg-gray-50/70 border-gray-100 opacity-60'
                      }`}
                    >
                      {/* Badge Icon circle */}
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
                        <Trophy className={`h-6 w-6 ${isUnlocked ? 'text-indigo-600' : 'text-gray-300'}`} />
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">
                          {badge.name}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {badge.description}
                        </p>
                      </div>

                      {/* Unlocked feedback */}
                      <div>
                        {isUnlocked ? (
                          <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-100">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                            <span>Débloqué</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-400">
                            <span>Verrouillé</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Completion Certificates Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
              <div>
                <h3 className="font-display font-bold text-gray-900 text-lg">
                  Mes Diplômes Officiels
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  Validez les quiz finaux de vos cours pour générer, consulter et télécharger vos certificats officiels d'achèvement d'études musicales signés par les mentors.
                </p>
              </div>

              {/* Check if any course is qualified for certificate (has quiz pass true) */}
              {COURSES.some((c) => userProgress.completedLessons.length >= 2) ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {COURSES.map((course) => {
                    // Check if student completed lessons or quiz to earn certificate
                    const progressPercent = Math.round((course.lessons.filter((l) => userProgress.completedLessons.includes(l.id)).length / course.lessons.length) * 100);
                    const canGenerate = progressPercent >= 50; // Qualified if studied at least half of the course!
                    
                    return (
                      <div key={course.id} className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-gray-400">{course.instrument}</span>
                          <h4 className="font-display text-sm font-bold text-gray-900 mt-0.5">{course.title.split(':')[0]}</h4>
                          <p className="text-xs text-gray-500 mt-2">
                            {canGenerate 
                              ? "Statut : Diplôme disponible !" 
                              : "Complétez au moins 50% du cours pour débloquer le diplôme d'études."}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                          <button
                            id={`cert-view-btn-${course.id}`}
                            onClick={() => generateAndShowCertificate(course)}
                            disabled={!canGenerate}
                            className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center space-x-1.5 ${
                              canGenerate 
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <Award className="h-4 w-4" />
                            <span>Générer mon Diplôme</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="border border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50/50">
                  <Award className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Aucun diplôme disponible pour le moment. Commencez à étudier un cours de musique et validez ses leçons pour décrocher votre premier certificat.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ----------------- POPUP 1: INTERACTIVE QUIZ DIALOG ----------------- */}
        {showQuiz && activeCourse && activeCourse.quiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6 text-left border border-gray-100 relative">
              
              {/* Close Button */}
              <button
                onClick={() => { setShowQuiz(false); restartQuiz(); }}
                className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Quiz Header */}
              <div className="mb-6">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-mono">
                  EXAMEN DE CONTRÔLE CONNAISSANCES
                </span>
                <h3 className="font-display text-lg font-bold text-gray-900 mt-1">
                  {activeCourse.quiz.title}
                </h3>
              </div>

              {!quizFinished ? (
                // 1. ACTIVE QUESTIONS
                <div className="space-y-4">
                  {/* Progress Indicator */}
                  <div className="flex justify-between text-xs font-semibold text-gray-400">
                    <span>Question {currentQuestionIdx + 1} sur {activeCourse.quiz.questions.length}</span>
                    <span>Note actuelle : {quizScore} / {activeCourse.quiz.questions.length}</span>
                  </div>

                  <p className="text-sm font-bold text-gray-900 bg-indigo-50/30 p-4 rounded-xl leading-relaxed">
                    {activeCourse.quiz.questions[currentQuestionIdx].question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2">
                    {activeCourse.quiz.questions[currentQuestionIdx].options.map((option, oIdx) => {
                      const isSelected = selectedAnswerIdx === oIdx;
                      const isCorrect = oIdx === activeCourse.quiz?.questions[currentQuestionIdx].correctAnswerIndex;
                      
                      let optionBg = 'bg-gray-50 hover:bg-gray-100 border-gray-200';
                      if (answered) {
                        if (isCorrect) {
                          optionBg = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold';
                        } else if (isSelected) {
                          optionBg = 'bg-rose-50 border-rose-300 text-rose-950';
                        } else {
                          optionBg = 'bg-gray-50/50 border-gray-100 text-gray-400';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleAnswerSelect(oIdx)}
                          disabled={answered}
                          className={`w-full text-left rounded-xl border p-3.5 text-xs transition flex items-center justify-between ${optionBg}`}
                        >
                          <span>{option}</span>
                          {answered && isCorrect && (
                            <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 ml-3" />
                          )}
                          {answered && isSelected && !isCorrect && (
                            <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 ml-3" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Answer Explanation */}
                  {answered && (
                    <div className="rounded-xl bg-indigo-50 p-4 text-xs text-indigo-900 leading-relaxed space-y-1 animate-fade-in">
                      <p className="font-bold">Explication :</p>
                      <p>{activeCourse.quiz.questions[currentQuestionIdx].explanation}</p>
                    </div>
                  )}

                  {/* Next Step CTA */}
                  {answered && (
                    <button
                      id="quiz-next-question-btn"
                      onClick={nextQuestion}
                      className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-xs transition text-center flex items-center justify-center"
                    >
                      <span>
                        {currentQuestionIdx === activeCourse.quiz.questions.length - 1 ? 'Terminer le Quiz' : 'Question suivante'}
                      </span>
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                // 2. FINISHED STATS
                <div className="text-center space-y-5 py-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mx-auto animate-bounce">
                    <Trophy className="h-7 w-7" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-gray-900">Quiz terminé !</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Vous avez obtenu un score de <span className="font-mono font-bold text-indigo-600 text-sm">{quizScore} / {activeCourse.quiz.questions.length}</span>.
                    </p>
                  </div>

                  {quizScore >= (activeCourse.quiz.questions.length - 1) ? (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2 text-left">
                      <p className="text-xs font-bold text-emerald-950 flex items-center space-x-1">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span>Félicitations, examen de contrôle validé !</span>
                      </p>
                      <p className="text-[11px] text-emerald-800 leading-relaxed">
                        Vous avez brillamment maîtrisé la théorie musicale de ce cours. Le badge <span className="font-bold">Théoricien Assidu</span> a été épinglé à votre profil. Votre diplôme officiel d'achèvement de fin d'études est désormais disponible !
                      </p>
                      <button
                        onClick={() => {
                          setShowQuiz(false);
                          setActiveSubTab('recompenses');
                          generateAndShowCertificate(activeCourse);
                        }}
                        className="w-full mt-2 rounded-lg bg-emerald-600 text-white font-bold py-2 text-xs hover:bg-emerald-700 transition"
                      >
                        Générer et voir mon diplôme
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 space-y-1 text-left">
                      <p className="text-xs font-bold text-amber-950">Insuffisant pour valider le diplôme</p>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        Il faut obtenir au moins {(activeCourse.quiz.questions.length - 1)} bonnes réponses pour valider l'examen. Révisez vos notes de cours et réessayez dès que vous le souhaitez !
                      </p>
                      <button
                        onClick={restartQuiz}
                        className="w-full mt-2 rounded-lg bg-amber-600 text-white font-bold py-2 text-xs hover:bg-amber-700 transition"
                      >
                        Réessayer l'examen
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => { setShowQuiz(false); restartQuiz(); }}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    Retourner au Studio
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ----------------- POPUP 2: HIGH FIDELITY PRINTABLE CERTIFICATE ----------------- */}
        {showCertificate && certificateCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl p-1 overflow-hidden relative my-8">
              
              {/* Close Button */}
              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-4 right-4 z-10 rounded-full bg-white/20 p-2 text-slate-800 hover:bg-slate-100 transition shadow-md"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Printable Certificate Frame */}
              <div className="border-[14px] border-double border-indigo-950 p-6 sm:p-12 text-center space-y-8 bg-gradient-to-b from-indigo-50/30 to-amber-50/20 text-slate-900">
                
                {/* Emblem */}
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 border border-amber-200">
                    <Trophy className="h-8 w-8" />
                  </div>
                </div>

                {/* Header text */}
                <div className="space-y-1.5">
                  <p className="font-mono text-xs font-bold text-indigo-900 uppercase tracking-widest">
                    CERTIFICAT DE FORMATION MUSICALE
                  </p>
                  <p className="text-[10px] text-gray-400">Délivré par Harmonia Academy France</p>
                </div>

                {/* Core Certificate Content */}
                <div className="space-y-4">
                  <span className="text-xs text-gray-500">Le conseil d'administration atteste que</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 italic underline decoration-indigo-400 underline-offset-8">
                    Élève de l'Académie
                  </h3>
                  <p className="text-xs text-gray-600 max-w-lg mx-auto leading-relaxed">
                    a brillamment complété l'ensemble du programme académique, des exercices de solfège moderne et des quiz techniques de contrôle continu requis pour la validation du cours :
                  </p>
                  <h4 className="font-display text-lg sm:text-xl font-bold text-indigo-900 font-mono">
                    "{certificateCourse.title.split(':')[0]}"
                  </h4>
                  <span className="block text-xs text-gray-500">
                    Niveau : {certificateCourse.level} • Durée : {certificateCourse.duration} d'études
                  </span>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100 max-w-md mx-auto">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 font-mono">DIRECTEUR DE L'ACADÉMIE</p>
                    <p className="text-xs font-bold font-mono text-gray-800 italic mt-1.5 font-serif">Harmonia Board</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 font-mono">INSTRUCTEUR PRINCIPAL</p>
                    <p className="text-xs font-bold font-mono text-gray-800 italic mt-1.5 font-serif">
                      {getInstructor(certificateCourse.instructorId)?.name}
                    </p>
                  </div>
                </div>

                {/* Certificate Serial code */}
                <div className="pt-4 text-[9px] text-gray-400 font-mono flex justify-between items-center px-4">
                  <span>S/N : HMA-2026-{certificateCourse.id.toUpperCase()}-0932</span>
                  <span>Date : {new Date().toLocaleDateString('fr-FR')}</span>
                </div>

              </div>

              {/* Action buttons below certificate frame */}
              <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0">
                <span className="text-xs text-gray-400">Ce diplôme est conforme aux standards d'apprentissage en ligne de l'académie.</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => { toast('Impression/Téléchargement PDF simulé réussi !', 'success'); }}
                    className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold hover:bg-indigo-700 transition"
                  >
                    Imprimer / Télécharger (PDF)
                  </button>
                  <button
                    onClick={() => setShowCertificate(false)}
                    className="rounded-lg bg-slate-800 px-4 py-1.5 text-xs font-bold hover:bg-slate-700 transition"
                  >
                    Fermer
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
