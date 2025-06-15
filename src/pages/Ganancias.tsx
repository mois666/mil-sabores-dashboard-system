
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Download,
  BarChart3,
  PieChart
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Ganancias = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const datosVentas = [
    { mes: 'Ene', ventas: 48000, gastos: 32000, ganancia: 16000 },
    { mes: 'Feb', ventas: 52000, gastos: 35000, ganancia: 17000 },
    { mes: 'Mar', ventas: 45000, gastos: 30000, ganancia: 15000 },
    { mes: 'Abr', ventas: 58000, gastos: 38000, ganancia: 20000 },
    { mes: 'May', ventas: 62000, gastos: 40000, ganancia: 22000 },
    { mes: 'Jun', ventas: 68000, gastos: 42000, ganancia: 26000 },
  ];

  const datosSemanales = [
    { dia: 'Lun', monto: 2400 },
    { dia: 'Mar', monto: 1800 },
    { dia: 'Mié', monto: 3200 },
    { dia: 'Jue', monto: 2800 },
    { dia: 'Vie', monto: 3800 },
    { dia: 'Sáb', monto: 4200 },
    { dia: 'Dom', monto: 3600 },
  ];

  const metricas = [
    {
      titulo: 'Ingresos Totales',
      valor: 'Bs. 68,543',
      cambio: '+12.3%',
      tipo: 'positivo',
      icon: DollarSign,
      descripcion: 'vs mes anterior'
    },
    {
      titulo: 'Gastos Totales',
      valor: 'Bs. 42,180',
      cambio: '+5.1%',
      tipo: 'neutro',
      icon: TrendingDown,
      descripcion: 'vs mes anterior'
    },
    {
      titulo: 'Ganancia Neta',
      valor: 'Bs. 26,363',
      cambio: '+18.7%',
      tipo: 'positivo',
      icon: TrendingUp,
      descripcion: 'vs mes anterior'
    },
    {
      titulo: 'Margen de Ganancia',
      valor: '38.5%',
      cambio: '+2.1%',
      tipo: 'positivo',
      icon: BarChart3,
      descripcion: 'vs mes anterior'
    }
  ];

  const topProductos = [
    { nombre: 'Torta de Chocolate', ventas: 45, ingresos: 3825 },
    { nombre: 'Pasteles de Vainilla', ventas: 120, ingresos: 1800 },
    { nombre: 'Cheesecake de Fresa', ventas: 32, ingresos: 1440 },
    { nombre: 'Galletas de Avena', ventas: 180, ingresos: 1440 },
  ];

  const gastosPorCategoria = [
    { categoria: 'Ingredientes', monto: 25000, porcentaje: 59 },
    { categoria: 'Personal', monto: 12000, porcentaje: 28 },
    { categoria: 'Servicios', monto: 3500, porcentaje: 8 },
    { categoria: 'Otros', monto: 1680, porcentaje: 5 },
  ];

  const chartConfig = {
    ventas: {
      label: "Ventas",
      color: "#3B82F6",
    },
    gastos: {
      label: "Gastos",
      color: "#EF4444",
    },
    ganancia: {
      label: "Ganancia",
      color: "#10B981",
    },
    monto: {
      label: "Monto",
      color: "#3B82F6",
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Módulo de Ganancias
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Análisis financiero y reportes detallados
          </p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="year">Este año</option>
          </select>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricas.map((metrica, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {metrica.titulo}
              </CardTitle>
              <metrica.icon className="h-5 w-5 text-confiteria-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrica.valor}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={`${
                  metrica.tipo === 'positivo' ? 'bg-green-100 text-green-800' :
                  metrica.tipo === 'negativo' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {metrica.cambio}
                </Badge>
                <span className="text-xs text-gray-500">{metrica.descripcion}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de tendencias */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Ingresos vs Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={datosVentas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="var(--color-ventas)" 
                    strokeWidth={3}
                    dot={{ fill: "var(--color-ventas)" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="gastos" 
                    stroke="var(--color-gastos)" 
                    strokeWidth={3}
                    dot={{ fill: "var(--color-gastos)" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ganancia" 
                    stroke="var(--color-ganancia)" 
                    strokeWidth={3}
                    dot={{ fill: "var(--color-ganancia)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico semanal */}
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Día (Esta Semana)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={datosSemanales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="monto" 
                    fill="var(--color-monto)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Análisis detallado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top productos */}
        <Card>
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProductos.map((producto, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{producto.nombre}</p>
                    <p className="text-sm text-gray-600">{producto.ventas} unidades vendidas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-confiteria-success">Bs. {producto.ingresos}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gastos por categoría */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gastosPorCategoria.map((gasto, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{gasto.categoria}</span>
                    <span className="font-bold">Bs. {gasto.monto.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-confiteria-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${gasto.porcentaje}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {gasto.porcentaje}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumen del período */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del Período</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Total Transacciones</h3>
              <p className="text-3xl font-bold text-confiteria-primary">847</p>
              <p className="text-sm text-gray-600">+23% vs periodo anterior</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Ticket Promedio</h3>
              <p className="text-3xl font-bold text-confiteria-secondary">Bs. 81</p>
              <p className="text-sm text-gray-600">+8% vs periodo anterior</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">ROI</h3>
              <p className="text-3xl font-bold text-confiteria-success">162%</p>
              <p className="text-sm text-gray-600">+15% vs periodo anterior</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ganancias;
