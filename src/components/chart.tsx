"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Product } from "@/types/product"
import { set } from "mongoose"

export const description = "An interactive bar chart"

// const chartData = [
//   { date: "2024-04-01", total: 222, ventas: 150 },
//   { date: "2024-04-02", total: 97, ventas: 180 },
// ]

const chartConfig = {
  views: {
    label: "Monto total ventas",
  },
  total: {
    label: "total",
    color: "var(--chart-2)",
  },
  ventas: {
    label: "ventas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function ChartBarInteractive({orders}:{orders: {date: Date, total: number, ventas: number}[]}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("total")

  const [chartData, setChartData] = React.useState<any[]>([]);
  React.useEffect(() => {
    // Agrupar por fecha y sumar total y ventas
    const grouped: Record<string, {date: string, total: number, ventas: number}> = {};
    orders.forEach(order => {
      // Convert Date object to 'YYYY-MM-DD' string for grouping
      const dateKey = order.date instanceof Date
        ? order.date.toISOString().slice(0, 10)
        : order.date;
      if (grouped[dateKey]) {
        grouped[dateKey].total += order.total;
        grouped[dateKey].ventas += order.ventas;
      } else {
        grouped[dateKey] = { ...order, date: dateKey };
      }
    });
    const groupedOrders = Object.values(grouped);

    const currentMonth = new Date().getMonth()+1;
    const currentYear = new Date().getFullYear();
    const ordersThisMonth = groupedOrders.filter(order => {
      const [year, month] = order.date.split('-').map(Number);
      return month === currentMonth && year === currentYear;
    });
    setChartData(ordersThisMonth);
  }, [orders]);

  const total = React.useMemo(
    () => ({
      total: chartData.reduce((acc, curr) => acc + curr.total, 0),
      ventas: chartData.reduce((acc, curr) => acc + curr.ventas, 0),
    }),
    [chartData]
  )

  React.useEffect(() => {
    console.log(orders);
  }, [orders]);

  const thisMonth = new Date().toLocaleString('default', { month: 'long'});

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle className="text-black">Ventas de {thisMonth}</CardTitle>
          <CardDescription className="text-black">
            la grafica muestra el total de ventas de este mes y el monto total vendido
          </CardDescription>
        </div>
        <div className="flex">
          {["total", "ventas"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6 text-black"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs text-black">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl text-black">
                  {chart === "total"
                    ? `$ ${total[chart as keyof typeof total].toLocaleString()}`
                    : total[chart as keyof typeof total].toLocaleString()
                  }
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                // value es "YYYY-MM-DD"
                const [year, month, day] = value.split('-').map(Number);
                const date = new Date(year, month - 1, day);
                return date.toLocaleDateString("es-ES", {
                  month: "short",
                  day: "numeric",
                });
              }}
              // Estilo para los ticks del eje X
              tick={{ fill: "#000" }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px] text-black bg-white"
                  nameKey="views"
                  labelFormatter={(value) => {
                    // value es "YYYY-MM-DD"
                    const [year, month, day] = value.split('-').map(Number);
                    const date = new Date(year, month - 1, day);
                    return date.toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            {/* Cambia el color de las barras a azul */}
            <Bar dataKey={activeChart} fill="#2563eb" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
