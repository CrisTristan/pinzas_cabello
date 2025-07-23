import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function DELETE(req: Request) {
  const { publicId } = await req.json()

  if (!publicId || typeof publicId !== 'string') {
    return NextResponse.json({ error: 'Public ID inválido' }, { status: 400 })
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image'
    })

    if (result.result !== 'ok') {
      return NextResponse.json({ error: 'No se pudo eliminar la imagen' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Imagen eliminada correctamente' })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar la imagen' }, { status: 500 })
  }
}