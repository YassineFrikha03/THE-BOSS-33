import '../index.css';
import logo from '../assets/logo.jpg';

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-overlay"></div>
      <div className="footer-content" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem', padding: '3rem 1.5rem' }}>

        {/* Logo and About Column */}
        <div className="footer-col footer-col-about" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="footer-logo" style={{ marginBottom: '1rem' }}>
            <img 
              src={logo} 
              alt="THE BOSS 33 Logo" 
              style={{
                width: '75px',
                height: '75px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-gold)',
                boxShadow: '0 0 15px rgba(212, 181, 142, 0.4)'
              }} 
            />
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '320px' }}>
            THE BOSS 33 — L'excellence du café et des délices sucrés et salés dans une ambiance chaleureuse et raffinée.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.2rem' }}>
            <a 
              href="https://www.facebook.com/p/Coffee-The-boss-33-61560214928154" 
              aria-label="Facebook" 
              target="_blank" 
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)',
                transition: 'all 0.3s ease'
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10V22h4v-8.5z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/theboss33coffeetn" 
              aria-label="Instagram" 
              target="_blank" 
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)',
                transition: 'all 0.3s ease'
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Location & Contact Column */}
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', marginBottom: '1.2rem', fontWeight: 600 }}>Adresse & Horaires</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2" width="18" height="18">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Riadh El Andalous - Ariana, Tunisie</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2" width="18" height="18">
                <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Lun - Ven : 07h00 - 23h00 | Sam - Dim : 08h00 - 00h00</span>
            </div>
          </div>
        </div>

        {/* Experience & Quality Badge Column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', marginBottom: '0.8rem', fontWeight: 600 }}>THE BOSS 33</h4>
          <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            « La perfection du café rencontre l'art des délices. »
          </p>
          <div style={{
            border: '1px solid var(--accent-gold)',
            color: 'var(--accent-gold)',
            padding: '0.4rem 1.2rem',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 600,
            background: 'rgba(212, 181, 142, 0.08)'
          }}>
            117 Délices Faits Maison
          </div>
        </div>

      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '1.5rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.82rem'
      }}>
        <p>&copy; {new Date().getFullYear()} THE BOSS 33. Tous droits réservés • Riadh El Andalous</p>
      </div>
    </footer>
  );
}

export default Footer;
