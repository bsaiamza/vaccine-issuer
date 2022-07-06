// react
import { Suspense, lazy } from 'react'
// react-router-dom
import { Routes, Route } from 'react-router-dom'
// mui5 styles
import { ThemeProvider } from '@mui/material/styles'
// react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
// context
import { theme } from './context/theme'
// components
const Footer = lazy(() => import('./components/Footer'))
const Navigation = lazy(() => import('./components/Navigation'))
// pages
const ConnectionPage = lazy(() => import('./pages/Connection'))
const CredentialPage = lazy(() => import('./pages/Credential'))
const DefinitionPage = lazy(() => import('./pages/Definition'))
const HolderPage = lazy(() => import('./pages/Holder'))
const HomePage = lazy(() => import('./pages/Home'))
const NotFoundPage = lazy(() => import('./pages/NotFound'))
const SchemaPage = lazy(() => import('./pages/Schema'))

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
        <Footer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="schemas" element={<SchemaPage />} />
          <Route path="credential-definitions" element={<DefinitionPage />} />
          <Route path="connections" element={<ConnectionPage />} />
          <Route path="credentials" element={<CredentialPage />} />
          <Route path="holder" element={<HolderPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          limit={3}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
