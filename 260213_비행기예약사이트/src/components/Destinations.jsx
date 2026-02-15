import React from 'react';

const destinations = [
    {
        id: 1,
        city: 'Paris',
        country: 'France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2673&auto=format&fit=crop',
        price: '$850'
    },
    {
        id: 2,
        city: 'Tokyo',
        country: 'Japan',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2694&auto=format&fit=crop',
        price: '$920'
    },
    {
        id: 3,
        city: 'New York',
        country: 'USA',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?q=80&w=2670&auto=format&fit=crop',
        price: '$450'
    },
    {
        id: 4,
        city: 'Santorini',
        country: 'Greece',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2574&auto=format&fit=crop',
        price: '$1200'
    }
];

const Destinations = () => {
    return (
        <section id="destinations" className="destinations">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Popular Destinations</h2>
                    <p className="section-subtitle">Discover the most visited places this season</p>
                </div>

                <div className="grid">
                    {destinations.map((dest) => (
                        <div key={dest.id} className="card">
                            <div className="card-image-wrapper">
                                <img src={dest.image} alt={dest.city} className="card-image" />
                                <div className="price-tag">from {dest.price}</div>
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{dest.city}</h3>
                                <p className="card-subtitle">{dest.country}</p>
                                <div className="card-footer">
                                    <span className="rating">★ 4.9</span>
                                    <button className="book-link">Book Now →</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .destinations {
          padding: 6rem 0;
          background: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          color: var(--text-light);
          font-size: 1.125rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .card {
          background: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #f1f5f9;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }

        .card-image-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .card:hover .card-image {
          transform: scale(1.05);
        }

        .price-tag {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.95);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-weight: 700;
          color: var(--primary-dark);
          box-shadow: var(--shadow-sm);
        }

        .card-content {
          padding: 1.5rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .card-subtitle {
          color: var(--text-light);
          margin-bottom: 1rem;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
        }

        .rating {
          font-weight: 600;
          color: #fbbf24;
        }

        .book-link {
          color: var(--primary);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .book-link:hover {
          color: var(--primary-dark);
        }

        @media (max-width: 640px) {
          .destinations {
            padding: 5rem 0;
          }

          .section-title {
            font-size: 1.85rem;
          }

          .section-header {
            margin-bottom: 2.5rem;
          }
        }
      `}</style>
        </section>
    );
};

export default Destinations;
