import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: "1",
    name: "Smartphone Pro Max",
    category: "Electrónicos",
    price: "$899.00",
    stock: 25,
    status: "Activo",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Auriculares Bluetooth",
    category: "Electrónicos",
    price: "$149.00",
    stock: 50,
    status: "Activo",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Camiseta Casual",
    category: "Ropa",
    price: "$29.99",
    stock: 0,
    status: "Agotado",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Zapatillas Deportivas",
    category: "Calzado",
    price: "$79.99",
    stock: 15,
    status: "Activo",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Mochila Viaje",
    category: "Accesorios",
    price: "$59.99",
    stock: 8,
    status: "Poco Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function ProductsPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Activo":
        return "default"
      case "Agotado":
        return "destructive"
      case "Poco Stock":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Productos</h2>
          <p className="text-muted-foreground">Gestiona el inventario de tu tienda</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventario</CardTitle>
          <CardDescription>Lista completa de productos en tu tienda</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar productos..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <div className="font-medium">{product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-medium">{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(product.status)}>{product.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}