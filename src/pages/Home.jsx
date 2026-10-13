import { useState, useEffect } from 'react';
import { menuData } from '../data';
import '../index.css';

function Home({ onExploreMenu }) {
  const [activeTab, setActiveTab] = useState('Petit Déjeuner & Brunch');

  // Categories Structure
  const mainCategories = [
    {
      id: 'Petit Déjeuner & Brunch',
      label: 'Petit Déjeuner & Brunch',
      tagline: 'Commencez la journée du bon pied',
      subCategories: ['Formules Petit Déjeuner', 'Viennoiserie', 'Omelettes'],
    },
    {
      id: 'Cafés & Boissons',
      label: 'Cafés & Boissons',
      tagline: 'L\'art de la torréfaction et de la fraîcheur',
      subCategories: ['Cafés Chauds', 'Thés & Infusions', 'Chocolat Chaud ou Glacé', 'Café Glacé', 'Frappuccino', 'Mojito', 'Smoothie', 'Jus frais', 'Milk-shake', 'Eaux & Sodas'],
    },
    {
      id: 'Délices Sucrés',
      label: 'Délices Sucrés',
      tagline: 'Une signature sucrée inoubliable',
      subCategories: ['Crêpes sucrées', 'Pancake', 'Crêpes healthy (Protéinées)', 'Gaufre', 'Cheese Cake', 'Glace', 'Suppléments'],
    },
    {
      id: 'Délices Salés',
      label: 'Délices Salés',
      tagline: 'L\'élégance des saveurs salées',
      subCategories: ['Crêpes salées', 'Paninis'],
    }
  ];

  const activeMainCategory = mainCategories.find(c => c.id === activeTab);

  // Animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { rootMargin: '0px 0px -50px 0px' }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-header hero-menu">
        <div className="hero-content">
          <p className="subtitle">THE BOSS 33</p>
          <h1 className="title menu-title">
            NOTRE <span className="title-gold">MENU</span>
            <span className="title-cursive" style={{ display: 'block', marginTop: '10px' }}>L'excellence à chaque bouchée.</span>
          </h1>
          <p className="description" style={{ marginTop: '1.5rem', maxWidth: '380px' }}>
            Découvrez notre sélection rigoureuse pour vos petits déjeuners, cafés d'exception et créations gourmandes.
          </p>
          {onExploreMenu && (
            <div style={{ marginTop: '1.5rem' }}>
              <button 
                onClick={onExploreMenu}
                style={{
                  background: 'var(--accent-gold)',
                  color: '#0f1012',
                  border: 'none',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(212, 181, 142, 0.35)',
                  transition: 'all 0.3s ease'
                }}
              >
                Explorer la carte complète (117 délices) →
              </button>
            </div>
          )}
        </div>
        <div className="hero-right-deco">
          <div className="floating-text decorative-glow" style={{ fontSize: '3.5rem' }}>
            Good Food<br/>Good Mood
          </div>
        </div>
      </section>

      <div style={{
        position: 'relative',
        backgroundImage: 'linear-gradient(rgba(15, 16, 18, 0.92), rgba(15, 16, 18, 0.98)), url("https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        width: '100%',
        minHeight: '100vh'
      }}>
        <section id="menu-section" className="menu-page-content" style={{ paddingBottom: '8rem', paddingTop: '2rem' }}>
          
          {/* Sleek Professional Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '4rem',
            flexWrap: 'wrap'
          }}>
            {mainCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === cat.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  fontSize: '1.05rem',
                  fontWeight: activeTab === cat.id ? '600' : '400',
                  padding: '1rem 0.5rem',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'color 0.3s ease',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
              >
                {cat.label}
                {activeTab === cat.id && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--accent-gold)',
                    boxShadow: '0 -2px 10px rgba(212, 181, 142, 0.4)'
                  }}></div>
                )}
              </button>
            ))}
          </div>

          {/* Dynamic Sections Based on Active Tab */}
          <div className="menu-sections-container" style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '-2rem' }}>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontStyle: 'italic', 
                letterSpacing: '2px',
                fontSize: '0.9rem',
                textTransform: 'uppercase'
              }}>
                — {activeMainCategory.tagline} —
              </p>
            </div>

            {activeMainCategory.subCategories.map((subCatName, index) => {
              const items = menuData.filter((item) => item.category === subCatName);
              if (items.length === 0) return null;
              
              return (
                <div 
                  key={subCatName} 
                  className="animate-on-scroll"
                  style={{
                    opacity: 0,
                    transform: 'translateY(30px)',
                    transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Minimalist Section Header */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ 
                      fontSize: '1.6rem', 
                      fontWeight: '400', 
                      color: 'var(--text-primary)', 
                      letterSpacing: '1px',
                      fontFamily: "'Times New Roman', serif"
                    }}>
                      {subCatName}
                    </h2>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)', marginLeft: '1.5rem' }}></div>
                  </div>

                  {/* Professional List-Style Menu Grid */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
                    gap: '2rem 3rem' 
                  }}>
                    {items.map((item) => (
                      <div 
                        key={item.id} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                        }}
                        onMouseEnter={(e) => {
                          const img = e.currentTarget.querySelector('img');
                          if (img) img.style.transform = 'scale(1.05)';
                          const title = e.currentTarget.querySelector('.item-name');
                          if (title) title.style.color = 'var(--accent-gold)';
                        }}
                        onMouseLeave={(e) => {
                          const img = e.currentTarget.querySelector('img');
                          if (img) img.style.transform = 'scale(1)';
                          const title = e.currentTarget.querySelector('.item-name');
                          if (title) title.style.color = 'var(--text-primary)';
                        }}
                      >
                        {/* Square image with sharp borders for professional look */}
                        <div style={{ 
                          width: '70px', 
                          height: '70px', 
                          borderRadius: '4px', 
                          overflow: 'hidden', 
                          flexShrink: 0,
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            loading="lazy" 
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400';
                            }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} 
                          />
                        </div>
                        
                        <div style={{ marginLeft: '1.2rem', flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
                            <h3 
                              className="item-name"
                              style={{ 
                                fontSize: '1.05rem', 
                                fontWeight: 500, 
                                color: 'var(--text-primary)',
                                transition: 'color 0.3s ease',
                                margin: 0
                              }}
                            >
                              {item.name}
                            </h3>
                            <div style={{ 
                              flex: 1, 
                              borderBottom: '1px dashed rgba(255,255,255,0.15)', 
                              margin: '0 10px',
                              position: 'relative',
                              top: '-5px'
                            }}></div>
                            <span style={{ 
                              color: 'var(--accent-gold)', 
                              fontWeight: 600, 
                              fontSize: '1.05rem'
                            }}>
                              {item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p style={{ 
                              fontSize: '0.85rem', 
                              color: 'var(--text-secondary)', 
                              margin: '0.3rem 0 0 0',
                              fontFamily: 'var(--font-main)'
                            }}>
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
