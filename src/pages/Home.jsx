import React from 'react'
import HeroSection from '../components/core/HomePage/HeroSection'
import CategorySection from '../components/core/HomePage/CategorySection'
import Footer from '../components/comman/Footer'

const Home = () => {
  return (
    <div className=' w-full h-full'>
        <HeroSection/>

        <CategorySection />

        <Footer/>
    </div>
  )
}

export default Home