import RenderSteps from "./RenderSteps"

export default function AddProduct() {
  return (
    <>
      <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Product
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Product Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-aqua-300 bg-richblack-800 p-6 xl:block">
        <p className="mb-8 text-lg text-indigo-300">🛍️ Product Upload Tips</p>
        <ul className="ml-5 list-item list-disc space-y-4 text-xs text-white">
            <li>Provide clear and attractive product images with high resolution.</li>
            <li>Include detailed product descriptions highlighting features, dimensions, and materials.</li>
            <li>Set competitive prices or offer discounts to attract customers.</li>
            <li>Choose appropriate categories and tags to improve product discoverability.</li>
            <li>Use accurate inventory management to prevent overselling.</li>
            <li>Optimize SEO settings for better search engine visibility.</li>
            <li>Utilize product variations for options like size, color, and quantity.</li>
            <li>Enable customer reviews and ratings to build trust and credibility.</li>
            <li>Offer promotions and deals to incentivize purchases.</li>
            <li>Provide responsive customer support for inquiries and assistance.</li>
        </ul>
        </div>
        </div>
    </>
  )
}
