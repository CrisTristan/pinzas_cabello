import React from 'react'

export default function SuccessPage() : React.JSX.Element {
  return (
    <div
      className='text-3xl font-bold text-center py-10 h-screen flex items-center justify-center'
    >
      <div>
      <span className='text-7xl'>🎉</span>
      <h1>Success</h1>
      <p>Gracias Por tu compra</p>
      <a href='/' className='text-blue-500 block mt-4'>
       Volver a la tienda
      </a>
      </div>
    </div>
  )
}
