import '../index.css';

function About() {
  return (
    <main>
      <section className="menu-section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>À propos de THE BOSS</h1>
            <p className="description" style={{ margin: '0 auto', maxWidth: '600px' }}>
                L'art du café, la passion du goût et une ambiance inégalée.
            </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div className="card-image-container" style={{ height: '400px', borderRadius: '16px' }}>
                 <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Intérieur du café" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div style={{ padding: '1rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>Notre Histoire</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.8' }}>
                    Situé au cœur de Riadh El Andalous - Ariana, THE BOSS 33 est né de la passion pour le café de spécialité. Nous croyons qu'un bon café a le pouvoir de transformer une journée ordinaire en un moment exceptionnel.
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
                    Chaque grain que nous utilisons est sélectionné avec soin, et chaque tasse est préparée par nos baristas experts pour vous offrir une expérience gustative parfaite. Mais THE BOSS 33, c'est bien plus qu'un café, c'est un lieu de rencontre, de travail et de détente.
                </p>

                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Horaires d'ouverture</h3>
                <ul style={{ color: 'var(--text-secondary)', listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}><span>Lundi - Vendredi</span> <span>07:00 - 23:00</span></li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}><span>Samedi - Dimanche</span> <span>08:00 - 00:00</span></li>
                </ul>
            </div>
        </div>
      </section>
    </main>
  );
}

export default About;
