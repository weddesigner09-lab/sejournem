/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Search, Clock, User, ChevronRight, X, Play, Music, Award, HelpCircle } from 'lucide-react';
import { BLOG_POSTS } from '../data/musicData';
import { BlogPost } from '../types';

interface BlogProps {
  showToast?: (message: string, type?: 'success' | 'info') => void;
}

export default function Blog({ showToast }: BlogProps = {}) {
  const toast = showToast || ((message: string) => alert(message));
  const [posts] = useState<BlogPost[]>(BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Free micro-video tutorials state
  const [activeTutoVideo, setActiveTutoVideo] = useState<{ title: string; instrument: string; duration: string; isPlaying: boolean } | null>(null);

  const categories = ['Tous', 'Astuce', 'Théorie', 'Matériel'];

  const freeTutorials = [
    { title: 'Chanter juste : L\'exercice du paille-eau express', instrument: 'Chant', duration: '3 min', desc: 'Une technique de pression sous-glottique pour détendre instantanément les cordes vocales.' },
    { title: 'Accorder sa guitare à l\'oreille en harmonique', instrument: 'Guitare', duration: '4 min', desc: 'Comment utiliser les harmoniques de la 5ème et 7ème frette pour accorder sans smartphone.' },
    { title: 'Le truc magique des pianistes pour swinguer le rythme', instrument: 'Piano', duration: '5 min', desc: 'Le décalage rythmique swing de la croche ternaire expliqué en quelques secondes.' }
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="blog-view" className="py-8 bg-gray-50/50 min-h-screen text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-left space-y-2 mb-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blog & Tutos Gratuits
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl">
            Retrouvez nos articles pédagogiques et nos tutoriels vidéos de moins de 5 minutes pour doper votre culture musicale gratuitement.
          </p>
        </div>

        {/* 1. Free Short Tutorials Section */}
        <div className="mb-12 bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 shadow-sm">
          <h3 className="font-display font-bold text-gray-900 text-lg flex items-center space-x-2 mb-6">
            <Play className="h-5 w-5 text-indigo-500 fill-current" />
            <span>Tutoriels courts de l'Académie (Gratuit)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freeTutorials.map((tuto, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 hover:bg-indigo-50/20 rounded-2xl p-5 border border-gray-100 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-indigo-100 text-indigo-700 text-[9px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                      {tuto.instrument}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{tuto.duration}</span>
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                    {tuto.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {tuto.desc}
                  </p>
                </div>

                <button
                  id={`free-tuto-play-${idx}`}
                  onClick={() => setActiveTutoVideo({ ...tuto, isPlaying: true })}
                  className="mt-4 w-full rounded-xl bg-white border border-gray-200 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition flex items-center justify-center space-x-1"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Regarder le Tuto</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Blog Search and Category selector */}
        <div id="blog-filtering" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Categories Tabs */}
          <div className="flex flex-wrap gap-1.5 order-2 sm:order-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-white text-gray-600 border border-gray-150 hover:bg-gray-50'
                }`}
              >
                {cat === 'Tous' ? 'Tous les articles' : cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:max-w-xs order-1 sm:order-2">
            <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Chercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {/* 3. Articles Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              id={`blog-article-card-${post.id}`}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-gray-150 overflow-hidden hover:border-indigo-100 hover:shadow-md transition duration-300"
            >
              {/* Cover Image */}
              <div className="h-48 w-full bg-gray-100 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover group-hover:scale-103 transition duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase">
                  {post.category}
                </span>
              </div>

              {/* Text content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} de lecture</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-gray-900 group-hover:text-indigo-600 transition leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-800 transition">
                  <span>Lire l'article</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ----------------- DIALOG POPUP: ARTICLE DETAILED VIEW ----------------- */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100 max-h-[85vh] flex flex-col my-8">
              
              {/* Header Image */}
              <div className="relative h-48 sm:h-56 shrink-0 bg-slate-900">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 rounded-full bg-slate-900/50 p-2 text-white hover:bg-slate-900/80 transition"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-5 left-6 right-6 text-left">
                  <span className="rounded bg-indigo-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                    {selectedPost.category}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-white mt-1.5 drop-shadow-sm">
                    {selectedPost.title}
                  </h3>
                </div>
              </div>

              {/* Main text content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono pb-3 border-b border-gray-100">
                  <span className="flex items-center space-x-1">
                    <User className="h-3.5 w-3.5" />
                    <span className="font-semibold text-gray-600">Par {selectedPost.author}</span>
                  </span>
                  <span>Publié le {selectedPost.date} • {selectedPost.readTime}</span>
                </div>

                {/* Article Content Text */}
                <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                  <p className="font-semibold text-gray-800 text-base">
                    {selectedPost.excerpt}
                  </p>
                  
                  {/* Split paragraphs manually for beautiful rendering */}
                  {selectedPost.content.split('\n\n').map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Free tip recommendation box */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start space-x-3 mt-6">
                  <Award className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-indigo-950">Envie d'aller plus loin ?</h5>
                    <p className="text-[11px] text-indigo-800 leading-relaxed mt-0.5">
                      Nos formateurs proposent des cours guidés étape par étape intégrant des fiches de synthèse à imprimer et des partitions complètes. Visitez notre catalogue pour démarrer !
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer row */}
              <div className="bg-gray-50 border-t border-gray-100 p-4 flex justify-end shrink-0">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="rounded-lg bg-gray-200 hover:bg-gray-300 px-4 py-1.5 text-xs font-bold text-gray-700 transition"
                >
                  Fermer la lecture
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ----------------- POPUP 2: SIMULATED VIDEO PLAYER FOR FREE TUTORIAL ----------------- */}
        {activeTutoVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-slate-950 shadow-2xl p-5 border border-slate-850 text-left space-y-4 relative">
              <button
                onClick={() => setActiveTutoVideo(null)}
                className="absolute top-4 right-4 rounded-full bg-slate-900/50 p-1.5 text-gray-400 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>

              <div>
                <span className="text-[9px] font-bold text-indigo-400 tracking-widest font-mono uppercase">
                  MICRO-TUTORIEL ACADÉMIE • GRATUIT
                </span>
                <h4 className="font-display font-bold text-white text-sm sm:text-base truncate mt-0.5">
                  {activeTutoVideo.title}
                </h4>
              </div>

              {/* Video stage placeholder */}
              <div className="relative rounded-xl overflow-hidden bg-slate-900 h-48 flex items-center justify-center border border-slate-800">
                {/* Visualizer animation */}
                <div className="flex space-x-1.5 items-end h-16">
                  {Array.from({ length: 15 }).map((_, i) => {
                    const randomHeight = Math.floor(Math.random() * 45) + 15;
                    return (
                      <span 
                        key={i} 
                        className="w-1.5 bg-indigo-500 rounded-full transition-all duration-150 animate-pulse-music" 
                        style={{ height: `${randomHeight}px`, animationDelay: `${i * 0.08}s` }} 
                      />
                    );
                  })}
                </div>

                <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <Play className="h-5 w-5 fill-current ml-0.5 animate-ping" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-mono">Pédagogie simplifiée • {activeTutoVideo.duration}</span>
                <button
                  onClick={() => { setActiveTutoVideo(null); toast('Merci d\'avoir regardé notre tutoriel court ! Retrouvez nos cours complets dans le catalogue.', 'success'); }}
                  className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-1.5 text-xs transition"
                >
                  Terminer le visionnage
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
