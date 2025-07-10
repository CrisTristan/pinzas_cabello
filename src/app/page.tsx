
import { LandingPage } from "@/components/landingPage"
import {products} from "@/components/products.js"
import Image from "next/image"
import { ProductCard } from "../components/ProductCard"

export default function Home() {

  return (
    <div>
      <h1>Productos</h1>
      
      <div className="grid grid-cols-1 gap-10 m-5">
        {products.map((product, i) => (
        <ProductCard
          key= {i}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
      </div>
    </div>
  )
}
