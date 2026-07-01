/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Award, BookOpen, Clock, Music, ArrowLeft, Heart, MessageSquare } from 'lucide-react';
import { INSTRUCTORS, COURSES } from '../data/musicData';

interface InstructorProfileProps {
  instructorId: string;
  onBackToAccueil: () => void;
  onExploreCourse: (courseId: string) => void;
}

export default function InstructorProfile({ instructorId, onBackToAccueil, onExploreCourse }: InstructorProfileProps) {
  const instructor = INSTRUCTORS.find((inst) => inst.id === instructorId);

  if (!instructor) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Formateur introuvable.</p>
        <button onClick={onBackToAccueil} className="mt-4 text-indigo-600 font-bold hover:underline">
          Retourner à l'accueil
        </button>
      </div>
    );
  }

  // Find courses created by this instructor
  const matchingCourses = COURSES.filter((c) => c.instructorId === instructor.id);

  return (
    <div id="instructor-profile-view" className="py-8 bg-gray-50/50 min-h-screen text-left">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={onBackToAccueil}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retourner à l'accueil</span>
        </button>

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 md:flex md:items-center md:space-x-8 mb-8">
          {/* Avatar with gradient border */}
          <div className="relative shrink-0 mx-auto md:mx-0 h-32 w-32 mb-6 md:mb-0">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-25 blur-sm" />
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="relative h-32 w-32 rounded-full object-cover shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Bio text */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <span className="inline-flex items-center space-x-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                <Award className="h-3.5 w-3.5" />
                <span>Mentor Agréé</span>
              </span>
              <h2 className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl mt-1.5">
                {instructor.name}
              </h2>
              <p className="text-sm font-semibold text-indigo-600 font-mono">{instructor.role}</p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
              {instructor.bio}
            </p>

            {/* Specialties Row */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {instructor.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="rounded-full bg-slate-900 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 font-mono"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Strip */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-6 sm:p-8 text-center text-white relative overflow-hidden mb-8 shadow-sm">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-indigo-700/30 blur-2xl" />
          <div className="relative max-w-2xl mx-auto space-y-2">
            <MessageSquare className="h-6 w-6 text-indigo-300 mx-auto opacity-50" />
            <p className="font-display text-base sm:text-lg italic font-medium leading-relaxed">
              "{instructor.quote}"
            </p>
          </div>
        </div>

        {/* Instructor's Courses Section */}
        <div className="space-y-6">
          <h3 className="font-display text-xl font-bold text-gray-900">
            Formations proposées par {instructor.name}
          </h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {matchingCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onExploreCourse(course.id)}
                className="group cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition duration-300 overflow-hidden flex"
              >
                {/* Course Image Side */}
                <div className="relative w-1/3 bg-gray-50 overflow-hidden shrink-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Course Text Side */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider">
                      {course.instrument} • {course.level}
                    </span>
                    <h4 className="font-display text-sm font-bold text-gray-900 group-hover:text-indigo-600 line-clamp-1 mt-0.5">
                      {course.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Info stats */}
                  <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-mono mt-3 border-t border-gray-50 pt-2">
                    <span className="flex items-center space-x-0.5">
                      <Clock className="h-3 w-3 text-indigo-500" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="flex items-center space-x-0.5">
                      <BookOpen className="h-3 w-3 text-gray-500" />
                      <span>{course.lessons.length} leçons</span>
                    </span>
                    <span className="flex items-center space-x-0.5">
                      <Star className="h-3 w-3 text-amber-400 fill-current" />
                      <span className="text-gray-600 font-bold">{course.rating}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
