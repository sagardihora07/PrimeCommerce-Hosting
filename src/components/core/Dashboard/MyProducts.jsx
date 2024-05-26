import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSellerProducts } from "../../../services/operations/productDetailsAPI";
import ProductsTable from "./SellerProducts/ProductsTable";
import { VscAdd } from "react-icons/vsc"
import IconBtn from "../../comman/IconBtn"



export default function MyProducts() {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await fetchSellerProducts(token)
            if(result) {
                setProducts(result)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div>
          <div className="mb-14 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-richblack-5">My Products</h1>
            <IconBtn
              text="Add Product"
              onclick={() => navigate("/dashboard/add-product")}
            >
              <VscAdd />
            </IconBtn>
          </div>
          {products && <ProductsTable products={products} setProducts={setProducts} />}
        </div>
      )
}