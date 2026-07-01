/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Users, MessageSquare, ThumbsUp, Send, Calendar, Star, Trophy, Plus, ArrowLeft, Filter, AlertCircle, X } from 'lucide-react';
import { INITIAL_FORUM_POSTS } from '../data/musicData';
import { ForumPost, ForumComment } from '../types';

interface CommunityProps {
  showToast?: (message: string, type?: 'success' | 'info') => void;
}

export default function Community({ showToast }: CommunityProps = {}) {
  const toast = showToast || ((message: string) => alert(message));
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [selectedChannel, setSelectedChannel] = useState<string>('Tous');
  const [activePostDetails, setActivePostDetails] = useState<ForumPost | null>(null);
  
  // New Post form states
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newChannel, setNewChannel] = useState<string>('Piano');
  const [newContent, setNewContent] = useState<string>('');
  
  // Comment input state
  const [commentInput, setCommentInput] = useState<string>('');

  const channels = ['Tous', 'Piano', 'Guitare', 'Chant', 'Production'];

  // Live masterclasses schedule
  const masterclasses = [
    { id: 'mc-1', title: 'L\'art d\'accompagner une chanteuse au piano', host: 'Thomas Bergersen', date: 'Mardi 07 Juillet • 19h00', desc: 'Comment alléger son jeu main gauche pour laisser de l\'espace à la voix.' },
    { id: 'mc-2', title: 'Réussir ses solos de guitare folk en Pentatonique', host: 'Julien Ségur', date: 'Vendredi 10 Juillet • 18h30', desc: 'Le secret des 5 positions indispensables et comment lier les notes avec fluidité.' },
    { id: 'mc-3', title: 'Échauffement vocal d\'avant concert de 5 minutes', host: 'Sarah Clavier', date: 'Lundi 14 Juillet • 20h00', desc: 'Routine express sans fatigue pour réveiller ses cordes vocales dans les coulisses.' }
  ];

  // Monthly challenge
  const challenge = {
    title: 'Défi de l\'été : Votre plus beau riff de Guitare ou Piano',
    reward: 'Une masterclass individuelle de 30 minutes offerte avec le mentor de votre choix !',
    deadline: 'Fin des soumissions le 31 Juillet 2026',
    desc: 'Enregistrez une vidéo ou un fichier audio de 15 à 30 secondes contenant un riff original ou votre plus bel enchaînement d\'accords. Soyez créatif et soignez le tempo !'
  };

  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setForumPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
    if (activePostDetails && activePostDetails.id === postId) {
      setActivePostDetails(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;

    const newComment: ForumComment = {
      id: `comm-${Date.now()}`,
      author: 'Élève de l\'Académie',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100',
      content: commentInput,
      createdAt: 'À l\'instant'
    };

    setForumPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updatedPost = { ...post, comments: [...post.comments, newComment] };
          // Keep active details synced if viewing
          if (activePostDetails && activePostDetails.id === postId) {
            setActivePostDetails(updatedPost);
          }
          return updatedPost;
        }
        return post;
      })
    );

    setCommentInput('');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      author: 'Élève de l\'Académie',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100',
      instrument: newChannel,
      content: newContent,
      likes: 1,
      comments: [],
      createdAt: 'À l\'instant'
    };

    setForumPosts([newPost, ...forumPosts]);
    setNewTitle('');
    setNewContent('');
    setShowCreateForm(false);
  };

  const filteredPosts = forumPosts.filter(post => 
    selectedChannel === 'Tous' || post.instrument === selectedChannel
  );

  return (
    <div id="community-view" className="py-8 bg-gray-50/50 min-h-screen text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 mb-8 border-b border-gray-100">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
              Espace Communauté
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Partagez vos doutes, échangez avec les autres élèves, réservez vos masterclasses en direct et relevez les défis mensuels.
            </p>
          </div>

          <button
            id="comm-create-post-btn"
            onClick={() => setShowCreateForm(true)}
            className="mt-4 md:mt-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition flex items-center space-x-1.5 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Créer un nouveau sujet</span>
          </button>
        </div>

        {/* ----------------- FORUM LIST OR POST DETAILS ----------------- */}
        {!activePostDetails ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Channels & Threads list */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Channel Tabs */}
              <div className="flex flex-wrap gap-2 pb-1.5 border-b border-gray-100">
                {channels.map(chan => (
                  <button
                    key={chan}
                    id={`channel-tab-${chan}`}
                    onClick={() => setSelectedChannel(chan)}
                    className={`rounded-lg px-4 py-2 text-xs font-bold transition flex items-center space-x-1 ${
                      selectedChannel === chan 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-white text-gray-600 border border-gray-150 hover:bg-gray-50'
                    }`}
                  >
                    <span>{chan === 'Tous' ? 'Tous les canaux' : `# ${chan}`}</span>
                  </button>
                ))}
              </div>

              {/* Thread list */}
              <div className="space-y-4">
                {filteredPosts.map(post => (
                  <div
                    key={post.id}
                    id={`forum-post-card-${post.id}`}
                    onClick={() => setActivePostDetails(post)}
                    className="group cursor-pointer bg-white rounded-2xl border border-gray-150 p-5 hover:border-indigo-200 hover:shadow-sm transition text-left space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      {/* Author */}
                      <div className="flex items-center space-x-3">
                        <img src={post.avatar} alt={post.author} className="h-9 w-9 rounded-full object-cover shadow-sm" />
                        <div>
                          <p className="text-xs font-bold text-gray-900 leading-tight">{post.author}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{post.createdAt}</p>
                        </div>
                      </div>

                      {/* Tag */}
                      <span className="rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                        #{post.instrument}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-display font-bold text-gray-900 group-hover:text-indigo-600 transition leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    {/* Stats footer */}
                    <div className="flex items-center space-x-4 text-xs font-mono text-gray-400 pt-3 border-t border-gray-50">
                      <button
                        onClick={(e) => handleLike(post.id, e)}
                        className="flex items-center space-x-1 hover:text-indigo-600 transition"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span className="font-bold">{post.likes}</span>
                      </button>

                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span className="font-bold">{post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Live Masterclasses & Monthly Challenges */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Challenge Panel */}
              <div className="bg-gradient-to-tr from-indigo-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-700/20 blur-2xl" />
                
                <div className="flex items-center space-x-2 text-indigo-300">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Défi Mensuel</span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-sm sm:text-base leading-tight">
                    {challenge.title}
                  </h4>
                  <p className="text-xs text-indigo-200 leading-relaxed">
                    {challenge.desc}
                  </p>
                </div>

                <div className="bg-white/10 rounded-xl p-3 space-y-1 text-left border border-white/5">
                  <p className="text-[10px] font-bold text-amber-300 uppercase font-mono">RÉCOMPENSE UNIQUE :</p>
                  <p className="text-xs text-gray-100">{challenge.reward}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-indigo-300 font-mono italic">{challenge.deadline}</span>
                  <button
                    onClick={() => { toast('Félicitations, vous participez au défi mensuel ! Envoyez votre riff dans l\'Espace Devoirs.', 'success'); }}
                    className="rounded-lg bg-amber-400 hover:bg-amber-500 text-indigo-950 font-bold px-3 py-1.5 text-[11px] transition"
                  >
                    Participer
                  </button>
                </div>
              </div>

              {/* Upcoming Masterclasses */}
              <div className="bg-white rounded-2xl border border-gray-150 p-5 shadow-sm space-y-4">
                <h4 className="font-display font-bold text-gray-900 text-sm flex items-center space-x-1.5">
                  <Calendar className="h-5 w-5 text-indigo-500" />
                  <span>Prochains Directs</span>
                </h4>

                <div className="space-y-4">
                  {masterclasses.map(mc => (
                    <div key={mc.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2 text-left">
                      <div>
                        <span className="inline-block bg-indigo-50 text-[9px] font-mono font-bold text-indigo-700 rounded px-1.5 py-0.5">
                          {mc.date}
                        </span>
                        <h5 className="text-xs font-bold text-gray-900 mt-1 leading-tight">
                          {mc.title}
                        </h5>
                        <p className="text-[10px] text-gray-400 mt-0.5">Animé par {mc.host}</p>
                      </div>

                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        {mc.desc}
                      </p>

                      <button
                        onClick={() => toast(`Rappel activé pour la masterclass de ${mc.host} !`, 'info')}
                        className="w-full rounded-lg bg-white border border-gray-200 py-1.5 text-[10px] font-bold text-gray-700 hover:bg-gray-100 transition"
                      >
                        M'inscrire & Ajouter au calendrier
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        ) : (
          // ----------------- SUB-VIEW: FORUM THREAD POST DETAILS -----------------
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Post details and comments */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-6 text-left">
              {/* Back CTA */}
              <button
                onClick={() => setActivePostDetails(null)}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retourner au forum</span>
              </button>

              {/* Main Post details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={activePostDetails.avatar} alt={activePostDetails.author} className="h-10 w-10 rounded-full object-cover shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{activePostDetails.author}</p>
                      <p className="text-xs text-gray-400 font-mono">{activePostDetails.createdAt}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-50 text-indigo-800 text-[10px] font-bold px-3 py-1 font-mono">
                    #{activePostDetails.instrument}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl font-extrabold text-gray-900 leading-snug">
                    {activePostDetails.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {activePostDetails.content}
                  </p>
                </div>

                {/* Like trigger */}
                <div className="flex items-center space-x-4 pt-3 border-y border-gray-100 py-2.5">
                  <button
                    onClick={(e) => handleLike(activePostDetails.id, e)}
                    className="flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 transition"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Aider ({activePostDetails.likes})</span>
                  </button>
                  <span className="text-xs text-gray-400 font-mono">
                    {activePostDetails.comments.length} Réponse{activePostDetails.comments.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Comments/Replies list */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">RÉPONSES DU FIL :</h4>
                
                {activePostDetails.comments.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">Aucun commentaire pour le moment. Soyez le premier à répondre !</p>
                ) : (
                  <div className="space-y-3">
                    {activePostDetails.comments.map(comm => (
                      <div key={comm.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <img src={comm.avatar} alt={comm.author} className="h-6 w-6 rounded-full object-cover" />
                            <span className="text-xs font-bold text-gray-900">{comm.author}</span>
                            {comm.author.includes('Thomas') || comm.author.includes('Julien') ? (
                              <span className="bg-indigo-100 text-[8px] font-mono font-bold text-indigo-700 px-1 py-0.2 rounded uppercase">Mentor</span>
                            ) : null}
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono">{comm.createdAt}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed text-left pl-8">
                          {comm.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Write a comment */}
              <div className="pt-4 border-t border-gray-150 flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Écrire votre réponse d'entraide..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 rounded-xl border border-gray-200 bg-white p-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment(activePostDetails.id)}
                />
                <button
                  onClick={() => handleAddComment(activePostDetails.id)}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white p-3 transition"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

            </div>

            {/* Right Column details list */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-150 p-6 shadow-sm text-left space-y-4">
              <h4 className="font-display font-bold text-gray-900 text-sm">Règles de bienveillance</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Le forum de l’académie est un espace d’entraide et d’apprentissage respectueux. Soyez indulgents avec les débutants ! La critique constructive est la bienvenue pour faire grandir tout le monde.
              </p>
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span className="text-[10px] text-indigo-900 leading-normal">
                  Chaque canal dispose également d'un chat Slack/Discord privé de l'académie accessible aux abonnés Premium.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- DIALOG POPUP: CREATE SUBJECT FORM ----------------- */}
        {showCreateForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6 text-left border border-gray-100 relative">
              <button
                onClick={() => setShowCreateForm(false)}
                className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
                Créer un nouveau sujet de discussion
              </h3>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Titre du sujet</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Doigté main gauche leçon 3"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Instrument concerné</label>
                  <select
                    value={newChannel}
                    onChange={(e) => setNewChannel(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  >
                    {channels.slice(1).map(ch => (
                      <option key={ch} value={ch}>{ch}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Votre question ou partage</label>
                  <textarea
                    required
                    placeholder="Détaillez votre question, blocage ou conseil..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full h-32 rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
                  />
                </div>

                <div className="flex space-x-2.5 pt-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 text-xs transition text-center"
                  >
                    Publier sur le forum
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2.5 text-xs transition"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
