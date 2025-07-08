import { LandingPage } from "@/components/landingPage"
import {products} from "@/components/products.js"
import Image from "next/image"

export default function Home() {

  return (
    <div>
      <h1>Productos</h1>
      
      <div className="grid grid-cols-1 gap-10 m-5">
        {products.map((product, i) => (
        <div key={i}
          className="bg-slate-500 text-center p-4 rounded-md flex flex-col items-center"
        >
          <h2>Product name</h2>
          <Image
            src={product.image}
            width={50}
            height={50}
            alt="producto"
          />
          <p>100</p>
          <button>Pagar</button>
        </div>
      ))}
      </div>
    </div>
  )
}
