"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MapPin, Clock, CheckCircle, Truck } from "lucide-react"
import { useEffect, useState } from "react"

const HighPriorityOrders = [];

export default function DeliveriesPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [HighPriorityOrders, setHighPriorityOrders] = useState<any[]>([]);

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


  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Entregada":
        return "default"
      case "En ruta":
        return "secondary"
      case "Pendiente":
        return "destructive"
      case "Programada":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "destructive"
      case "Media":
        return "secondary"
      case "Baja":
        return "outline"
      default:
        return "outline"
    }
  }

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
      default:
        return <Clock className="h-4 w-4" />
    }
  }

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

      {/* Resumen de entregas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entregas Hoy</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 pendientes, 1 en ruta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Ruta</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Ana López - Barcelona</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Carmen Díaz - Bilbao</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programadas</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Para mañana</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas las Entregas</CardTitle>
          <CardDescription>Lista completa de entregas programadas, en proceso y completadas</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar entregas..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead>Orden</TableHead> */}
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
              {orders.map((delivery) => {

                console.log(delivery.address);
                const calle = delivery.address.calle;
                const numero = delivery.address.numero;
                const colonia = delivery.address.colonia;
                const codigoPostal = delivery.address.codigoPostal;

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

                // Fecha actual
                const hoy = new Date();

                // Fecha dos días antes
                const dosDiasAntes = new Date();
                dosDiasAntes.setDate(hoy.getDate() - 2);

                // Filtrar los pedidos

                const fechaPedido = new Date(delivery.createdAt);

                // Comparar solo la fecha, sin la hora
                const esMismoDia =
                  fechaPedido.getFullYear() === dosDiasAntes.getFullYear() &&
                  fechaPedido.getMonth() === dosDiasAntes.getMonth() &&
                  fechaPedido.getDate() === dosDiasAntes.getDate();

                console.log(esMismoDia);

                if(delivery.status === 'por entregar' && esMismoDia){
                   HighPriorityOrders.push(delivery)
                }


                return (
                  <TableRow key={delivery._id}>
                    {/* <TableCell className="font-medium">{delivery._id.toString()}</TableCell> */}
                    <TableCell>
                      <div>
                        <div className="font-medium">{delivery.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{delivery.address.telefono}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] break-words">
                        <div>{`Calle: ${calle}`}</div>
                        <div>{`Numero: ${numero}`}</div>
                        <div>{`Colonia: ${colonia}`}</div>
                        <div>{`Codigo Potal: ${codigoPostal}`}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{fechaFormateada}</div>
                        <div className="text-sm text-muted-foreground">{hora}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityVariant(delivery.priority)}
                        className={HighPriorityOrders.some(pedido => pedido._id === delivery._id) === true ? "bg-red-300": "bg-green-300"}
                      >{  
                        HighPriorityOrders.some(pedido => pedido._id === delivery._id) === true ? "Alta": "Baja"
                       }
                       </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(delivery.status)}
                        <Badge variant={getStatusVariant(delivery.status)}>{delivery.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              }
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}