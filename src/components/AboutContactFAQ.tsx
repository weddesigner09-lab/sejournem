/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, ChevronDown, Award } from 'lucide-react';

export default function AboutContactFAQ() {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const faqs = [
    {
      q: "Puis-je apprendre sans aucune notion de solfège ?",
      a: "Absolument ! Notre philosophie est basée sur l'apprentissage intuitif et immédiat. Nous utilisons des tablatures, des diagrammes géométriques simplifiés et des grilles d'accords. Vous jouerez vos premières mélodies pop et classiques dès la première heure. Si vous le souhaitez, des notions théoriques sont introduites très progressivement dans les niveaux avancés."
    },
    {
      q: "De quel matériel ai-je besoin pour commencer ?",
      a: "Pour le piano, un simple clavier numérique de 61 touches minimum suffit largement. Pour la guitare, n'importe quelle guitare classique, acoustique folk ou électrique fera l'affaire. Pour le chant, aucun matériel n'est nécessaire. Enfin pour la production, un ordinateur équipé d'un logiciel de MAO d'entrée de gamme est requis."
    },
    {
      q: "L'abonnement est-il avec engagement ?",
      a: "Non, absolument aucun engagement ! Si vous choisissez la formule mensuelle, vous pouvez suspendre ou résilier votre abonnement en un seul clic directement depuis les paramètres de votre compte. L'accès reste disponible jusqu'à la fin de la période en cours."
    },
    {
      q: "Comment fonctionne la correction des devoirs ?",
      a: "C'est notre fonctionnalité phare ! Après avoir visionné une leçon, vous pouvez utiliser l'enregistreur audio de l'Espace Élève pour soumettre vos vocalises ou vos accords. Nos mentors écoutent vos enregistrements sous 48 heures et vous fournissent un commentaire écrit ultra constructif accompagné d'une note sur 20."
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    setFormSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 200);
  };

  return (
    <div id="faq-contact-view" className="py-12 bg-gray-50/50 min-h-screen text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            FAQ & Formulaire de Contact
          </h2>
          <p className="text-base text-gray-600">
            Une question sur les instruments ou la facturation ? Trouvez une réponse instantanée ou échangez directement avec notre équipe d'assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-xl font-bold text-gray-900 flex items-center space-x-2">
              <HelpCircle className="h-5.5 w-5.5 text-indigo-500" />
              <span>Questions fréquemment posées</span>
            </h3>

            <div className="space-y-3.5">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm transition"
                  >
                    <button
                      onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                      className="w-full flex justify-between items-center p-5 text-left font-bold text-sm text-gray-900 focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-gray-50 text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pitch About section */}
            <div className="bg-indigo-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-md">
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-indigo-700/40 blur-2xl" />
              <h4 className="font-display font-bold text-base flex items-center space-x-1.5">
                <Award className="h-5 w-5 text-amber-400" />
                <span>La mission d'Harmonia Academy</span>
              </h4>
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                Fondée en 2024 par un collectif de compositeurs et d'orthophonistes de la voix, Harmonia Academy est née d'un constat simple : l'enseignement académique de la musique décourage plus de 80% des amateurs en raison d'une rigidité théorique excessive. Notre mission est de remettre le plaisir du jeu au centre de la formation, tout en maintenant un standard d'excellence grâce aux outils technologiques modernes.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-display font-bold text-gray-900 text-lg flex items-center space-x-2">
                <Mail className="h-5 w-5 text-indigo-500" />
                <span>Envoyer un message</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Notre secrétariat pédagogique vous répond sous 24h ouvrées pour toute question d'orientation ou d'abonnement.
              </p>
            </div>

            {formSubmitted ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-150 p-6 text-center space-y-4 animate-fade-in">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-950">Message transmis avec succès !</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Merci pour votre envoi. Un conseiller pédagogique a pris en charge votre demande et vous recontactera par email très prochainement.
                  </p>
                </div>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 transition"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Votre nom</label>
                  <input
                    type="text"
                    required
                    placeholder="Jean Dupont"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Adresse email</label>
                  <input
                    type="email"
                    required
                    placeholder="jean.dupont@gmail.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Votre message</label>
                  <textarea
                    required
                    placeholder="Détaillez votre question ou instrument d'intérêt..."
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    className="w-full h-32 rounded-xl border border-gray-200 bg-white p-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-xs shadow-md transition text-center flex items-center justify-center space-x-1.5"
                >
                  <span>Transmettre ma demande</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}

            {/* Quick credentials details */}
            <div className="border-t border-gray-100 pt-5 space-y-3.5 text-xs text-gray-600">
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>+33 (0)1 45 89 22 10 (Lun-Ven 9h-18h)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>12 Rue de la Paix, 75002 Paris, France</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
