/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Music, Play, Shield, Users, Star, Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import { INSTRUCTORS } from '../data/musicData';

interface HeroProps {
  onExploreCourses: () => void;
  onExploreInstructors: (instId: string) => void;
  onSelectInstrument: (instrument: string) => void;
}

export default function Hero({ onExploreCourses, onExploreInstructors, onSelectInstrument }: HeroProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Tous');

  const categories = [
    { name: 'Piano', count: '1 cours complet', icon: '🎹', desc: 'Du classique au jazz moderne, débloquez les touches noires & blanches.', color: 'from-blue-500 to-indigo-600' },
    { name: 'Guitare', count: '1 cours complet', icon: '🎸', desc: 'Accords magiques, rythmiques feu de camp et fingerstyle acoustique.', color: 'from-amber-500 to-orange-600' },
    { name: 'Chant', count: '1 cours complet', icon: '🎤', desc: 'Technique vocale saine, respiration et maîtrise des résonateurs.', color: 'from-pink-500 to-rose-600' },
    { name: 'Production', count: '1 cours complet', icon: '🎛️', desc: 'Home-studio de A à Z, mixage, EQ et compression professionnelle.', color: 'from-emerald-500 to-teal-600' },
    { name: 'Théorie', count: 'Bientôt disponible', icon: '🎼', desc: 'Comprendre l\'harmonie pour composer sans barrière mentale.', color: 'from-purple-500 to-violet-600' },
    { name: 'Batterie', count: 'Bientôt disponible', icon: '🥁', desc: 'Travaillez l\'indépendance rythmique et le groove corporel.', color: 'from-cyan-500 to-blue-600' }
  ];

  const testimonials = [
    {
      name: 'Sophie Martin',
      role: 'Élève en Piano (Débutante)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100',
      comment: 'Je n\'avais jamais touché un clavier et je pensais être trop âgée pour apprendre. Après seulement deux semaines avec Thomas, je joue des morceaux à deux mains qui m\'émeuvent tous les jours. C\'est magique !',
      rating: 5
    },
    {
      name: 'Marc Lefebvre',
      role: 'Élève en Guitare',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100',
      comment: 'Les cours de Julien sont clairs et extrêmement progressifs. Plus besoin d\'apprendre par cœur des grilles ennuyeuses, on joue de vraies chansons pop dès la deuxième leçon !',
      rating: 5
    },
    {
      name: 'Emma Rousseau',
      role: 'Élève en Production',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100',
      comment: 'Maîtriser la compression et l\'EQ a toujours été mon point faible. Grâce à Maxime, mes morceaux ont enfin ce punch et cette clarté professionnelle qu\'il me manquait.',
      rating: 5
    }
  ];

  const stats = [
    { value: '4.9/5', label: 'Satisfaction élèves', icon: Star, color: 'text-amber-500' },
    { value: '4', label: 'Mentors Experts d\'élite', icon: Award, color: 'text-indigo-500' },
    { value: '15h+', label: 'Contenu vidéo UHD', icon: Play, color: 'text-emerald-500' },
    { value: '100%', label: 'Garantie de progrès', icon: Shield, color: 'text-rose-500' }
  ];

  return (
    <div id="home-view" className="bg-gray-50/50">
      
      {/* 1. Hero Section */}
      <section id="hero-banner" className="relative overflow-hidden bg-white py-16 sm:py-24">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute bottom-10 left-10 -z-10 h-72 w-72 rounded-full bg-amber-100/20 blur-2xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                <Music className="h-3.5 w-3.5" />
                <span>Rentrez dans l'univers de la maîtrise musicale</span>
              </span>
              
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Apprenez la musique <br />
                <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                  à votre propre rythme
                </span>
              </h2>
              
              <p className="max-w-2xl text-base text-gray-600 sm:text-lg">
                Des cours structurés étape par étape, créés par des musiciens d’exception et ingénieurs du son renommés. Progressez à l’aide d’outils interactifs, de badges et de conseils personnalisés, sans les barrières ennuyeuses de la théorie classique.
              </p>

              {/* Bullet Points */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-gray-700 pt-2">
                {[
                  "Contenu vidéo UHD & exercices interactifs",
                  "Badges de progression motivants",
                  "Accompagnements et tablatures à télécharger",
                  "Espace communauté et feedback des mentors"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  id="hero-cta-explore"
                  onClick={onExploreCourses}
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition duration-200"
                >
                  Découvrir le Catalogue
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </button>
                <button
                  id="hero-cta-sample"
                  onClick={() => onSelectInstrument('Piano')}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition duration-200"
                >
                  <Play className="mr-1.5 h-4 w-4 text-indigo-600 fill-current" />
                  Essayer un Cours Gratuit
                </button>
              </div>
            </div>

            {/* Hero Right Visuals */}
            <div className="mt-12 lg:mt-0 lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border */}
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 opacity-20 blur-lg" />
                
                {/* Main image */}
                <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800"
                    alt="Pianist hands practicing"
                    className="h-64 w-full rounded-xl object-cover sm:h-80 lg:h-96"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Real-time floating info */}
                  <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-slate-900/90 backdrop-blur-md p-4 text-white shadow-lg border border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white animate-pulse">
                        <Play className="h-5 w-5 fill-current" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">DÉMO LIVE</p>
                        <p className="text-sm font-bold truncate">Aperçu vidéo interactif</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onSelectInstrument('Piano')}
                      className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold hover:bg-white/30 transition duration-200"
                    >
                      Lancer
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Key Stats Strip */}
      <section id="academy-stats" className="border-y border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-x-8 text-center">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center space-y-1">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Presentation of Course Categories */}
      <section id="instrument-categories" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
            <h3 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choisissez votre instrument de prédilection
            </h3>
            <p className="text-base text-gray-600">
              Chaque instrument bénéficie d’un programme complet conçu par un enseignant de haut vol. Cliquez sur une catégorie pour démarrer votre aventure.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <div
                key={i}
                id={`cat-card-${cat.name.toLowerCase()}`}
                onClick={() => cat.count !== 'Bientôt disponible' && onSelectInstrument(cat.name)}
                className={`group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-300 ${
                  cat.count !== 'Bientôt disponible' ? 'cursor-pointer hover:border-indigo-200' : 'opacity-70'
                }`}
              >
                {/* Top color accent */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cat.color}`} />
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{cat.icon}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    cat.count === 'Bientôt disponible' 
                      ? 'bg-gray-100 text-gray-500' 
                      : 'bg-indigo-50 text-indigo-700'
                  }`}>
                    {cat.count}
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">
                  {cat.name}
                </h4>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {cat.desc}
                </p>

                {cat.count !== 'Bientôt disponible' && (
                  <div className="mt-4 flex items-center text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                    <span>Voir la formation</span>
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Instructor Section */}
      <section id="instructors-preview" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h3 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Vos Mentors d'Élite
            </h3>
            <p className="text-base text-gray-600">
              Rencontrez des professionnels passionnés, lauréats de conservatoire et ingénieurs du son en activité, prêts à vous guider personnellement.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {INSTRUCTORS.map((inst) => (
              <div 
                key={inst.id}
                id={`inst-preview-${inst.id}`}
                className="flex flex-col bg-gray-50/50 rounded-2xl border border-gray-100 p-6 text-center hover:border-indigo-100 hover:shadow-sm transition duration-300"
              >
                <div className="relative mx-auto mb-4 h-24 w-24">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-20" />
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="h-24 w-24 rounded-full object-cover shadow"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <h4 className="font-display text-base font-bold text-gray-900">{inst.name}</h4>
                <p className="text-xs font-semibold text-indigo-600 font-mono mt-0.5">{inst.role}</p>
                <p className="mt-3 text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {inst.bio}
                </p>

                <div className="mt-4 flex flex-wrap gap-1 justify-center">
                  {inst.specialties.slice(0, 2).map((spec, idx) => (
                    <span key={idx} className="bg-indigo-50 text-[10px] text-indigo-700 font-medium rounded-full px-2 py-0.5">
                      {spec}
                    </span>
                  ))}
                </div>

                <button
                  id={`view-mentor-btn-${inst.id}`}
                  onClick={() => onExploreInstructors(inst.id)}
                  className="mt-5 w-full rounded-xl border border-indigo-100 bg-white py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition duration-200"
                >
                  Voir sa bio & ses cours
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonial Section */}
      <section id="testimonials-strip" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h3 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ce que nos élèves en disent
            </h3>
            <p className="text-base text-gray-600">
              Des centaines d’élèves ont déjà débloqué leur potentiel. Rejoignez une communauté de passionnés.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((test, i) => (
              <div 
                key={i}
                className="flex flex-col bg-white rounded-2xl border border-gray-100 p-6 shadow-sm relative hover:shadow-md transition"
              >
                {/* Stars */}
                <div className="flex space-x-1 text-amber-400 mb-4">
                  {Array.from({ length: test.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <blockquote className="text-sm text-gray-600 leading-relaxed italic mb-6">
                  "{test.comment}"
                </blockquote>

                <div className="mt-auto flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="h-9 w-9 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">{test.name}</p>
                    <p className="text-xs text-gray-500 font-medium">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call To Action (Free Trial Offer) */}
      <section id="cta-enrollment" className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-indigo-900 px-6 py-12 shadow-2xl sm:px-12 sm:py-16 md:px-16 text-center">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-indigo-700/50 blur-3xl" />
            <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-amber-600/20 blur-2xl" />
            
            <div className="relative max-w-2xl mx-auto space-y-6">
              <h3 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Prêt à éveiller le musicien en vous ?
              </h3>
              <p className="text-base text-indigo-100">
                Inscrivez-vous dès aujourd’hui et accédez immédiatement aux premières leçons de chaque instrument. Pas de carte bancaire requise, démarrez l’essai gratuit en quelques clics.
              </p>
              
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center pt-2">
                <button
                  id="cta-join-free"
                  onClick={() => onSelectInstrument('Piano')}
                  className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-900 shadow-md hover:bg-indigo-50 transition duration-200"
                >
                  Essayer gratuitement
                </button>
                <button
                  id="cta-join-catalog"
                  onClick={onExploreCourses}
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white border border-indigo-500 hover:bg-indigo-700 transition duration-200"
                >
                  Voir les abonnements
                </button>
              </div>

              <p className="text-xs text-indigo-200">
                Accès instantané • Communauté francophone bienveillante • Formateurs agréés
              </p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
