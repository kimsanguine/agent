import React from 'react';

const features = [
    {
        id: 1,
        title: 'Best Price Guarantee',
        description: 'If you find a better fare within 24 hours, we match it with no extra hassle.',
        icon: 'price'
    },
    {
        id: 2,
        title: 'Flexible Booking',
        description: 'Change plans easily with flexible date options and clear fare conditions.',
        icon: 'flexible'
    },
    {
        id: 3,
        title: '24/7 Customer Support',
        description: 'Our travel specialists are available around the clock for urgent changes.',
        icon: 'support'
    }
];

const renderIcon = (icon) => {
    if (icon === 'price') {
        return (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L4 5V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V5L12 2Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M9 12.5L11 14.5L15 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    if (icon === 'flexible') {
        return (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 3V7M16 3V7M3 10H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M8 14H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12V11C4 7.13 7.13 4 11 4H13C16.87 4 20 7.13 20 11V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <rect x="2" y="12" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <rect x="18" y="12" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M6 18C6 19.66 7.34 21 9 21H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
};

const Features = () => {
    return (
        <section id="features" className="features">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Why Travelers Choose SkyWings</h2>
                    <p className="section-subtitle">Everything you need for a smoother booking experience</p>
                </div>

                <div className="features-grid">
                    {features.map((feature) => (
                        <article key={feature.id} className="feature-card">
                            <div className="feature-icon">{renderIcon(feature.icon)}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </article>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .features {
          padding: 6rem 0;
          background: #f8fafc;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .section-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: var(--text-light);
          max-width: 620px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
        }

        .feature-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-lg);
          padding: 2rem;
          transition: all 0.25s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: #bae6fd;
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          background: #e0f2fe;
          color: var(--primary-dark);
        }

        .feature-icon svg {
          width: 28px;
          height: 28px;
        }

        .feature-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.65rem;
        }

        .feature-description {
          color: var(--text-light);
          line-height: 1.65;
        }

        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .features {
            padding: 5rem 0;
          }

          .section-title {
            font-size: 1.85rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </section>
    );
};

export default Features;
