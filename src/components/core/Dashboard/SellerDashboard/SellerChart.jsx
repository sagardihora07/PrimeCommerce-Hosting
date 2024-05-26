import React, { useState } from 'react'
import { Chart, registerables } from "chart.js"
import { Bar } from "react-chartjs-2"

Chart.register(...registerables)

const SellerChart = ({products}) => {

  const [currChart, setCurrChart] = useState("buyers")

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // Data for the chart displaying student information
  const chartDataBuyer = {
    labels: products.map((product) => product.productName),
    datasets: [
      {
        data: products.map((product) => product.totalBuyersOdered),
        label: "Buyer per product",
        backgroundColor: generateRandomColors(products.length),
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: products.map((product) => product.productName),
    datasets: [
      {
        data: products.map((product) => product.totalAmountGenerated),
        label: "Income per product",
        backgroundColor: generateRandomColors(products.length),
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("buyers")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "buyers"
              ? "bg-richblack-700 text-aqua-800"
              : "text-indigo-300"
          }`}
        >
          Buyers
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-aqua-800"
              : "text-indigo-300"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Bar
          data={currChart === "buyers" ? chartDataBuyer : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}

export default SellerChart