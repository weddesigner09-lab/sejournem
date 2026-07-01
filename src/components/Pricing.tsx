/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check, ShieldCheck, Sparkles, HelpCircle, ArrowRight, DollarSign, CreditCard, X } from 'lucide-react';

interface PricingProps {
  onUpgradeToPremium: () => void;
  isPremium: boolean;
  onOpenCatalog: () => void;
  showToast?: (message: string, type?: 'success' | 'info') => void;
}

export default function Pricing({ onUpgradeToPremium, isPremium, onOpenCatalog, showToast }: PricingProps) {
  const toast = showToast || ((message: string) => alert(message));
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [selectedPlanName, setSelectedPlanName] = useState<string>('');
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // Form states
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');

  const plans = [
    {
      id: 'plan-unit',
      name: 'Paiement à l\'Unité',
      price: '35€ - 79€',
      period: 'par cours',
      desc: 'Idéal si vous souhaitez vous focaliser sur un seul instrument sans récurrence.',
      features: [
        'Accès à vie au cours sélectionné',
        'Fichiers PDF et partitions inclus',
        'Pistes d\'accompagnements MP3',
        'Soumission de 1 devoir pour correction',
        'Garantie de remboursement 14 jours'
      ],
      cta: 'Parcourir le catalogue',
      popular: false,
      color: 'border-gray-200 bg-white text-gray-900'
    },
    {
      id: 'plan-sub',
      name: 'Abonnement Illimité',
      price: '19€',
      period: 'par mois (facturé annuellement)',
      desc: 'Le choix préféré des élèves sérieux pour maîtriser l\'harmonie globale.',
      features: [
        'Accès illimité à TOUTES les formations',
        'Accès prioritaire aux nouvelles vidéos',
        'Devoirs illimités corrigés par les mentors',
        'Sessions live & Masterclasses hebdomadaires',
        'Accès au Slack/Discord privé de la commu',
        'Certificats officiels de réussite'
      ],
      cta: 'Devenir Membre Premium',
      popular: true,
      color: 'border-indigo-500 bg-gradient-to-b from-indigo-50/20 to-white shadow-lg'
    },
    {
      id: 'plan-coaching',
      name: 'Coaching Premium 1-to-1',
      price: '89€',
      period: 'par séance de 45 minutes',
      desc: 'Un accompagnement sur-mesure en direct visio avec un mentor d\'élite.',
      features: [
        'Diagnostic vocal ou instrumental personnalisé',
        '45 minutes de cours particulier en visio',
        'Plan d\'entraînement sur-mesure rédigé',
        'Suivi de progression prioritaire sur 1 mois',
        'Échange de messages directs sous 24h'
      ],
      cta: 'Réserver une séance',
      popular: false,
      color: 'border-gray-200 bg-white text-gray-900'
    }
  ];

  const handleOpenCheckout = (planName: string, planPrice: string) => {
    setSelectedPlanName(planName);
    setSelectedPlanPrice(planPrice);
    setShowCheckout(true);
    setPaymentSuccess(false);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate transaction delay
    setPaymentSuccess(true);
    setTimeout(() => {
      onUpgradeToPremium();
      setShowCheckout(false);
      setPaymentSuccess(false);
      toast('Félicitations ! Votre paiement a été validé. Vous êtes désormais Membre Premium de l\'Académie !', 'success');
    }, 1500);
  };

  return (
    <div id="pricing-view" className="py-12 bg-gray-50/50 min-h-screen text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Offres flexibles adaptées à votre progression</span>
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Des tarifs simples, transparents <br />et sans mauvaise surprise
          </h2>
          <p className="text-base text-gray-600">
            Commencez avec l'accès gratuit par défaut, achetez un cours individuel ou rejoignez l'abonnement illimité pour débloquer votre plein potentiel.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              id={`pricing-card-${plan.id}`}
              className={`relative rounded-3xl border p-8 flex flex-col justify-between transition-transform hover:scale-101 duration-300 ${plan.color}`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 shadow-md shadow-indigo-150">
                  RECOMMANDÉ • POPULAIRE
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed min-h-[40px]">{plan.desc}</p>
                </div>

                <div className="flex items-baseline text-gray-900">
                  <span className="font-display text-4xl font-black tracking-tight font-mono">{plan.price}</span>
                  <span className="text-xs font-semibold text-gray-400 ml-1.5 font-mono">{plan.period}</span>
                </div>

                <ul className="space-y-3.5 border-t border-gray-100 pt-6">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs text-gray-600 leading-normal">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                {plan.id === 'plan-unit' ? (
                  <button
                    id="pricing-btn-unit"
                    onClick={onOpenCatalog}
                    className="w-full rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 text-xs transition text-center"
                  >
                    {plan.cta}
                  </button>
                ) : plan.id === 'plan-sub' ? (
                  isPremium ? (
                    <div className="w-full text-center rounded-xl bg-emerald-50 text-emerald-800 font-bold py-3 text-xs border border-emerald-150">
                      Vous êtes membre Premium ! ✓
                    </div>
                  ) : (
                    <button
                      id="pricing-btn-sub"
                      onClick={() => handleOpenCheckout(plan.name, '19€ / mois')}
                      className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-xs shadow-lg shadow-indigo-100 transition text-center"
                    >
                      {plan.cta}
                    </button>
                  )
                ) : (
                  <button
                    id="pricing-btn-coaching"
                    onClick={() => handleOpenCheckout(plan.name, '89€')}
                    className="w-full rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 text-xs transition text-center"
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Security / FAQ strip */}
        <div className="bg-white rounded-3xl border border-gray-150 p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4 max-w-4xl mx-auto shadow-sm">
          <div className="flex items-center space-x-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Paiements 100% sécurisés</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Transactions sécurisées par protocole SSL chiffré (Stripe, PayPal).</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-mono">
            Aucun engagement • Annulation de l'abonnement en 1 clic
          </p>
        </div>

        {/* ----------------- INTERACTIVE checkout DIALOG ----------------- */}
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 text-left border border-gray-100 relative">
              <button
                onClick={() => setShowCheckout(false)}
                className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Checkout header */}
              <div className="mb-6 border-b border-gray-100 pb-3">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-mono flex items-center space-x-1">
                  <CreditCard className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Passerelle de paiement sécurisée</span>
                </span>
                <h3 className="font-display text-lg font-bold text-gray-900 mt-1">
                  Souscription : {selectedPlanName}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Montant à régler : <span className="font-bold text-indigo-600 font-mono">{selectedPlanPrice}</span>
                </p>
              </div>

              {paymentSuccess ? (
                // SUCCESS STATE
                <div className="text-center py-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto animate-bounce">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Traitement de la transaction...</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Veuillez ne pas fermer cette fenêtre.</p>
                  </div>
                </div>
              ) : (
                // FORM STATE
                <form onSubmit={handleSimulatePayment} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Nom sur la carte</label>
                    <input
                      type="text"
                      required
                      placeholder="M. Jean Dupont"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Numéro de carte bancaire</label>
                    <div className="relative">
                      <CreditCard className="absolute top-3.5 left-3.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => {
                          // basic spacing formatter
                          const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                          const matches = v.match(/\d{4,16}/g);
                          const match = (matches && matches[0]) || '';
                          const parts = [];
                          for (let i = 0, len = match.length; i < len; i += 4) {
                            parts.push(match.substring(i, i + 4));
                          }
                          if (parts.length > 0) {
                            setCardNumber(parts.join(' '));
                          } else {
                            setCardNumber(v);
                          }
                        }}
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Expiration (MM/AA)</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => {
                          let v = e.target.value.replace(/[^0-9]/g, '');
                          if (v.length >= 2) {
                            v = v.substring(0, 2) + '/' + v.substring(2, 4);
                          }
                          setCardExpiry(v);
                        }}
                        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Cryptogramme (CVC)</label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        placeholder="***"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-xs transition text-center flex items-center justify-center space-x-1.5"
                  >
                    <span>Valider la transaction sécurisée ({selectedPlanPrice})</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
