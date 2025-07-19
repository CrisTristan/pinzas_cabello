'use client';

import { on } from 'events';
import { useEffect, useState } from 'react';
import { z } from 'zod';

// Definir el esquema de validación con zod
const shippingSchema = z.object({
  fullName: z.string().min(3, 'El nombre completo es obligatorio'),
  phone: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .regex(/^\d+$/, 'El teléfono debe contener solo números'),
  street: z.string().min(3, 'La calle es obligatoria'),
  number: z.string().min(1, 'El número es obligatorio'),
  neighborhood: z.string().min(3, 'La colonia o barrio es obligatorio'),
  postalCode: z
    .string()
    .min(5, 'El código postal debe tener al menos 5 dígitos')
    .regex(/^\d+$/, 'El código postal debe contener solo números'),
});

type ShippingFormProps = {
  onShippingData: (data: any) => void;
};

export default function ShippingForm({onShippingData}: ShippingFormProps) {

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    number: '',
    neighborhood: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if(formData.fullName && formData.phone && formData.street && formData.number && formData.neighborhood && formData.postalCode) {
      onShippingData(formData);
    }

    handleShippingSubmit();
    
  },[formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = () => {
    //e.preventDefault();

    const result = shippingSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach(issue => {
        const field = issue.path[0];
        if (field) {
          fieldErrors[field as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    console.log('Formulario válido:', result.data);
    // Aquí puedes enviar los datos a tu backend o integrarlos con Stripe
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Dirección de Envío</h2>

      {/* Nombre completo */}
      <div className="mb-4">
        <label className="block font-medium">Nombre completo</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
      </div>

      {/* Teléfono */}
      <div className="mb-4">
        <label className="block font-medium">Teléfono</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Ej: 9981234567"
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>

      {/* Calle */}
      <div className="mb-4">
        <label className="block font-medium">Calle</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.street && <p className="text-red-500">{errors.street}</p>}
      </div>

      {/* Número */}
      <div className="mb-4">
        <label className="block font-medium">Número de casa / Apartamento</label>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.number && <p className="text-red-500">{errors.number}</p>}
      </div>

      {/* Colonia / Barrio */}
      <div className="mb-4">
        <label className="block font-medium">Colonia o Barrio</label>
        <input
          type="text"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.neighborhood && <p className="text-red-500">{errors.neighborhood}</p>}
      </div>

      {/* Código Postal */}
      <div className="mb-4">
        <label className="block font-medium">Código Postal</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.postalCode && <p className="text-red-500">{errors.postalCode}</p>}
      </div>

      {/* Botón enviar */}
      {/* <button
        onClick={handleShippingSubmit}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Confirmar Envío
      </button> */}
    </div>
  );
}
