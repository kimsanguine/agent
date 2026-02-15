import React from 'react';

const Footer = () => {
    return (
        <footer id="footer" className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <div className="logo">SkyWings</div>
                    <p className="footer-text">
                        Making the world accessible, <br />one flight at a time.
                    </p>
                </div>

                <div className="footer-links">
                    <div className="link-group">
                        <h3>Company</h3>
                        <a href="#">About Us</a>
                        <a href="#">Careers</a>
                        <a href="#">Blog</a>
                        <a href="#">Press</a>
                    </div>
                    <div className="link-group">
                        <h3>Help</h3>
                        <a href="#">Support Center</a>
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Sitemap</a>
                    </div>
                    <div className="link-group">
                        <h3>Contact</h3>
                        <p>support@skywings.com</p>
                        <p>+1 (555) 123-4567</p>
                        <div className="social-links">
                            <span>Twitter</span>
                            <span>Insta</span>
                            <span>FB</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <div className="container">
                    &copy; {new Date().getFullYear()} SkyWings Inc. All rights reserved.
                </div>
            </div>

            <style jsx>{`
        .footer {
          background: #f8fafc;
          padding-top: 5rem;
          color: var(--text-dark);
          border-top: 1px solid #e2e8f0;
        }

        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .footer-brand .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary-dark);
          margin-bottom: 1rem;
        }

        .footer-text {
          color: var(--text-light);
          line-height: 1.6;
        }

        .footer-links {
          display: flex;
          gap: 4rem;
          flex-wrap: wrap;
        }

        .link-group h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .link-group a, .link-group p {
          display: block;
          color: var(--text-light);
          margin-bottom: 0.8rem;
          transition: color 0.2s;
        }

        .link-group a:hover {
          color: var(--primary);
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .copyright {
          border-top: 1px solid #e2e8f0;
          padding: 2rem 0;
          text-align: center;
          color: var(--text-light);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footer {
            padding-top: 4rem;
          }

          .footer-content {
            margin-bottom: 2.5rem;
          }

          .footer-links {
            gap: 2rem;
            width: 100%;
            justify-content: space-between;
          }
        }

        @media (max-width: 640px) {
          .footer-links {
            flex-direction: column;
            gap: 1.5rem;
          }

          .social-links {
            flex-wrap: wrap;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
