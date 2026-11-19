import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import { PageTransition } from './components/ui/PageTransition'
import { Toaster } from './components/ui/Toast'
import Splash from './pages/Splash'
import Login from './pages/Login'
import Home from './pages/Home'
import Conversation from './pages/Conversation'
import SummaryReview from './pages/SummaryReview'
import History from './pages/History'
import Privacy from './pages/Privacy'
import Profile from './pages/Profile'
import ProDashboard from './pages/pro/Dashboard'
import ProPatients from './pages/pro/Patients'
import ProPatientFile from './pages/pro/PatientFile'

function ProtectedRoute({ children }) {
  const authenticated = useAppStore((s) => s.authenticated)
  return authenticated ? children : <Navigate to="/connexion" replace />
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Splash />} />
          <Route path="/connexion" element={<Login />} />
          <Route
            path="/accueil"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Home />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/conversation"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Conversation />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <SummaryReview />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/historique"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <History />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Profile />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/confidentialite"
            element={
              <PageTransition>
                <Privacy />
              </PageTransition>
            }
          />
          <Route
            path="/pro"
            element={
              <PageTransition>
                <ProDashboard />
              </PageTransition>
            }
          />
          <Route
            path="/pro/patients"
            element={
              <PageTransition>
                <ProPatients />
              </PageTransition>
            }
          />
          <Route
            path="/pro/patients/:id"
            element={
              <PageTransition>
                <ProPatientFile />
              </PageTransition>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  )
}
