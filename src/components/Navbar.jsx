import '../index.css';
import logo from '../assets/logo.jpg';

function Navbar() {
  return (
    <header style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2.5rem 1rem 1rem 1rem',
      position: 'relative',
      zIndex: 50,
      textAlign: 'center'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          aria-label="THE BOSS 33"
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%'
          }}
        >
          <img 
            src={logo} 
            alt="THE BOSS 33 Logo" 
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '3px solid var(--accent-gold)',
              boxShadow: '0 0 30px rgba(212, 181, 142, 0.45)',
              display: 'block',
              margin: '0 auto',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(212, 181, 142, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 181, 142, 0.45)';
            }}
          />
        </a>
      </div>
    </header>
  );
}

export default Navbar;
