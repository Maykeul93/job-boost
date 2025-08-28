import Link from 'next/link';
import { 
  DocumentTextIcon, 
  EnvelopeIcon, 
  BriefcaseIcon,
  SparklesIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Générateur de CV',
    description: 'Templates modernes et personnalisables, optimisés ATS',
    icon: DocumentTextIcon,
    href: '/resume'
  },
  {
    name: 'Lettres de motivation',
    description: 'Génération automatique adaptée à chaque offre',
    icon: EnvelopeIcon,
    href: '/cover-letters'
  },
  {
    name: 'Suivi de candidatures',
    description: 'Organisez et suivez vos candidatures efficacement',
    icon: BriefcaseIcon,
    href: '/applications'
  }
];

const benefits = [
  'Templates professionnels et modernes',
  'Optimisation ATS pour plus de visibilité',
  'Export PDF haute qualité',
  'Sauvegarde et historique des versions',
  'Suggestions de mots-clés intelligentes',
  'Interface intuitive et responsive'
];

const pricing = [
  {
    name: 'Gratuit',
    price: '0€',
    description: 'Parfait pour commencer',
    features: [
      '1 modèle de CV basique',
      '1 lettre de motivation',
      'Export PDF avec filigrane',
      'Suivi simple des candidatures'
    ],
    cta: 'Commencer gratuitement',
    popular: false
  },
  {
    name: 'Premium',
    price: '7,99€',
    period: '/mois',
    description: 'Pour les professionnels sérieux',
    features: [
      'Tous les modèles premium',
      'Exports PDF illimités',
      'Score ATS avancé',
      'Sauvegardes multiples',
      'Analyses détaillées'
    ],
    cta: 'Essayer Premium',
    popular: true
  }
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <SparklesIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                JobBoost
              </h1>
            </div>
            <p className="text-lg leading-8 text-gray-600 mb-8">
              Démarquez-vous rapidement avec des CV et lettres de motivation 
              <span className="font-semibold text-blue-600"> optimisés ATS</span> et un 
              <span className="font-semibold text-purple-600"> coaching intégré</span>
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <Link
                href="/resume"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Créer mon CV
              </Link>
              <Link
                href="/cover-letters"
                className="text-lg font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
              >
                Voir les exemples <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Tout-en-un</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tout ce dont vous avez besoin pour réussir
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            JobBoost combine la puissance d'un générateur de CV professionnel avec des outils 
            de coaching pour maximiser vos chances de décrocher l'emploi de vos rêves.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <Link
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      En savoir plus <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Benefits section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Pourquoi JobBoost ?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            La différence qui fait la différence
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircleIcon className="h-6 w-6 text-green-500 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Tarification</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choisissez votre plan
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Commencez gratuitement et passez au niveau supérieur quand vous êtes prêt
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 sm:max-w-none sm:grid-cols-2 lg:max-w-4xl">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                plan.popular ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 text-sm font-medium text-white text-center">
                  <StarIcon className="inline h-4 w-4 mr-1" />
                  Populaire
                </div>
              )}
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">{plan.name}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{plan.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm font-semibold leading-6 text-gray-600">{plan.period}</span>
                  )}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckCircleIcon className="h-6 w-5 flex-none text-green-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={plan.name === 'Gratuit' ? '/resume' : '/auth'}
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100 focus-visible:outline-gray-600'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Prêt à booster votre carrière ?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Rejoignez des milliers de professionnels qui ont déjà transformé leur CV 
            et décroché l'emploi de leurs rêves avec JobBoost.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/resume"
              className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              Commencer maintenant
            </Link>
            <Link
              href="/cover-letters"
              className="text-lg font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
            >
              Voir les exemples <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
