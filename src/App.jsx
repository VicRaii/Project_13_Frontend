import React from 'react'
import { Box } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Preachings from './pages/Preachings'
import Navbar from './components/Navbar'
import About from './pages/About'
import LoginRegister from './pages/LoginRegister'
import { ContactForm } from './pages/Contacto'
import Footer from './components/Footer'
import Series from './pages/Series'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Box p={4} bg='gray.100' minH='100vh'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/series' element={<Series />} />
          <Route path='/preachings' element={<Preachings />} />
          <Route path='/about' element={<About />} />
          <Route path='/auth' element={<LoginRegister />} />
          <Route path='/contact' element={<ContactForm />} />
        </Routes>
      </Box>

      <Footer />
    </BrowserRouter>
  )
}

export default App
