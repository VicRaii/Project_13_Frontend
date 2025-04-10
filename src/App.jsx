import React from 'react'
import { Box } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Events from './pages/Events'
import Preachings from './pages/Preachings'
import Navbar from './components/Navbar'
import About from './pages/About'

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar con logo y navegación */}
      <Navbar />

      {/* Contenedor principal para las rutas */}
      <Box p={4} bg='gray.100' minH='100vh'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/events' element={<Events />} />
          <Route path='/preachings' element={<Preachings />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

//! NAVBAR ACTUALIZADO

export default App
