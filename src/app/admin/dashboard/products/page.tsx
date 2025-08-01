"use client"

import ImageUploader from "@/components/ImageUploader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [newName, setNewName] = useState("")
  const [newStockDocena, setNewStockDocena] = useState("")
  const [newStockIndividual, setNewStockIndividual] = useState("")
  const [newIndividualPrice, setNewIndividualPrice] = useState("")
  const [newDocenaPrice, setNewDocenaPrice] = useState("")
  const [productToDelete, setProductToDelete] = useState<any | null>(null)
  const [showAddModal, setShowAddModal] = useState(false);
  const [addName, setAddName] = useState("");
  const [addPriceIndividual, setAddPriceIndividual] = useState("");
  const [addPriceDocena, setAddPriceDocena] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [addImage, setAddImage] = useState<string>("");
  const [addStockIndividual, setAddStockIndividual] = useState("");
  const [addStockDocena, setAddStockDocena] = useState("");
  const [publicId, setPublicId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return "Agotado"
    if (stock < 10 && stock > 0) return "Poco Stock"
    if (stock >= 10) return "Activo"
    return "Normal"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Agotado":
        return "bg-red-100 text-red-700"
      case "Poco Stock":
        return "bg-blue-100 text-blue-700"
      case "Activo":
        return "bg-green-100 text-green-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return

    const res = await fetch(`/api/products?id=${selectedProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newName,
        stockIndividual: parseInt(newStockIndividual),
        stockDocena: parseInt(newStockDocena),
        individualPrice: parseInt(newIndividualPrice),
        docenaPrice: parseInt(newDocenaPrice)
      })
    })

    if (res.ok) {
     await fetchProducts()
      setSelectedProduct(null)
      setNewName("")
      setNewStockDocena("")
      setNewStockIndividual("")
      setNewIndividualPrice("")
      setNewDocenaPrice("")
    } else {
      console.error("Error al actualizar el producto")
    }
  }

  const handleDeleteProduct = async () => {
    if (!productToDelete) return

    const product = await fetch(`/api/products?id=${productToDelete._id}`)
    const data = await product.json();
    //console.log(data);
    const publicId = data.publicId;
    if(publicId){
      const res = await fetch("/api/delete", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publicId })
      })
      if(!res.ok){
        console.error("Error al eliminar la imagen de Cloudinary")
      }
    }
    const res = await fetch(`/api/products?id=${productToDelete._id}`, {
      method: "DELETE"
    })

    if (res.ok) {
      await fetchProducts()
      setProductToDelete(null)
    } else {
      console.error("Error al eliminar el producto")
    }
  }

  const handleUploadImage = (imageUrl: string, publicId: string) => {
      //console.log(imageUrl)
      setAddImage(imageUrl)
      setPublicId(publicId)
  }

  const handleAddProduct = async () => {
    if (
      !addName ||
      !addPriceIndividual ||
      !addPriceDocena ||
      !addStockIndividual ||
      !addStockDocena ||
      !addImage
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }
    if (addImage && publicId) {
      const res = await fetch('/api/products', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: addName,
          individualPrice: parseFloat(addPriceIndividual),
          docenaPrice: parseFloat(addPriceDocena),
          image: addImage,
          stockIndividual: parseInt(addStockIndividual),
          stockDocena: parseInt(addStockDocena),
          category: addCategory,
          publicId: publicId
        }),
      });
      if (res.ok) {
        await fetchProducts();
        setShowAddModal(false);
        setAddName("");
        setAddPriceIndividual("");
        setAddPriceDocena("");
        setAddImage("");
        setAddStockIndividual("");
        setAddStockDocena("");
      } else {
        alert("Error al agregar el producto");
      }
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* ... encabezado omitido por brevedad ... */}

      <Card>
        <CardHeader>
          <CardTitle>Inventario</CardTitle>
          <CardDescription>Lista completa de productos en tu tienda</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => {
                  setShowAddModal(true);
                  setSelectedProduct(null)
                  setNewName("")
                  setNewStockDocena("")
                  setNewStockIndividual("")
                  setNewIndividualPrice("")
                  setNewDocenaPrice("")
                }}
              >
                <Plus className="h-4 w-4" />
                Agregar Producto
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead><div className="flex flex-col"><p>Precio</p><p>Individual</p></div></TableHead>
                <TableHead><div className="flex flex-col"><p>Precio</p><p>Docena</p></div></TableHead>
                <TableHead>Stock Individual</TableHead>
                <TableHead>Stock Docena</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const stockStatusDocena = getStockStatus(product.stockDocena)
                const stockStatusIndividual = getStockStatus(product.stockIndividual)
                const statusColorIndividual = getStatusColor(stockStatusIndividual)
                const statusColorDocena = getStatusColor(stockStatusDocena)

                return (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex flex-col items-center gap-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="rounded-md"
                        />
                        <div className="font-medium">{product.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">$ {product.individualPrice}</TableCell>
                    <TableCell className="font-medium">$ {product.docenaPrice}</TableCell>
                    <TableCell>{product.stockIndividual}</TableCell>
                    <TableCell>{product.stockDocena}</TableCell>
                    <TableCell>
                      <div className={`px-2 py-1 rounded-md text-sm font-medium ${statusColorDocena}`}>
                        {stockStatusDocena}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => {
                          setSelectedProduct(product)
                          setNewName(product.name)
                          setNewStockDocena(product.stockDocena.toString())
                          setNewStockIndividual(product.stockIndividual.toString())
                          setNewIndividualPrice(product.individualPrice)
                          setNewDocenaPrice(product.docenaPrice)
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setProductToDelete(product)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal para agregar producto */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Agregar Producto</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre del producto</label>
                <Input
                  type="text"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="Ej. Camiseta Azul"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio Individual</label>
                <Input
                  type="number"
                  value={addPriceIndividual}
                  onChange={(e) => setAddPriceIndividual(e.target.value)}
                  placeholder="Ej. 99.99"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio Docena</label>
                <Input
                  type="number"
                  value={addPriceDocena}
                  onChange={(e) => setAddPriceDocena(e.target.value)}
                  placeholder="Ej. 999.99"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Imagen del producto</label>
                <ImageUploader onUploadImage={handleUploadImage}/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="pinzas"
                      checked={addCategory === "pinzas"}
                      onChange={() => setAddCategory("pinzas")}
                      className="mr-2"
                    />
                    Pinzas
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="ropa"
                      checked={addCategory === "ropa"}
                      onChange={() => setAddCategory("ropa")}
                      className="mr-2"
                    />
                    Ropa
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="calzado"
                      checked={addCategory === "calzado"}
                      onChange={() => setAddCategory("calzado")}
                      className="mr-2"
                    />
                    Calzado
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock Individual</label>
                <Input
                  type="number"
                  value={addStockIndividual}
                  onChange={(e) => setAddStockIndividual(e.target.value)}
                  placeholder="Ej. 20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock Docena</label>
                <Input
                  type="number"
                  value={addStockDocena}
                  onChange={(e) => setAddStockDocena(e.target.value)}
                  placeholder="Ej. 10"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddProduct}>Guardar</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
  {selectedProduct && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Editar Producto</h3>
          <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del producto</label>
            <Input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ej. Camiseta Azul"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nuevo stock Individual</label>
            <Input
              type="number"
              value={newStockIndividual}
              onChange={(e) => setNewStockIndividual(e.target.value)}
              placeholder="Ej. 20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nuevo stock Docena</label>
            <Input
              type="number"
              value={newStockDocena}
              onChange={(e) => setNewStockDocena(e.target.value)}
              placeholder="Ej. 20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nuevo precio Individual</label>
            <Input
              type="text"
              value={newIndividualPrice}
              onChange={(e) => setNewIndividualPrice(e.target.value)}
              placeholder="Ej. $99.99"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nuevo precio Docena</label>
            <Input
              type="text"
              value={newDocenaPrice}
              onChange={(e) => setNewDocenaPrice(e.target.value)}
              placeholder="Ej. $99.99"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleUpdateProduct}>Guardar</Button>
          </div>
        </div>
      </div>
    </div>
  )}


      {/* Modal de eliminación */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-600">¿Eliminar producto?</h3>
              <Button variant="ghost" size="sm" onClick={() => setProductToDelete(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar <strong>{productToDelete.name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setProductToDelete(null)}>Cancelar</Button>
              <Button variant="outline" onClick={handleDeleteProduct}>Eliminar</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}