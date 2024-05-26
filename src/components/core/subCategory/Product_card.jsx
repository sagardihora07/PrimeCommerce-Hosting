import React from 'react'
import { Link } from 'react-router-dom'

const Product_card = ({product, Height}) => {
  return (
    <Link to={`/products/${product._id}`}>
        <div className="max-w-[200px] mt-4 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className=' flex items-center justify-center'>
        <img 
            className={`${Height} object-contain`} 
            src={product.thumbnail} 
            alt={product.productName} 
        />
        </div>
        <div className="p-3">
        <h2 className="text-gray-800 text-lg font-semibold">{product.productName}</h2>
        <div className="flex items-center justify-between mt-2">
            <p className="text-gray-700 font-semibold">${product.price}</p>
        </div>
        </div>
    </div>
    </Link>
  )
}

export default Product_card