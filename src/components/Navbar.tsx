/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Music, Award, BookOpen, Users, Compass, DollarSign, HelpCircle, Sparkles, User, MoreHorizontal, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProgress: {
    enrolledCourses: string[];
    completedLessons: string[];
    badges: string[];
    isPremium: boolean;
  };
  onOpenProfile: () => void;
}

export default function Navbar({ activeTab, setActiveTab, userProgress, onOpenProfile }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'accueil', label: 'Accueil', icon: Compass },
    { id: 'catalogue', label: 'Catalogue', icon: BookOpen },
    { id: 'dashboard', label: 'Espace Élève', icon: Award, badge: userProgress.enrolledCourses.length > 0 ? userProgress.enrolledCourses.length : undefined },
    { id: 'communaute', label: 'Communauté', icon: Users },
    { id: 'blog', label: 'Blog & Tutos', icon: Music },
    { id: 'tarifs', label: 'Tarifs', icon: DollarSign, highlight: !userProgress.isPremium },
    { id: 'faq', label: 'FAQ & Contact', icon: HelpCircle }
  ];

  const mobileVisibleTabIds = ['accueil', 'catalogue', 'dashboard', 'communaute'];
  const mobileVisibleTabs = tabs.filter(tab => mobileVisibleTabIds.includes(tab.id));
  const mobileMenuTabs = tabs.filter(tab => !mobileVisibleTabIds.includes(tab.id));

  return (
    <header id="app-navbar" className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div 
          id="navbar-logo"
          className="flex cursor-pointer items-center space-x-2.5"
          onClick={() => setActiveTab('accueil')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
            <Music className="h-5.5 w-5.5" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
              Harmonia <span className="text-indigo-600">Academy</span>
            </h1>
            <p className="hidden text-[10px] font-mono tracking-widest text-gray-400 uppercase sm:block">
              FORMATION MUSICALE
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="navbar-links" className="hidden lg:flex lg:space-x-1 xl:space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-link-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center space-x-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50/70 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-105 ${
                  isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                <span>{tab.label}</span>
                
                {/* Visual Indicators */}
                {tab.badge !== undefined && (
                  <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
                    {tab.badge}
                  </span>
                )}
                {tab.highlight && (
                  <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping absolute top-1 right-1" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Status / Action Button */}
        <div id="navbar-actions" className="flex items-center space-x-3">
          {/* Quick Stats */}
          <div className="hidden items-center space-x-4 border-r border-gray-100 pr-4 md:flex">
            {userProgress.isPremium && (
              <span className="inline-flex items-center space-x-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
                <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
                <span>Membre Premium</span>
              </span>
            )}
            <div className="flex items-center space-x-1.5" title="Badges débloqués">
              <Award className="h-4.5 w-4.5 text-indigo-500" />
              <span className="font-mono text-xs font-semibold text-gray-700">
                {userProgress.badges.length} Badge{userProgress.badges.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* User Button */}
          <button
            id="nav-profile-btn"
            onClick={onOpenProfile}
            className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-gray-50/50 p-1.5 pr-3 hover:bg-gray-100 transition duration-200"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs uppercase shadow-inner">
              <User className="h-4 w-4" />
            </div>
            <span className="hidden text-xs font-medium text-gray-700 md:inline">
              Élève Académie
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Sticky Tab bar */}
      <div id="navbar-mobile" className="flex border-t border-gray-100 bg-white/95 py-2 px-1 lg:hidden">
        <div className="flex w-full justify-around">
          {mobileVisibleTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex flex-col items-center justify-center px-2 py-1 text-[10px] font-medium transition-all duration-150 ${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-gray-500'
                }`}
              >
                <div className="relative">
                  <Icon className={`h-5 w-5 mb-0.5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                  {tab.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-2 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-indigo-600 px-0.5 text-[8px] font-bold text-white">
                      {tab.badge}
                    </span>
                  )}
                  {tab.highlight && (
                    <span className="absolute top-0 right-0 flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                  )}
                </div>
                <span>{tab.id === 'dashboard' ? 'Élève' : tab.label.split(' ')[0]}</span>
              </button>
            );
          })}

          {/* Plus / More Button */}
          {(() => {
            const isAnySubTabActive = mobileMenuTabs.some(tab => tab.id === activeTab);
            return (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`flex flex-col items-center justify-center px-2 py-1 text-[10px] font-medium transition-all duration-150 ${
                  isAnySubTabActive || isMobileMenuOpen ? 'text-indigo-600 font-semibold' : 'text-gray-500'
                }`}
              >
                <div className="relative">
                  <MoreHorizontal className={`h-5 w-5 mb-0.5 ${isAnySubTabActive || isMobileMenuOpen ? 'text-indigo-600' : 'text-gray-400'}`} />
                  {mobileMenuTabs.some(t => t.highlight) && !isMobileMenuOpen && (
                    <span className="absolute top-0 right-0 flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                  )}
                </div>
                <span>Plus</span>
              </button>
            );
          })()}
        </div>
      </div>

      {/* Mobile Bottom Menu Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-drawer" className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop blur overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer Panel */}
          <div className="fixed bottom-0 left-0 right-0 rounded-t-2xl bg-white p-6 shadow-2xl border-t border-gray-100 transition-transform duration-300 ease-out animate-slide-up max-h-[80vh] overflow-y-auto z-10">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4 mb-4">
              <div className="text-left">
                <h3 className="font-display font-bold text-gray-900">Plus d'options</h3>
                <p className="text-[11px] text-gray-400">Découvrez nos autres espaces d'apprentissage</p>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              {mobileMenuTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex flex-col items-start p-4 rounded-xl border text-left transition ${
                      isActive 
                        ? 'border-indigo-100 bg-indigo-50/50 text-indigo-700 font-semibold' 
                        : 'border-gray-100 bg-gray-50/50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="relative mb-2">
                      <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                      {tab.badge !== undefined && (
                        <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[9px] font-bold text-white">
                          {tab.badge}
                        </span>
                      )}
                      {tab.highlight && (
                        <span className="absolute top-0 right-0 flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                      )}
                    </div>
                    <span className="text-xs font-bold">{tab.label}</span>
                    <span className="text-[10px] text-gray-400 font-normal mt-0.5">
                      {tab.id === 'blog' ? 'Vidéos & Tutos' : tab.id === 'tarifs' ? 'Offres Premium' : 'Aide & Contact'}
                    </span>
                  </button>
                );
              })}

              {/* Mon Profil Button inside the grid */}
              <button
                onClick={() => {
                  onOpenProfile();
                  setIsMobileMenuOpen(false);
                }}
                className="col-span-2 flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 text-left hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs uppercase shadow-inner">
                    <User className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Mon Profil Élève</h4>
                    <p className="text-[10px] text-gray-400">Consulter mes badges & progression</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Premium quick check */}
            <div className="mt-5 border-t border-gray-100 pt-4 flex items-center justify-between text-xs">
              <span className="text-gray-500">Statut :</span>
              {userProgress.isPremium ? (
                <span className="inline-flex items-center space-x-1 rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-700 border border-amber-200">
                  <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
                  <span>Abonné Premium</span>
                </span>
              ) : (
                <button
                  onClick={() => {
                    setActiveTab('tarifs');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Passer au Premium
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
