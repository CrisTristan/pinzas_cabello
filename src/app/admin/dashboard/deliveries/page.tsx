"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MapPin, Clock, CheckCircle, Truck } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Product } from "@/types/product"
import Image from "next/image"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default function DeliveriesPage() {
  //auth check
  // const {isAuthenticated} = getKindeServerSession();
  //   if(!(await isAuthenticated())) {
  //     redirect("/api/auth/login")
  //   }
  
  const [orders, setOrders] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [HighPriorityOrders, setHighPriorityOrders] = useState<any[]>([])
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(null)
  const [productDetails, setProductDetails] = useState<Record<string, Product[]>>({})

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedDeliveryId) return
      const delivery = orders.find(o => o._id === selectedDeliveryId) //Buscar la orden en la que se hizo click
      if (!delivery || productDetails[selectedDeliveryId]) return     //devuelve la orden con el id que se hizo click

      const productsFetched: Product[] = await Promise.all(
        delivery.products.map(async (product: Product) => { //recorremos los productos
          const res = await fetch(`/api/products?id=${product.productId}`)  //hacemos fetch para obtener los detalles con ese id
          const data = await res.json()
          return {
            ...product,  //desestruturacion product
            ...data      //desestructuracion de data
          }
        })
      )

      setProductDetails(prev => ({
        ...prev,
        [selectedDeliveryId]: productsFetched
      }))
    }

    fetchProducts()
  }, [selectedDeliveryId, orders, productDetails])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "entregado":
        return <CheckCircle className="h-6 w-6 text-green-400" />
      case "En ruta":
        return <Truck className="h-4 w-4" />
      case "pendiente":
        return <Clock className="h-6 w-6 text-blue-400" />
      case "Programada":
        return <MapPin className="h-4 w-4" />
      case "cancelado":
        return <Clock className="h-6 w-6 text-red-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cancelado":
        return "bg-red-100 text-red-700"
      case "Entregado":
        return "bg-green-100 text-green-700"
      case "por entregar":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  useEffect(() => {
    const hoy = new Date()
    const dosDiasAntes = new Date()
    dosDiasAntes.setDate(hoy.getDate() - 2)

    const highPriority = orders.filter(delivery => {
      const fechaPedido = new Date(delivery.createdAt)
      const esMismoDia =
        fechaPedido.getFullYear() === dosDiasAntes.getFullYear() &&
        fechaPedido.getMonth() === dosDiasAntes.getMonth() &&
        fechaPedido.getDate() === dosDiasAntes.getDate()

      return delivery.status === 'pendiente' && esMismoDia
    })

    setHighPriorityOrders(highPriority)
  }, [orders])

  const filteredOrders = orders
    .filter(order => {
      const searchLower = search.toLowerCase();
      const matchesName = order.name.toLowerCase().includes(searchLower);
      const matchesId = order._id?.toString().toLowerCase().includes(searchLower);
      const matchesStatus =
        statusFilter === "Todos" || order.status.toLowerCase() === statusFilter.toLowerCase();
      return (matchesName || matchesId) && matchesStatus;
    })
    .sort((a, b) => {
      // Ordena por fecha descendente (más recientes primero)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Entregas</h2>
          <p className="text-muted-foreground">Gestiona todas las entregas programadas y pendientes</p>
        </div>
        <Button>
          <Truck className="mr-2 h-4 w-4" />
          Nueva Entrega
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas las Entregas</CardTitle>
          <CardDescription>Lista completa de entregas programadas, en proceso y completadas</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar entregas..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="Todos">Todos</option>
              <option value="entregado">entregado</option>
              <option value="cancelado">cancelado</option>
              <option value="pendiente">pendiente</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Telefono</TableHead>
                {/* <TableHead>Dirección</TableHead> */}
                <TableHead>Fecha y Hora</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((delivery) => {
                const calle = delivery.address.calle
                const numero = delivery.address.numero
                const colonia = delivery.address.colonia
                const codigoPostal = delivery.address.codigoPostal

                const fecha = new Date(delivery.createdAt)
                const fechaFormateada = fecha.toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })

                const hora = fecha.toLocaleTimeString("es-MX", {
                  hour: "2-digit",
                  minute: "2-digit"
                })

                const esAltaPrioridad = HighPriorityOrders.some(p => p._id === delivery._id)

                // Calcular prioridad: "alta" si tiene 2 o más días de retraso, "baja" de lo contrario
                const fechaCreacion = new Date(delivery.createdAt);
                const hoy = new Date();
                // Diferencia en milisegundos
                const diffMs = hoy.getTime() - fechaCreacion.getTime();
                // Diferencia en días
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                const prioridad = diffDays >= 2 ? "Alta" : "Baja";

                return (
                  <TableRow key={delivery._id}>
                    <TableCell>
                      <span className="text-md text-gray-500">{delivery._id}</span>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{delivery.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{delivery.address.telefono}</div>
                    </TableCell>
                    {/* <TableCell>
                      <div className="max-w-[200px] break-words">
                        <div>{`Calle: ${calle}`}</div>
                        <div>{`Número: ${numero}`}</div>
                        <div>{`Colonia: ${colonia}`}</div>
                        <div>{`Código Postal: ${codigoPostal}`}</div>
                      </div>
                    </TableCell> */}
                    <TableCell>
                      <div>
                        <div className="font-medium">{fechaFormateada}</div>
                        <div className="text-sm text-muted-foreground">{hora}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={prioridad === "Alta" ? "bg-red-300" : "bg-green-300"}
                      >
                        {prioridad}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 px-2 py-1 rounded-md ${getStatusColor(delivery.status)}`}>
                        {getStatusIcon(delivery.status)}
                        <span className="text-sm font-medium">{delivery.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm"
                            className="bg-blue-500 text-white hover:bg-blue-600"
                            onClick={() => setSelectedDeliveryId(delivery._id)}
                          >
                            Detalles
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] max-h-[500px] overflow-y-auto bg-white shadow-lg rounded-md p-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-lg">Detalles de la entrega</h4>
                            <p><strong>Cliente:</strong> {delivery.name}</p>
                            <p><strong>Teléfono:</strong> {delivery.address.telefono}</p>
                            <p><strong>Dirección:</strong></p>
                            <ul className="ml-4 list-disc text-sm">
                              <li>{`Calle: ${calle}`}</li>
                              <li>{`Número: ${numero}`}</li>
                              <li>{`Colonia: ${colonia}`}</li>
                              <li>{`Código Postal: ${codigoPostal}`}</li>
                            </ul>
                            <p><strong>Productos a entregar:</strong></p>
                            {productDetails[delivery._id] ? (
                              productDetails[delivery._id].map((product) => (
                                <div key={product._id + (product.type ?? "")}>
                                  <ul className="ml-4 list-disc text-sm">
                                    <li>{product.name || "Producto"}</li>
                                    <li>
                                      <Image
                                        src={product.image}
                                        alt={`Imagen de ${product.name}`}
                                        width={80}
                                        height={80}
                                      />
                                    </li>
                                    <li><span>Tipo: </span>{product.type === 'D' ? "Docena": "Individual"}</li>
                                    <li><span>Cantidad: </span>{product.quantity}</li>
                                  </ul>
                                  <p>---------------------------</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">Cargando productos...</p>
                            )}
                            {/* Botón eliminar solo si status es entregado */}
                            {delivery.status === "entregado" && (
                              <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                                onClick={async () => {
                                  if (confirm("¿Seguro que deseas eliminar esta entrega?")) {
                                    await fetch(`/api/orders?id=${delivery._id}`, {
                                      method: "DELETE",
                                    });
                                    window.location.reload();
                                  }
                                }}
                              >
                                Eliminar Entrega
                              </button>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
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
};