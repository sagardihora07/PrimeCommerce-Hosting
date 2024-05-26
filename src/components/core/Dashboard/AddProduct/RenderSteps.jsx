import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import PublishProduct from "./PublishProduct"
import ProductInformationForm from "./ProductInformation/ProductInformationForm"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.product)

  const steps = [
    {
      id: 1,
      title: "Product Information",
    },
    {
      id: 2,
      title: "Publish",
    },

  ]

  return (
    <>
      <div className="relative mb-7 flex w-full justify-center">
        {steps.map((item) => (
          <>
            <div
              className="flex flex-col items-center "
              key={item.id}
            >
              <button
                className={`grid cursor-default aspect-square w-[100px] place-items-center rounded-md border-[1px] ${
                  step === item.id
                    ? "border-aqua-200 bg-richblack-700 text-aqua-500"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-richbalck-700 text-yellow-50"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-xl text-green-400" />
                ) : (
                  item.title
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(100px/2)] w-[33%]  border-dashed border-b-2 items-center ${
                  step > item.id  ? "border-green-400" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <ProductInformationForm />}
     
      {step === 2 && <PublishProduct />}
    </>
  )
}
