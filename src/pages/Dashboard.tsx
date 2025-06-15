
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MetricCard from '@/components/Dashboard/MetricCard';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { 
  Calendar, 
  User, 
  BookOpen, 
  FileText,
  Plus,
  Grid2x2,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const metrics = [
    {
      title: 'Ventas Hoy',
      value: 'Bs. 2,847',
      change: '+12.3% vs ayer',
      changeType: 'positive' as const,
      icon: Calendar,
      iconColor: 'text-confiteria-success'
    },
    {
      title: 'Productos en Stock',
      value: '156',
      change: '8 productos con stock bajo',
      changeType: 'negative' as const,
      icon: BookOpen,
      iconColor: 'text-confiteria-warning'
    },
    {
      title: 'Clientes Registrados',
      value: '1,234',
      change: '+23 este mes',
      changeType: 'positive' as const,
      icon: User,
      iconColor: 'text-confiteria-primary'
    },
    {
      title: 'Ventas Este Mes',
      value: 'Bs. 48,567',
      change: '+8.2% vs mes anterior',
      changeType: 'positive' as const,
      icon: FileText,
      iconColor: 'text-confiteria-secondary'
    }
  ];

  const quickActions = [
    {
      title: 'Registrar Venta',
      description: 'Nueva venta rápida',
      action: () => navigate('/ventas'),
      icon: Plus,
      bgColor: 'bg-confiteria-primary'
    },
    {
      title: 'Nuevo Producto',
      description: 'Agregar producto',
      action: () => navigate('/productos'),
      icon: BookOpen,
      bgColor: 'bg-confiteria-secondary'
    },
    {
      title: 'Nuevo Cliente',
      description: 'Registrar cliente',
      action: () => navigate('/clientes'),
      icon: User,
      bgColor: 'bg-confiteria-accent'
    },
    {
      title: 'Ver Reportes',
      description: 'Reportes detallados',
      action: () => navigate('/ganancias'),
      icon: Grid2x2,
      bgColor: 'bg-confiteria-warning'
    }
  ];

  // Datos para el gráfico similar a la imagen
  const earningsData = [
    { month: 'Ene', earnings: 60000 },
    { month: 'Feb', earnings: 65000 },
    { month: 'Mar', earnings: 55000 },
    { month: 'Abr', earnings: 52000 },
    { month: 'May', earnings: 48000 },
    { month: 'Jun', earnings: 45000 },
    { month: 'Jul', earnings: 50000 },
    { month: 'Ago', earnings: 58000 },
    { month: 'Sep', earnings: 62000 },
    { month: 'Oct', earnings: 68000 },
    { month: 'Nov', earnings: 75000 },
    { month: 'Dic', earnings: 82000 }
  ];

  const chartConfig = {
    earnings: {
      label: "Ganancias",
      color: "#3B82F6",
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ¡Bienvenido, {user?.fullName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Aquí tienes un resumen de tu confitería hoy
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            iconColor={metric.iconColor}
          />
        ))}
      </div>

      {/* Highlights and Earnings Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Highlights Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Highlights</CardTitle>
              <Button variant="ghost" size="sm">⋯</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">All time sales</p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">Bs. 295.7k</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">+2.7%</span>
                </div>
                <div className="flex space-x-2 mt-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Mil Sabores</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs">Bundle</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-xs">MilSaboresNest</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs">🛍️</span>
                    </div>
                    <span className="text-sm">Online Store</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">Bs. 172k</div>
                    <div className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      3.9%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-xs">f</span>
                    </div>
                    <span className="text-sm">Facebook</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">Bs. 85k</div>
                    <div className="text-xs text-red-600 flex items-center">
                      <span className="mr-1">↓</span>
                      0.7%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-pink-100 rounded flex items-center justify-center">
                      <span className="text-xs">📷</span>
                    </div>
                    <span className="text-sm">Instagram</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">Bs. 36k</div>
                    <div className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      8.2%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Earnings</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Referrals only</span>
                  <div className="w-8 h-4 bg-blue-500 rounded-full relative">
                    <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <select className="text-sm border rounded px-2 py-1">
                  <option>1 month</option>
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>1 year</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                    tickFormatter={(value) => `Bs.${value/1000}k`}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`Bs. ${value}`, 'Ganancias']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="var(--color-earnings)" 
                    strokeWidth={3}
                    dot={{ fill: "var(--color-earnings)", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "var(--color-earnings)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Accesos Rápidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                variant="outline"
                className={`h-24 flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform ${action.bgColor} hover:${action.bgColor} text-white border-0`}
              >
                <action.icon className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Productos con Stock Bajo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Torta de Chocolate', stock: 3, min: 10 },
                { name: 'Pasteles de Vainilla', stock: 5, min: 15 },
                { name: 'Galletas de Avena', stock: 2, min: 20 },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">Stock: {product.stock} (Mín: {product.min})</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Reabastecer
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { cliente: 'María López', monto: 'Bs. 125', tiempo: 'Hace 15 min' },
                { cliente: 'Carlos Ruiz', monto: 'Bs. 89', tiempo: 'Hace 32 min' },
                { cliente: 'Ana García', monto: 'Bs. 156', tiempo: 'Hace 1 hora' },
              ].map((venta, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <p className="font-medium">{venta.cliente}</p>
                    <p className="text-sm text-gray-600">{venta.tiempo}</p>
                  </div>
                  <p className="font-bold text-confiteria-success">{venta.monto}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
