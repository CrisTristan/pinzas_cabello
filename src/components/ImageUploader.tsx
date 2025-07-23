'use client'

import { useEffect, useState } from 'react'

export default function ImageUploader({onUploadImage}: {onUploadImage?: (url: string, publicId: string) => void}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [publicId, setPublicId] = useState<string | null>(null)

  useEffect(() => {
    // Avizar al componente padre cuando la imagen se haya subido
    if (imageUrl && publicId && onUploadImage) {
        onUploadImage(imageUrl, publicId);
    }
    
  }, [imageUrl, publicId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview local antes del upload
    const localPreview = URL.createObjectURL(file)
    setPreviewUrl(localPreview)

    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    setUploading(false)
    setImageUrl(data.url)
    setPublicId(data.publicId)
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="file-input file-input-bordered w-full max-w-xs"
      />

      {/* Preview antes de subir */}
      {previewUrl && !imageUrl && (
        <div className="flex flex-col items-start gap-2">
          <p className="text-sm text-gray-600">Preview local:</p>
          <img src={previewUrl} alt="Preview" className="w-48 rounded-md border" />
        </div>
      )}

      {/* Preview después de subir */}
      {imageUrl && (
        <div className="flex flex-col items-start gap-2">
          <p className="text-sm text-green-600">Imagen subida a Cloudinary:</p>
          <img src={imageUrl} alt="Imagen subida" className="w-48 rounded-md border-2 border-green-400" />
        </div>
      )}

      {uploading && <p className="text-blue-500 animate-pulse">Subiendo imagen...</p>}
    </div>
  )
}