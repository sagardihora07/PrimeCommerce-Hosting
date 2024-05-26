import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div>
      <section>
        <div class="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
          <div class="text-center">
            <h1 class="text-4xl font-semibold tracking-tighter text-blue-300 lg:text-5xl text-balance bg-gradient-to-b from-[#0356b5] via-[#99b8d1] to-[#e80c0c] text-transparent bg-clip-text">
              Shop the Latest Trends -
              <span class="text-gray-400 "> Quality Products at Your Fingertips.</span>
            </h1>
            <p class="w-1/2 mx-auto mt-4 text-base font-medium text-gray-300 text-balance">
              Find Your Perfect Fit - Extensive Range of Products for Every Need.
            </p>
            <Link to={"/signup"}>
              <div class="flex flex-col items-center justify-center gap-2 mx-auto mt-8 md:flex-row">
                <button class="inline-flex items-center justify-center w-full h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-gray-500 md:w-auto rounded-xl hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-black" aria-label="Primary action">
                  Become a seller
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
            
    </div>
  )
}

export default HeroSection