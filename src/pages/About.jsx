import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import ContactUsForm from '../components/core/ContactUsPage/ContactUsForm'
import Footer from '../components/comman/Footer'

const About = () => {
  return (
    <div className=''>
        <section className="bg-richblack-800">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between  text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
          Crafting Seamless Shopping Experiences for 
            <HighlightText text={"Tomorrow's Trends"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 ">
            PrimeCommerce is dedicated to shaping the future of online shopping. 
            We're committed to delivering exceptional products, embracing the latest 
            technologies, and building a dynamic community of shoppers. Experience the
             next level of online retail with PrimeCommerce.
            </p>
          </header>
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col   text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row">
            <div className="py-8 flex items-center  flex-col gap-10 ">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section  className="mx-auto mt-20 mb-8 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <div className="mx-auto">
        <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
        <p className="text-center text-richblack-300 mt-3">
            We&apos;d love to here for you, Please fill out this form.
        </p>
        <div className="mt-12 mx-auto">
            <ContactUsForm />
        </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default About