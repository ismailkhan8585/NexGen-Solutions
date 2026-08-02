'use client';

import { useState } from 'react';
import { useI18n } from '@/components/i18n-provider';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { GradientButton } from '@/components/ui/gradient-button';
import { Check } from 'lucide-react';

interface Plan {
  key: string;
  name: string | null;
  price: string | null;
  for: string | null;
  features: string[];
  popular: boolean;
}

const plans: Plan[] = [
  {
    key: 'starter',
    name: null,
    price: '$500 – $1,500',
    for: 'Small businesses & startups',
    features: [
      'Business website (5-10 pages)',
      'Mobile responsive',
      'Basic SEO setup',
      'Contact form',
      '1 month support',
    ],
    popular: false,
  },
  {
    key: 'professional',
    name: null,
    price: '$1,500 – $5,000',
    for: 'Growing businesses',
    features: [
      'Everything in Starter',
      'Custom web app / e-commerce',
      'Payment integration',
      'Admin dashboard',
      '3 months support',
      'Performance optimization',
    ],
    popular: true,
  },
  {
    key: 'enterprise',
    name: null,
    price: '$5,000 – $20,000',
    for: 'Large businesses',
    features: [
      'Everything in Professional',
      'Mobile app (iOS + Android)',
      'AI/ML features',
      'Multi-language support',
      '6 months support',
      'Dedicated project manager',
    ],
    popular: false,
  },
  {
    key: 'custom',
    name: null,
    price: null,
    for: 'Unique, complex projects',
    features: [
      'Full discovery call',
      'Custom architecture',
      'SaaS / Blockchain / AI',
      'Team augmentation',
      'CTO-as-a-Service',
      'Long-term partnership',
    ],
    popular: false,
  },
];

const monthlyPlans: Plan[] = [
  {
    key: 'marketing',
    name: 'Digital Marketing',
    price: '$400/month',
    for: null,
    features: ['SEO optimization', 'Google Ads management', 'Meta Ads', 'Content strategy', 'Monthly analytics report'],
    popular: false,
  },
  {
    key: 'support',
    name: 'Maintenance & Support',
    price: '$300/month',
    for: null,
    features: ['Bug fixes', 'Security updates', 'Performance monitoring', 'Content updates', 'Priority support'],
    popular: true,
  },
  {
    key: 'cloud',
    name: 'Cloud Management',
    price: '$500/month',
    for: null,
    features: ['Server monitoring', 'CI/CD pipeline', 'Auto-scaling', 'Backup & recovery', '24/7 uptime'],
    popular: false,
  },
  {
    key: 'consulting',
    name: 'IT Consulting',
    price: '$100/hour',
    for: null,
    features: ['Tech strategy', 'Architecture review', 'Code audit', 'Team training', 'Digital transformation'],
    popular: false,
  },
];

export function Pricing() {
  const { t } = useI18n();
  const [isMonthly, setIsMonthly] = useState(false);

  const activePlans = isMonthly ? monthlyPlans : plans;

  return (
    <section id="pricing" className="section-padding bg-surface-hover/50 relative">
      <div className="container-max relative z-10">
        <div className="text-center mb-12">
          <GradientBadge className="mb-4">{t('pricing.badge')}</GradientBadge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto mb-8">
            {t('pricing.subtitle')}
          </p>

          <div className="inline-flex items-center rounded-full border border-surface-border bg-surface-card p-0.5">
            <button
              onClick={() => setIsMonthly(false)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                !isMonthly
                  ? 'bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white'
                  : 'text-ink-secondary hover:text-white'
              }`}
            >
              {t('pricing.oneTimeToggle')}
            </button>
            <button
              onClick={() => setIsMonthly(true)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                isMonthly
                  ? 'bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white'
                  : 'text-ink-secondary hover:text-white'
              }`}
            >
              {t('pricing.monthlyToggle')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePlans.map((plan) => {
            const isPopular = plan.popular;
            const isCustom = plan.key === 'custom';
            const planName = plan.name ?? t(`pricing.${plan.key}`);

            return (
              <div
                key={plan.key}
                className={`relative rounded-2xl p-6 transition-all ${
                  isPopular
                    ? 'gradient-border scale-[1.02] lg:scale-105'
                    : 'bg-surface-card border border-surface-border hover:border-surface-borderHover'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white text-xs font-bold">
                      {t('pricing.popular')}
                    </span>
                  </div>
                )}

                <h3 className="font-display font-bold text-white text-xl mb-1">
                  {planName}
                </h3>
                <p className="text-ink-muted text-xs mb-4">
                  {plan.for ?? ''}
                </p>

                <div className="mb-6">
                  {plan.price ? (
                    <p className="font-display font-bold text-3xl text-white">
                      {plan.price}
                    </p>
                  ) : (
                    <p className="font-display font-bold text-2xl text-gold-400">
                      {t('pricing.getQuote')}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCustom ? (
                  <a href="#contact" className="block">
                    <button className="w-full rounded-xl bg-gold-500 text-black font-semibold py-3 hover:bg-gold-400 transition-all active:scale-95">
                      {t('pricing.getQuote')}
                    </button>
                  </a>
                ) : (
                  <a href="#contact" className="block">
                    <GradientButton className="w-full">
                      {isPopular ? t('pricing.startProject') : t('pricing.getStarted')}
                    </GradientButton>
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-ink-muted text-sm mt-8">
          {t('pricing.allUsd')}
        </p>
      </div>
    </section>
  );
}
