import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    // const result = await cloudinary.uploader.upload_stream(
    //   { folder: 'pinzas_cabello/productos', resource_type: 'image' },
    //   (error, result) => {
    //     if (error || !result) {
    //       throw new Error('Upload failed')
    //     }
    //     return result
    //   }
    // )

    // console.log("Upload successful:", result);
    // Cloudinary doesn't support promises with upload_stream directly.
    // So we need to use a manual wrapper:
    const streamUpload = () =>
      new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({folder: 'pinzas_cabello/productos', resource_type: 'image'},(err, result) => {
          if (err || !result) return reject(err)
          resolve(result)
        })
        stream.end(buffer)
      })

    const uploaded = await streamUpload()
    console.log("Uploaded", uploaded);
    return NextResponse.json({ url: uploaded.secure_url, publicId: uploaded.public_id }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}