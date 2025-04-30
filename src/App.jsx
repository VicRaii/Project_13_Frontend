import React from 'react'
import { Box } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import About from './pages/About'
import LoginRegister from './pages/LoginRegister'
import ContactPage from './pages/Contacto'
import Footer from './components/Footer'
import Series from './pages/Series'
import SeriesDetail from './components/SeriesDetail'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Box p={4} bg='gray.100' minH='100vh'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/series'
            element={
              <ProtectedRoute>
                <Series />
              </ProtectedRoute>
            }
          />
          <Route path='/series/:id' element={<SeriesDetail />} />
          <Route
            path='/about'
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route path='/auth' element={<LoginRegister />} />
          <Route
            path='/contact'
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>

      <Footer />
    </BrowserRouter>
  )
}

export default App
