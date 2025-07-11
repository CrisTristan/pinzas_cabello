import Image from 'next/image';

export function OrderSummary({ products }: { products: typeof products }) {
  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const impuesto = subtotal * 0.16;
  const envio = 50; // Envío fijo de $50
  const total = subtotal + envio;

  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 24, maxWidth: 400 }}>
      <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Resumen del pedido</h3>
      {products.map((p) => (
        <div key={p._id} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <Image src={p.image} alt={p.name} width={56} height={56} style={{ borderRadius: 8, marginRight: 12 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500 }}>{p.name}</div>
            <div className='text-red-500 font-bold'>{p.selectedOption}</div>
            {p.descripcion && <div style={{ fontSize: 13, color: '#888' }}>{p.descripcion}</div>}
          </div>
          <div style={{ textAlign: 'right', minWidth: 100 }}>
            ${p.price.toFixed(2)}{p.recurrente && <span style={{ fontSize: 13 }}> por mes</span>}
          </div>
          <div className='text-red-500 font-bold' style={{ marginLeft: 12 }}>
            x {p.quantity || 1}
          </div>
        </div>
      ))}
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '12px 0' }}>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: '12px 0' }}>
        <span>Impuesto (16%)</span>
        <span>${impuesto.toFixed(2)}</span>
      </div> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '12px 0' }}>
        <span>Envío</span>
        <span>${envio.toFixed(2)}</span>
      </div>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 18, marginTop: 12 }}>
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}