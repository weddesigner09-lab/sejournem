/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Star, Play, ChevronRight, X, User, CheckCircle, Info, DollarSign, Award } from 'lucide-react';
import { COURSES, INSTRUCTORS, REVIEWS } from '../data/musicData';
import { Course } from '../types';

interface CatalogueProps {
  onEnrollInCourse: (courseId: string) => void;
  enrolledCourseIds: string[];
  selectedInstrumentFilter?: string;
  setSelectedInstrumentFilter?: (instrument: string) => void;
  isPremiumUser: boolean;
  onOpenPricing: () => void;
  onSelectInstructor: (instructorId: string) => void;
}

export default function Catalogue({
  onEnrollInCourse,
  enrolledCourseIds,
  selectedInstrumentFilter = 'Tous',
  setSelectedInstrumentFilter,
  isPremiumUser,
  onOpenPricing,
  onSelectInstructor
}: CatalogueProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('Tous');
  const [priceRange, setPriceRange] = useState<number>(100);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const instruments = ['Tous', 'Piano', 'Guitare', 'Chant', 'Production'];
  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];

  const filteredCourses = COURSES.filter((course) => {
    const matchesInstrument = selectedInstrumentFilter === 'Tous' || course.instrument === selectedInstrumentFilter;
    const matchesLevel = selectedLevel === 'Tous' || course.level === selectedLevel;
    const matchesPrice = course.price <= priceRange;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesInstrument && matchesLevel && matchesPrice && matchesSearch;
  });

  const getInstructor = (instructorId: string) => {
    return INSTRUCTORS.find((inst) => inst.id === instructorId);
  };

  return (
    <div id="catalogue-view" className="py-8 bg-gray-50/50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-left space-y-2 mb-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Catalogue des Formations
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl">
            Trouvez le cours idéal parmi nos formations approfondies adaptées de la théorie moderne à la pratique studio.
          </p>
        </div>

        {/* Search and Filters Block */}
        <div id="search-filter-block" className="grid grid-cols-1 gap-4 lg:grid-cols-12 mb-8">
          {/* Search bar */}
          <div className="relative lg:col-span-4">
            <Search className="absolute top-3.5 left-3.5 h-4.5 w-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un cours (ex: partition, compresseur...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Instrument Selector */}
          <div className="lg:col-span-3">
            <select
              value={selectedInstrumentFilter}
              onChange={(e) => setSelectedInstrumentFilter && setSelectedInstrumentFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            >
              <option disabled>Filtrer par instrument</option>
              {instruments.map((ins) => (
                <option key={ins} value={ins}>
                  Instrument : {ins === 'Tous' ? 'Tous les instruments' : ins}
                </option>
              ))}
            </select>
          </div>

          {/* Level Selector */}
          <div className="lg:col-span-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            >
              <option disabled>Filtrer par niveau</option>
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  Niveau : {lvl === 'Tous' ? 'Tous les niveaux' : lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 px-4 py-2 flex flex-col justify-center">
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
              <span>Prix max</span>
              <span className="font-mono text-indigo-600 font-bold">{priceRange}€</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1 bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-lg mx-auto shadow-sm">
            <Info className="h-10 w-10 text-indigo-500 mx-auto mb-4" />
            <h4 className="font-display font-bold text-lg text-gray-900">Aucun cours trouvé</h4>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Essayez de modifier ou de réinitialiser vos filtres de recherche. Tous nos cours de musique sont disponibles sans solfège obligatoire !
            </p>
            <button
              onClick={() => {
                setSelectedInstrumentFilter && setSelectedInstrumentFilter('Tous');
                setSelectedLevel('Tous');
                setPriceRange(100);
                setSearchQuery('');
              }}
              className="mt-5 rounded-xl bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);
            const instructor = getInstructor(course.instructorId);

            return (
              <div
                key={course.id}
                id={`course-card-${course.id}`}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition duration-300 overflow-hidden"
              >
                {/* Course Image */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Badge Level */}
                  <span className={`absolute top-4 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    course.level === 'Débutant' ? 'bg-emerald-500 text-white' :
                    course.level === 'Intermédiaire' ? 'bg-blue-500 text-white' : 'bg-purple-600 text-white'
                  }`}>
                    {course.level}
                  </span>
                  {/* Instrument Type badge */}
                  <span className="absolute top-4 right-4 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5">
                    {course.instrument}
                  </span>
                </div>

                {/* Course Content */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Instructor name */}
                  {instructor && (
                    <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium mb-2">
                      <img src={instructor.avatar} alt={instructor.name} className="h-5 w-5 rounded-full object-cover" />
                      <span>Par {instructor.name}</span>
                    </div>
                  )}

                  <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition duration-150 line-clamp-1 mb-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 line-clamp-3 mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Rating, Lessons, Price Row */}
                  <div className="mt-auto grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center space-x-0.5 text-xs font-bold text-gray-800">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-current" />
                        <span>{course.rating}</span>
                      </span>
                      <span className="text-[10px] text-gray-400">{course.reviewsCount} avis</span>
                    </div>
                    <div className="flex flex-col items-center border-x border-gray-100">
                      <span className="flex items-center space-x-0.5 text-xs font-bold text-gray-800">
                        <Clock className="h-3.5 w-3.5 text-indigo-500" />
                        <span className="font-mono">{course.duration}</span>
                      </span>
                      <span className="text-[10px] text-gray-400">{course.lessons.length} leçons</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-gray-800 font-mono">
                        {isPremiumUser ? 'Inclus' : `${course.price}€`}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {isPremiumUser ? 'Premium' : 'Paiement unique'}
                      </span>
                    </div>
                  </div>

                  {/* CTA row */}
                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <button
                      id={`course-details-btn-${course.id}`}
                      onClick={() => setSelectedCourse(course)}
                      className="w-full rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
                    >
                      Détails & Programme
                    </button>
                    {isEnrolled ? (
                      <button
                        className="w-full rounded-xl bg-indigo-50 py-2.5 text-xs font-bold text-indigo-700 cursor-default"
                        disabled
                      >
                        Inscrit ✓
                      </button>
                    ) : (
                      <button
                        id={`course-join-btn-${course.id}`}
                        onClick={() => {
                          if (isPremiumUser) {
                            onEnrollInCourse(course.id);
                          } else {
                            setSelectedCourse(course); // opens details first to show single purchase or subscription option
                          }
                        }}
                        className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm shadow-indigo-100 transition"
                      >
                        {isPremiumUser ? 'Rejoindre' : 'Débuter'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ----------------- Detailed Course Dialog ----------------- */}
        {selectedCourse && (
          <div id="course-details-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
            <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col my-8">
              
              {/* Header Image Accent */}
              <div className="relative h-48 sm:h-64 bg-indigo-950 shrink-0">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  className="w-full h-full object-cover opacity-45"
                  referrerPolicy="no-referrer"
                />
                <button
                  id="close-modal-btn"
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-4 right-4 rounded-full bg-slate-900/55 p-2 text-white hover:bg-slate-900/80 transition"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Overlaid Title and Info */}
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <span className="rounded-full bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5">
                    {selectedCourse.level} • {selectedCourse.instrument}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl mt-2 drop-shadow-sm">
                    {selectedCourse.title}
                  </h3>
                </div>
              </div>

              {/* Main Body */}
              <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
                
                {/* Left Side: Description, Syllabus, Prerequisites */}
                <div className="md:col-span-7 space-y-6">
                  {/* Presentation */}
                  <div>
                    <h4 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-1.5">
                      <BookOpen className="h-5 w-5 text-indigo-500" />
                      <span>Présentation du cours</span>
                    </h4>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                      {selectedCourse.longDescription}
                    </p>
                  </div>

                  {/* Prerequisites */}
                  <div>
                    <h4 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-2">
                      Prérequis nécessaires
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                      {selectedCourse.prerequisites.map((req, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Syllabus/Morceaux de leçons */}
                  <div>
                    <h4 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center justify-between">
                      <span>Programme des leçons</span>
                      <span className="text-xs text-gray-500 font-mono font-normal">
                        {selectedCourse.lessons.length} vidéos pédagogiques
                      </span>
                    </h4>
                    <div className="mt-3 space-y-2">
                      {selectedCourse.lessons.map((lesson, index) => (
                        <div key={lesson.id} className="flex items-start justify-between rounded-xl bg-gray-50 p-3 hover:bg-gray-100 transition">
                          <div className="flex space-x-3 text-left">
                            <span className="font-mono text-xs font-bold text-indigo-500 mt-0.5">
                              0{index + 1}
                            </span>
                            <div>
                              <h5 className="text-sm font-bold text-gray-900 leading-tight">
                                {lesson.title}
                              </h5>
                              <p className="text-xs text-gray-500 mt-0.5">{lesson.description}</p>
                            </div>
                          </div>
                          <span className="font-mono text-xs text-gray-400 shrink-0 ml-4">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Student Reviews */}
                  <div>
                    <h4 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-2">
                      Avis des étudiants ({selectedCourse.reviewsCount})
                    </h4>
                    <div className="mt-3 space-y-3">
                      {(REVIEWS[selectedCourse.id] || []).map((rev, idx) => (
                        <div key={idx} className="bg-gray-50/50 rounded-xl p-3 border border-gray-100">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-gray-900">{rev.author}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                          </div>
                          <div className="flex text-amber-400 space-x-0.5 mb-1.5">
                            {Array.from({ length: rev.rating }).map((_, rIdx) => (
                              <Star key={rIdx} className="h-3 w-3 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed italic">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Instructor Quote, Price Block, Enrollment Trigger */}
                <div className="md:col-span-5 space-y-6">
                  {/* Instructor Bio block */}
                  {getInstructor(selectedCourse.instructorId) && (
                    <div className="rounded-2xl border border-indigo-50 bg-indigo-50/20 p-5 space-y-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={getInstructor(selectedCourse.instructorId)?.avatar}
                          alt={getInstructor(selectedCourse.instructorId)?.name}
                          className="h-11 w-11 rounded-full object-cover shadow-sm"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">
                            {getInstructor(selectedCourse.instructorId)?.name}
                          </h4>
                          <p className="text-[11px] font-mono font-semibold text-indigo-600 uppercase tracking-wide">
                            Votre Formateur Principal
                          </p>
                        </div>
                      </div>
                      <blockquote className="text-xs text-indigo-800 leading-relaxed italic border-l-2 border-indigo-200 pl-3">
                        "{getInstructor(selectedCourse.instructorId)?.quote}"
                      </blockquote>
                      <button
                        onClick={() => {
                          onSelectInstructor(selectedCourse.instructorId);
                          setSelectedCourse(null);
                        }}
                        className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center"
                      >
                        <span>En savoir plus sur son parcours</span>
                        <ChevronRight className="ml-0.5 h-3 w-3" />
                      </button>
                    </div>
                  )}

                  {/* Purchase CTA Block */}
                  <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Tarification unique</span>
                      <span className="font-display text-3xl font-black text-gray-900 font-mono">
                        {selectedCourse.price}€
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed">
                      L’achat vous offre un accès illimité à vie aux {selectedCourse.lessons.length} vidéos, documents d’accompagnement, pistes playbacks (backing tracks) et aux futures mises à jour de ce cours.
                    </p>

                    {/* Quick premium offer highlight */}
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 space-y-1.5">
                      <p className="text-xs font-bold text-amber-900 flex items-center space-x-1">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>Alternativement : Accès Illimité</span>
                      </p>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        Rejoignez l’abonnement annuel à seulement <span className="font-bold">19€/mois</span> pour débloquer TOUT le catalogue d’un coup ainsi que les sessions directes (masterclasses).
                      </p>
                      {!isPremiumUser && (
                        <button
                          onClick={() => {
                            setSelectedCourse(null);
                            onOpenPricing();
                          }}
                          className="text-[11px] font-bold text-amber-700 underline flex items-center"
                        >
                          <span>S'abonner maintenant</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>

                    {enrolledCourseIds.includes(selectedCourse.id) ? (
                      <div className="rounded-xl bg-emerald-50 text-emerald-800 font-bold p-3 text-center text-xs">
                        Vous êtes inscrit à ce cours ! Accédez-y dans l'Espace Élève.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <button
                          id="modal-purchase-and-start"
                          onClick={() => {
                            onEnrollInCourse(selectedCourse.id);
                            setSelectedCourse(null);
                          }}
                          className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition flex items-center justify-center space-x-1.5"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Démarrer le cours ({isPremiumUser ? "Inclus Premium" : "Acheter ce cours"})</span>
                        </button>
                        <p className="text-[10px] text-center text-gray-400">
                          Garantie satisfait ou remboursé sous 14 jours
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-100 bg-gray-50/50 p-4 flex justify-between items-center shrink-0">
                <span className="text-xs text-gray-500 font-mono">
                  Éducation Musicale Sur-Mesure • Sans stress classique
                </span>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="rounded-lg bg-gray-200 px-4 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-300 transition"
                >
                  Fermer
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
