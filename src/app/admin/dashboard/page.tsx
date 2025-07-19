import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Package, ShoppingCart, Users, Clock } from "lucide-react"
import { getAllOrders } from "@/lib/getAllOrders"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  //auth check

  const orders = await getAllOrders();

  //console.log("Orders fetched:", orders);
  const totalSales = orders.reduce((sum, order) => (sum + order.total - 50), 0);
  
  const pendingDeliveries = orders.reduce((acc: number, order)=>{
      if(order.status === "por entregar"){
        acc += 1;
      }
      return acc;
  }, 0)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$ {totalSales}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entregas Pendientes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDeliveries}</div>
          </CardContent>
        </Card>
      </div>

      {/* Resumen de actividad reciente */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Órdenes Recientes</CardTitle>
            <CardDescription>Últimas 5 compras realizadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders
              .slice()
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 5)
              .map((order) => (
                <div key={order._id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{order.name}</p>
                    <p className="text-sm text-muted-foreground">{order._id.toString()}</p>
                  </div>
                  <div className="ml-auto font-medium">$ {order.total-50}</div>
                  <Badge
                    variant={
                      order.status === "entregado" ? "default" : order.status === "pendiente" ? "secondary" : "outline"
                    }
                    className="ml-2"
                  >
                    {order.status}
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Entregas Urgentes</CardTitle>
            <CardDescription>Entregas programadas para hoy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "#3462", address: "Calle Mayor 123", time: "10:00 AM" },
              { id: "#3460", address: "Av. Libertad 456", time: "2:00 PM" },
              { id: "#3458", address: "Plaza Central 789", time: "4:30 PM" },
            ].map((delivery) => (
              <div key={delivery.id} className="flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{delivery.id}</p>
                  <p className="text-sm text-muted-foreground">{delivery.address}</p>
                </div>
                <div className="ml-auto text-sm font-medium">{delivery.time}</div>
              </div>
            ))}
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
