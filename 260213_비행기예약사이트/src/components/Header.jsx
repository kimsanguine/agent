import React from 'react';

const Header = () => {
    return (
        <header className="header glass">
            <div className="container header-content">
                <div className="logo">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="var(--primary-dark)" />
                    </svg>
                    <span className="logo-text">SkyWings</span>
                </div>

                <nav className="nav-menu">
                    <a href="#hero" className="nav-item active">Home</a>
                    <a href="#destinations" className="nav-item">Destinations</a>
                    <a href="#features" className="nav-item">Features</a>
                    <a href="#snake" className="nav-item">Snake</a>
                    <a href="#footer" className="nav-item">Contact</a>
                </nav>

                <div className="auth-buttons">
                    <button className="btn-text">Log In</button>
                    <button className="btn-primary">Sign Up</button>
                </div>
            </div>

            <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--header-height);
          z-index: 1000;
          border-bottom: 1px solid var(--glass-border);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--text-dark);
        }

        .logo-text {
          background: linear-gradient(135deg, var(--primary-dark), var(--primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-menu {
          display: none;
        }

        @media (min-width: 768px) {
          .nav-menu {
            display: flex;
            gap: 1.5rem;
          }
        }

        @media (max-width: 767px) {
          .auth-buttons {
            gap: 0.5rem;
          }

          .btn-text {
            display: none;
          }

          .btn-primary {
            padding: 0.5rem 0.9rem;
            font-size: 0.9rem;
          }

          .logo {
            font-size: 1.25rem;
          }
        }

        .nav-item {
          font-weight: 500;
          color: var(--text-dark);
          transition: color 0.2s;
          position: relative;
        }

        .nav-item:hover, .nav-item.active {
          color: var(--primary);
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-text {
          font-weight: 600;
          color: var(--text-dark);
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 0.6rem 1.25rem;
          border-radius: 2rem;
          font-weight: 600;
          transition: all 0.3s;
          box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);
        }

        .btn-primary:hover {
          background: var(--primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 6px 10px -1px rgba(14, 165, 233, 0.4);
        }
      `}</style>
        </header>
    );
};

export default Header;
