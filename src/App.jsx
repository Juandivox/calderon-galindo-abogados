import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { ModalProvider } from './context/ModalContext'
import { useScrollToHash } from './hooks/useScrollToHash'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import WhatsAppFloat from './components/layout/WhatsAppFloat'

import HomePage from './pages/HomePage'
import TeamPage from './pages/TeamPage'
import LegalTechPage from './pages/LegalTechPage'

/** Dispara pageviews en analytics cuando cambia la ruta */
function AnalyticsPageView() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname + location.search

    if (window.gtag) {
      window.gtag('config', 'G-S5841KNMP8', { page_path: path })
    }
    if (window.fbq) {
      window.fbq('track', 'PageView')
    }
    if (window.ttq) {
      window.ttq.page()
    }
  }, [location])

  return null
}

/** Maneja scroll a hash tras cambio de ruta */
function ScrollHandler() {
  useScrollToHash()
  return null
}

/** Layout principal: header + footer + WhatsApp */
function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <AnalyticsPageView />
        <ScrollHandler />
        <Routes>
          {/* Rutas con layout principal */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/equipo" element={<TeamPage />} />
          </Route>

          {/* LegalTech: layout propio */}
          <Route path="/legal-tech" element={<LegalTechPage />} />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  )
}
