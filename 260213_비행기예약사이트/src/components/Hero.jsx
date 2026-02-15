import React, { useState } from 'react';

const tripTypeLabels = {
    'round-trip': 'Round Trip',
    'one-way': 'One Way',
    'multi-city': 'Multi-City'
};

const Hero = () => {
    const [tripType, setTripType] = useState('round-trip');
    const [formData, setFormData] = useState({
        from: 'Seoul (ICN)',
        to: '',
        date: '',
        travelers: '1 Adult'
    });
    const [formError, setFormError] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.to.trim() || !formData.date) {
            setFormError('Please enter destination and date.');
            setSearchResult(null);
            return;
        }

        setFormError('');
        setSearchResult({
            ...formData,
            tripType
        });
    };

    return (
        <section id="hero" className="hero">
            <div className="container hero-content">
                <h1 className="hero-title">
                    Explore the World<br />
                    <span className="highlight">Beyond Limits</span>
                </h1>
                <p className="hero-subtitle">
                    Find and book your perfect flight to anywhere in the world with our premium service.
                </p>

                <div className="search-widget glass">
                    <div className="widget-tabs">
                        <button
                            type="button"
                            className={`tab ${tripType === 'round-trip' ? 'active' : ''}`}
                            onClick={() => setTripType('round-trip')}
                        >
                            Round Trip
                        </button>
                        <button
                            type="button"
                            className={`tab ${tripType === 'one-way' ? 'active' : ''}`}
                            onClick={() => setTripType('one-way')}
                        >
                            One Way
                        </button>
                        <button
                            type="button"
                            className={`tab ${tripType === 'multi-city' ? 'active' : ''}`}
                            onClick={() => setTripType('multi-city')}
                        >
                            Multi-City
                        </button>
                    </div>

                    <form className="flight-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="from">From</label>
                            <div className="input-with-icon">
                                <span className="icon">🛫</span>
                                <input
                                    id="from"
                                    name="from"
                                    type="text"
                                    placeholder="Seoul (ICN)"
                                    value={formData.from}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="to">To</label>
                            <div className="input-with-icon">
                                <span className="icon">🛬</span>
                                <input
                                    id="to"
                                    name="to"
                                    type="text"
                                    placeholder="Where to?"
                                    value={formData.to}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <div className="input-with-icon">
                                <span className="icon">📅</span>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="travelers">Travelers</label>
                            <div className="input-with-icon">
                                <span className="icon">👤</span>
                                <input
                                    id="travelers"
                                    name="travelers"
                                    type="text"
                                    placeholder="1 Adult"
                                    value={formData.travelers}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <button type="submit" className="search-btn">
                            Search Flights
                        </button>
                    </form>

                    {formError && <p className="form-error">{formError}</p>}

                    {searchResult && (
                        <div className="search-result" role="status" aria-live="polite">
                            <p className="result-title">Search ready</p>
                            <p>
                                {tripTypeLabels[searchResult.tripType]} · {searchResult.from} → {searchResult.to}
                            </p>
                            <p>
                                Date: {searchResult.date} · Travelers: {searchResult.travelers}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          padding-top: var(--header-height);
          display: flex;
          align-items: center;
          /* Fallback beautiful gradient since image gen failed */
          background: radial-gradient(circle at 10% 20%, rgb(239, 246, 255) 0%, rgb(219, 234, 254) 40%, rgb(191, 219, 254) 80%);
          overflow: hidden;
        }

        /* Ambient elements for visual interest */
        .hero::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -5%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          filter: blur(60px);
        }

        .hero::after {
          content: '';
          position: absolute;
          bottom: 10%;
          left: -10%;
          width: 40vw;
          height: 40vw;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          filter: blur(60px);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--text-dark);
          letter-spacing: -0.02em;
        }

        .highlight {
          background: linear-gradient(135deg, var(--primary-dark), var(--primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-light);
          max-width: 600px;
          margin-bottom: 3rem;
        }

        .search-widget {
          width: 100%;
          max-width: 1000px;
          padding: 2rem;
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.85);
        }

        .widget-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          padding-bottom: 1rem;
        }

        .tab {
          font-weight: 500;
          color: var(--text-light);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          transition: all 0.2s;
        }

        .tab:hover {
          background: rgba(14, 165, 233, 0.1);
          color: var(--primary);
        }

        .tab.active {
          background: var(--primary);
          color: white;
        }

        .flight-form {
          display: grid;
          grid-template-columns: 2fr 2fr 1.5fr 1.5fr auto;
          gap: 1rem;
          align-items: end;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-light);
          margin-bottom: 0.5rem;
          text-align: left;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .icon {
          position: absolute;
          left: 1rem;
          font-size: 1.2rem;
        }

        input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.2s;
          background: #f8fafc;
        }

        input:focus {
          outline: none;
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        .search-btn {
          background: var(--primary-dark);
          color: white;
          padding: 1rem 2rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.2s;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-btn:hover {
          background: #0369a1;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .form-error {
          margin-top: 1rem;
          color: #dc2626;
          font-size: 0.95rem;
          font-weight: 600;
          text-align: left;
        }

        .search-result {
          margin-top: 1rem;
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: var(--radius-md);
          padding: 1rem;
          color: #0f172a;
          text-align: left;
        }

        .result-title {
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        @media (max-width: 1024px) {
          .flight-form {
            grid-template-columns: 1fr 1fr;
          }
          .search-btn {
            grid-column: span 2;
          }
        }

        @media (max-width: 640px) {
          .flight-form {
            grid-template-columns: 1fr;
          }

          .search-btn {
            grid-column: span 1;
            min-height: 52px;
          }

          .widget-tabs {
            overflow-x: auto;
            scrollbar-width: none;
          }

          .widget-tabs::-webkit-scrollbar {
            display: none;
          }

          .tab {
            flex: 0 0 auto;
            white-space: nowrap;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
            margin-bottom: 2rem;
          }

          .search-widget {
            padding: 1.25rem;
          }
        }
      `}</style>
        </section>
    );
};

export default Hero;
