"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MapPin, Clock, CheckCircle, Truck } from "lucide-react"
import { useEffect, useState } from "react"

export default function DeliveriesPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [HighPriorityOrders, setHighPriorityOrders] = useState<any[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
    }

    fetchOrders()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Entregada":
        return <CheckCircle className="h-4 w-4" />
      case "En ruta":
        return <Truck className="h-4 w-4" />
      case "Pendiente":
        return <Clock className="h-4 w-4" />
      case "Programada":
        return <MapPin className="h-4 w-4" />
      case "Cancelado":
        return <Clock className="h-4 w-4 text-red-500" />
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

      return delivery.status === 'por entregar' && esMismoDia
    })

    setHighPriorityOrders(highPriority)
  }, [orders])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus =
      statusFilter === "Todos" || order.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
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
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
              <option value="por entregar">Por entregar</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Telefono</TableHead>
                <TableHead>Dirección</TableHead>
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

                return (
                  <TableRow key={delivery._id}>
                    <TableCell>
                      <div className="font-medium">{delivery.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{delivery.address.telefono}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] break-words">
                        <div>{`Calle: ${calle}`}</div>
                        <div>{`Número: ${numero}`}</div>
                        <div>{`Colonia: ${colonia}`}</div>
                        <div>{`Código Postal: ${codigoPostal}`}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{fechaFormateada}</div>
                        <div className="text-sm text-muted-foreground">{hora}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={esAltaPrioridad ? "bg-red-300" : "bg-green-300"}
                      >
                        {esAltaPrioridad ? "Alta" : "Baja"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 px-2 py-1 rounded-md ${getStatusColor(delivery.status)}`}>
                        {getStatusIcon(delivery.status)}
                        <span className="text-sm font-medium">{delivery.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <MapPin className="h-4 w-4" />
                      </Button>
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