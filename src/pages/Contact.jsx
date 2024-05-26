import React from "react"
import ContactDetails from "../components/core/ContactUsPage/ContactDetails"
import ContactUsForm from "../components/core/ContactUsPage/ContactUsForm"
import Footer from "../components/comman/Footer"


const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 mb-8 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
            <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
                Got a Idea? We&apos;ve got the skills. Let&apos;s team up
            </h1>
            <p className="">
                Tell us more about yourself and what you&apos;re got in mind.
            </p>

            <div className="mt-7">
                <ContactUsForm />
            </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact