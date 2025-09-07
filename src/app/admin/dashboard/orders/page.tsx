"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllOrders } from "@/lib/getAllOrders"
import { Search, Download } from "lucide-react"
import { OrderActionsButton } from "@/components/OrderActionsButton"

export default function OrdersPageClient() {
  const [orders, setOrders] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [sortRecentFirst, setSortRecentFirst] = useState(true) // ✅ Estado para ordenar

  useEffect(() => {
    const fetchOrders = async () => {
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => {
          setOrders(data)
        })
    }

    fetchOrders()
  }, [])

  // 🔍 Filtro por ID o nombre de cliente
  const filteredOrders = orders
    .filter((order) => {
      const searchLower = search.toLowerCase()
      return (
        order._id.toString().toLowerCase().startsWith(searchLower) ||
        order.name.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortRecentFirst ? dateB - dateA : dateA - dateB
    })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Órdenes</h2>
          <p className="text-muted-foreground">
            Gestiona todas las compras de tus clientes
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas las Órdenes</CardTitle>
          <CardDescription>
            Lista completa de todas las compras realizadas por los clientes
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID o cliente..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setSortRecentFirst(!sortRecentFirst)}
            >
              {sortRecentFirst ? "Más recientes" : "Menos recientes"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Orden</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const fecha = new Date(order.createdAt)
                const fechaFormateada = fecha.toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })

                return (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">
                      {order._id.toString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.telefono}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{fechaFormateada}</TableCell>
                    <TableCell>
                      {
                        // Suma las cantidades de todos los productos en el arreglo
                        Array.isArray(order.products)
                          ? order.products.reduce((acc, prod) => acc + (prod?.quantity || 0), 0)
                          : 0
                      }
                    </TableCell>
                    <TableCell className="font-medium">
                      $ {order.total - 50}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          order.status === "entregado"
                            ? "bg-green-300"
                            : order.status === "cancelado"
                            ? "bg-red-300"
                            : "bg-gray-200"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <OrderActionsButton idOrder={order._id.toString()} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}