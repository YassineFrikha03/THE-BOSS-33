import { useState, useEffect, useMemo } from 'react';
import { menuData } from '../data';
import logo from '../assets/logo.jpg';
import '../index.css';

function Menu() {
  const [activeTab, setActiveTab] = useState('Délices Sucrés');
  const [activeSubCategory, setActiveSubCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Categories Structure - Covers ALL 22 subcategories & 117 items
  const mainCategories = [
    {
      id: 'Petit Déjeuner & Brunch',
      label: 'Petit Déjeuner',
      shortLabel: 'Petit Déj',
      tagline: 'Commencez la journée avec nos formules et douceurs',
      subCategories: ['Formules Petit Déjeuner', 'Viennoiserie', 'Omelettes'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        </svg>
      )
    },
    {
      id: 'Cafés & Boissons',
      label: 'Cafés & Boissons',
      shortLabel: 'Boissons',
      tagline: 'Fraîcheur, cafés d\'exception et saveurs à chaque gorgée',
      subCategories: [
        'Cafés Chauds',
        'Thés & Infusions',
        'Café Glacé',
        'Frappuccino',
        'Chocolat Chaud ou Glacé',
        'Milk-shake',
        'Mojito',
        'Smoothie',
        'Jus frais',
        'Eaux & Sodas'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
          <line x1="6" y1="1" x2="6" y2="4"/>
          <line x1="10" y1="1" x2="10" y2="4"/>
        </svg>
      )
    },
    {
      id: 'Délices Sucrés',
      label: 'Délices Sucrés',
      shortLabel: 'Sucré',
      tagline: 'Une touche de douceur gourmande pour égayer votre journée',
      subCategories: [
        'Crêpes sucrées',
        'Pancake',
        'Crêpes healthy (Protéinées)',
        'Gaufre',
        'Cheese Cake',
        'Glace',
        'Suppléments'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      id: 'Délices Salés',
      label: 'Délices Salés',
      shortLabel: 'Salé',
      tagline: 'Pour une faim gourmande, croustillante et savoureuse',
      subCategories: ['Crêpes salées', 'Paninis'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      )
    }
  ];

  const activeMainCategory = mainCategories.find(c => c.id === activeTab) || mainCategories[0];

  // Reset subcategory filter when changing main tab
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActiveSubCategory('ALL');
  };

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    
    // When searching, search across all items
    if (query) {
      return menuData.filter(item => 
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        item.category.toLowerCase().includes(query)
      );
    }

    // Filter by active tab's subcategories
    const relevantSubCats = activeSubCategory === 'ALL' 
      ? activeMainCategory.subCategories 
      : [activeSubCategory];

    return menuData.filter(item => relevantSubCats.includes(item.category));
  }, [searchQuery, activeTab, activeSubCategory, activeMainCategory]);

  // Group filtered items by subcategory for clean display
  const groupedSubCategories = useMemo(() => {
    const groups = {};
    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  // Helper for item badge
  const getItemBadge = (item) => {
    const nameLower = item.name.toLowerCase();
    if (nameLower.includes('the boss')) {
      return { text: '★ SIGNATURE', color: '#d4b58e', bg: 'rgba(212, 181, 142, 0.18)' };
    }
    if (item.category.includes('healthy') || nameLower.includes('healthy')) {
      return { text: '🌿 HEALTHY', color: '#10b981', bg: 'rgba(16, 185, 129, 0.18)' };
    }
    if (nameLower.includes('nutella') || nameLower.includes('kinder') || nameLower.includes('ferrero') || nameLower.includes('spéculos')) {
      return { text: '⭐ POPULAIRE', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.18)' };
    }
    return null;
  };

  // Close modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
      
      {/* Unified Top Banner grouping Navbar (centered logo) & Hero Header with theme coffee photo */}
      <header className="unified-header-banner">
        {/* Centered Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.2rem' }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            aria-label="THE BOSS 33"
            style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}
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
                boxShadow: '0 0 35px rgba(212, 181, 142, 0.5), 0 10px 25px rgba(0,0,0,0.7)',
                display: 'block',
                margin: '0 auto',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.boxShadow = '0 0 45px rgba(212, 181, 142, 0.75)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(212, 181, 142, 0.5), 0 10px 25px rgba(0,0,0,0.7)';
              }}
            />
          </a>
        </div>

        {/* Hero Title & Subtitle */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className="subtitle" style={{ letterSpacing: '4px', color: 'var(--accent-gold)', marginBottom: '0.5rem', fontWeight: 600 }}>
            THE BOSS 33 • CAFÉ & DÉLICES
          </p>
          <h1 className="title" style={{
            fontSize: 'clamp(2.4rem, 6.5vw, 4rem)',
            fontWeight: 800,
            justifyContent: 'center',
            marginBottom: '0.3rem',
            lineHeight: 1.1,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)'
          }}>
            NOTRE <span className="title-gold">MENU</span>
          </h1>
          <span className="title-cursive" style={{
            fontSize: 'clamp(1.9rem, 5vw, 2.8rem)',
            color: 'var(--accent-gold)',
            display: 'block',
            lineHeight: 1.2,
            marginBottom: '0.8rem',
            textShadow: '0 2px 15px rgba(0,0,0,0.6)'
          }}>
            Des saveurs authentiques, un moment unique.
          </span>
          <p style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            lineHeight: '1.6',
            margin: '0 auto',
            textShadow: '0 2px 10px rgba(0,0,0,0.7)'
          }}>
            117 spécialités artisanales préparées avec passion : cafés d'exception, délices sucrés et créations salées.
          </p>
        </div>
      </header>

      {/* Menu Content Container with the initial background */}
      <div style={{
        position: 'relative',
        backgroundImage: 'linear-gradient(rgba(15, 16, 18, 0.92), rgba(15, 16, 18, 0.98)), url("https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        width: '100%',
        minHeight: '100vh',
        paddingTop: '2.5rem',
        paddingBottom: '5rem'
      }}>
        <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1rem' }}>
          
          {/* Search Input Bar */}
        <div style={{
          margin: '0 auto 2rem auto',
          maxWidth: '640px',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(22, 24, 27, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212, 181, 142, 0.3)',
            borderRadius: '50px',
            padding: '0.5rem 1rem',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2" width="18" height="18" style={{ flexShrink: 0, marginRight: '0.6rem' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit (Nutella, Mojito, Omelette...)"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                fontFamily: 'inherit',
                minWidth: 0
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  marginLeft: '0.4rem',
                  flexShrink: 0
                }}
                title="Effacer"
              >
                ✕
              </button>
            )}
            <span style={{
              fontSize: '0.78rem',
              color: 'var(--accent-gold)',
              background: 'rgba(212, 181, 142, 0.12)',
              padding: '0.25rem 0.65rem',
              borderRadius: '20px',
              marginLeft: '0.6rem',
              whiteSpace: 'nowrap',
              fontWeight: '600',
              flexShrink: 0
            }}>
              {filteredItems.length} {filteredItems.length > 1 ? 'articles' : 'article'}
            </span>
          </div>
        </div>

        {/* Category Tabs (hidden during active search) */}
        {!searchQuery && (
          <>
            {/* Main Tabs: responsive grid (2x2 on mobile, 4 in line on tablet/desktop) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.6rem',
              marginBottom: '1.2rem'
            }}>
              {mainCategories.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.85rem 0.8rem',
                      borderRadius: '12px',
                      border: isActive ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isActive 
                        ? 'linear-gradient(135deg, rgba(212, 181, 142, 0.95), rgba(184, 150, 107, 0.95))' 
                        : 'rgba(22, 24, 27, 0.75)',
                      color: isActive ? '#0f1012' : 'var(--text-primary)',
                      fontWeight: isActive ? '700' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 8px 20px rgba(212, 181, 142, 0.25)' : 'none',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>{cat.icon}</span>
                    <span style={{ fontSize: 'clamp(0.82rem, 2.2vw, 0.92rem)', whiteSpace: 'nowrap' }}>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-category Quick Filter Chips */}
            <div style={{
              display: 'flex',
              gap: '0.45rem',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: '0.6rem',
              marginBottom: '1.8rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
              <button
                onClick={() => setActiveSubCategory('ALL')}
                style={{
                  padding: '0.4rem 0.9rem',
                  borderRadius: '30px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  border: activeSubCategory === 'ALL' ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.06)',
                  background: activeSubCategory === 'ALL' ? 'var(--accent-gold)' : 'rgba(22, 24, 27, 0.6)',
                  color: activeSubCategory === 'ALL' ? '#0f1012' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                Tout ({activeMainCategory.subCategories.reduce((acc, cat) => acc + (menuData.filter(i => i.category === cat).length), 0)})
              </button>
              {activeMainCategory.subCategories.map(subCat => {
                const count = menuData.filter(i => i.category === subCat).length;
                if (count === 0) return null;
                const isSelected = activeSubCategory === subCat;
                return (
                  <button
                    key={subCat}
                    onClick={() => setActiveSubCategory(subCat)}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '30px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      border: isSelected ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.06)',
                      background: isSelected ? 'rgba(212, 181, 142, 0.2)' : 'rgba(22, 24, 27, 0.6)',
                      color: isSelected ? 'var(--accent-gold)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {subCat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Tagline */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', letterSpacing: '1px', fontSize: '0.9rem' }}>
                — {activeMainCategory.tagline} —
              </p>
            </div>
          </>
        )}

        {/* Search Results Header */}
        {searchQuery && (
          <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Résultats pour « <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{searchQuery}</span> » : {filteredItems.length} délice(s)
            </p>
          </div>
        )}

        {/* Items Grouped by Subcategory */}
        {Object.keys(groupedSubCategories).length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            background: 'rgba(22, 24, 27, 0.5)',
            borderRadius: '16px',
            border: '1px dashed rgba(255,255,255,0.1)'
          }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Aucun délice ne correspond à votre recherche.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '8px',
                background: 'var(--accent-gold)',
                color: '#0f1012',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Afficher toute la carte
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.8rem' }}>
            {Object.entries(groupedSubCategories).map(([subCatName, items]) => (
              <div key={subCatName}>
                
                {/* Section Header */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.3rem', gap: '0.8rem' }}>
                  <h2 style={{
                    fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                    whiteSpace: 'nowrap'
                  }}>
                    {subCatName}
                  </h2>
                  <span style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    background: 'rgba(255,255,255,0.06)',
                    padding: '0.15rem 0.55rem',
                    borderRadius: '12px'
                  }}>
                    {items.length}
                  </span>
                  <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(212, 181, 142, 0.4) 0%, rgba(212, 181, 142, 0) 100%)'
                  }}></div>
                </div>

                {/* Cards Grid: fully responsive (1 col on small phones, 2-3 on tablet, 3-4 on desktop) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                  gap: '1rem'
                }}>
                  {items.map((item) => {
                    const badge = getItemBadge(item);
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedProduct(item)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: 'rgba(22, 24, 27, 0.72)',
                          backdropFilter: 'blur(10px)',
                          padding: '0.85rem',
                          borderRadius: '14px',
                          border: '1px solid rgba(255,255,255,0.06)',
                          transition: 'all 0.25s ease',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.background = 'rgba(31, 33, 37, 0.9)';
                          e.currentTarget.style.borderColor = 'rgba(212, 181, 142, 0.4)';
                          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.background = 'rgba(22, 24, 27, 0.72)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {/* Image Thumbnail with zoom & fallback */}
                        <div style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          flexShrink: 0,
                          position: 'relative',
                          background: '#1a1d21',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.3)'
                        }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400';
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.4s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          />
                        </div>

                        {/* Product Info */}
                        <div style={{ marginLeft: '1rem', flex: 1, minWidth: 0 }}>
                          {badge && (
                            <span style={{
                              display: 'inline-block',
                              fontSize: '0.62rem',
                              fontWeight: '700',
                              letterSpacing: '0.4px',
                              color: badge.color,
                              background: badge.bg,
                              padding: '0.12rem 0.45rem',
                              borderRadius: '4px',
                              marginBottom: '0.2rem'
                            }}>
                              {badge.text}
                            </span>
                          )}
                          <h3 style={{
                            fontSize: '0.98rem',
                            fontWeight: 600,
                            marginBottom: '0.2rem',
                            color: 'var(--text-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }} title={item.name}>
                            {item.name}
                          </h3>

                          {item.description ? (
                            <p style={{
                              fontSize: '0.78rem',
                              color: 'var(--text-secondary)',
                              margin: '0 0 0.4rem 0',
                              lineHeight: '1.3',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }} title={item.description}>
                              {item.description}
                            </p>
                          ) : (
                            <p style={{
                              fontSize: '0.74rem',
                              color: 'rgba(255,255,255,0.35)',
                              margin: '0 0 0.4rem 0'
                            }}>
                              {item.category}
                            </p>
                          )}

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{
                              color: '#0f1012',
                              background: 'var(--accent-gold)',
                              padding: '0.2rem 0.65rem',
                              borderRadius: '16px',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              boxShadow: '0 2px 8px rgba(212, 181, 142, 0.25)'
                            }}>
                              {item.price}
                            </span>
                            <span style={{
                              fontSize: '0.7rem',
                              color: 'var(--accent-gold)',
                              opacity: 0.8
                            }}>
                              Voir →
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10, 11, 13, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#16181b',
              border: '1px solid rgba(212, 181, 142, 0.35)',
              borderRadius: '20px',
              maxWidth: '440px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.65)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                fontSize: '1rem',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>

            {/* Modal Image */}
            <div style={{ height: '230px', width: '100%', overflow: 'hidden', position: 'relative' }}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600';
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '70px',
                background: 'linear-gradient(to top, #16181b, transparent)'
              }}></div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--accent-gold)',
                  fontWeight: 600
                }}>
                  {selectedProduct.category}
                </span>
                <span style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--accent-gold)'
                }}>
                  {selectedProduct.price}
                </span>
              </div>

              <h2 style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.6rem'
              }}>
                {selectedProduct.name}
              </h2>

              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                marginBottom: '1.3rem'
              }}>
                {selectedProduct.description || `Préparé avec des ingrédients de première qualité par nos maîtres baristas et créateurs à THE BOSS 33.`}
              </p>

              <div style={{
                display: 'flex',
                gap: '0.6rem',
                paddingTop: '0.8rem',
                borderTop: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Qualité</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>100% Frais</span>
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Préparation</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Artisanale</span>
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Service</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Sur Place / Emporté</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Menu;
