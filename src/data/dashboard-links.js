import { ACCOUNT_TYPE } from "../utils/constants"

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/seller",
    type: ACCOUNT_TYPE.SELLER,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Products",
    path: "/dashboard/my-products",
    type: ACCOUNT_TYPE.SELLER,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Product",
    path: "/dashboard/add-product",
    type: ACCOUNT_TYPE.SELLER,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Odered Products",
    path: "/dashboard/enrolled-products",
    type: ACCOUNT_TYPE.BUYER,
    icon: "VscMortarBoard",
  },
  {
    id: 7,
    name: "Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.BUYER,
    icon: "VscArchive",
  },
]
