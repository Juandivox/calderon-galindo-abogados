import { legalTechFeatures } from '../data/legalTech'

export default function LegalTechPage() {
  return (
    <div style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <header style={{ padding: '20px 0' }}>
          <div>
            {/* Logo fallback: usa el logo de la firma en blanco */}
            <img
              src="/Image/Abogados/Logo/Logo_blanco1.png"
              alt="LegalTech - Calderón Galindo Abogados"
              style={{ height: 40 }}
            />
          </div>
        </header>

        <main>
          {/* Hero */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              minHeight: '80vh',
              padding: '60px 0',
              flexWrap: 'wrap',
              gap: 40,
            }}
          >
            {/* Content */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: 24, lineHeight: 1.2 }}>
                EL FUTURO DE LA TECNOLOGÍA LEGAL
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#CCCCCC', marginBottom: 40, maxWidth: 600 }}>
                Transforma tu práctica jurídica con herramientas automatizadas. Reduce el tiempo de investigación hasta
                un 70%. Mejora la precisión con análisis impulsados por IA y revoluciona tu trabajo legal.
              </p>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 30 }}>
                <button
                  style={{
                    padding: '12px 30px',
                    border: 'none',
                    borderRadius: 30,
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: '#6EC207',
                    color: '#1A1A1A',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Comenzar Ahora
                </button>
                <button
                  style={{
                    padding: '12px 30px',
                    background: 'transparent',
                    border: '2px solid #6EC207',
                    borderRadius: 30,
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#6EC207',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Ver Demostración
                </button>
              </div>
            </div>

            {/* Glowing circle */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 200 }}>
              <div className="legaltech-glow-circle">
                <span style={{ fontSize: 80 }}>⚖️</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '80px 0',
              gap: 30,
              flexWrap: 'wrap',
            }}
          >
            {legalTechFeatures.map(({ icon, stat, label, sublabel }) => (
              <div key={stat} className="legaltech-feature-card" style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 20 }}>{icon}</div>
                <h3 style={{ fontSize: '2rem', color: '#6EC207', marginBottom: 10 }}>{stat}</h3>
                <p style={{ margin: '5px 0' }}>{label}</p>
                {sublabel && <p style={{ fontSize: '0.9rem', color: '#CCCCCC', margin: '5px 0' }}>{sublabel}</p>}
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '30px 0', color: '#CCCCCC', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} LegalTech. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
