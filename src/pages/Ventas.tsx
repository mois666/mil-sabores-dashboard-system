
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  ShoppingCart, 
  Trash2,
  Calculator,
  Receipt,
  User,
  Calendar
} from 'lucide-react';

interface ProductoVenta {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

interface Venta {
  id: number;
  fecha: string;
  cliente: string;
  productos: ProductoVenta[];
  total: number;
  vendedor: string;
}

const Ventas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPOS, setShowPOS] = useState(false);
  const [carrito, setCarrito] = useState<ProductoVenta[]>([]);
  const [clienteActual, setClienteActual] = useState('');
  
  const [ventas, setVentas] = useState<Venta[]>([
    {
      id: 1,
      fecha: '2024-06-15 10:30',
      cliente: 'María López',
      productos: [
        { id: 1, nombre: 'Torta de Chocolate', precio: 85, cantidad: 1, subtotal: 85 },
        { id: 2, nombre: 'Pasteles de Vainilla', precio: 15, cantidad: 2, subtotal: 30 }
      ],
      total: 115,
      vendedor: 'Ana García'
    },
    {
      id: 2,
      fecha: '2024-06-15 11:45',
      cliente: 'Carlos Ruiz',
      productos: [
        { id: 3, nombre: 'Galletas de Avena', precio: 8, cantidad: 3, subtotal: 24 }
      ],
      total: 24,
      vendedor: 'Ana García'
    }
  ]);

  const productosDisponibles = [
    { id: 1, nombre: 'Torta de Chocolate', precio: 85, stock: 3 },
    { id: 2, nombre: 'Pasteles de Vainilla', precio: 15, stock: 5 },
    { id: 3, nombre: 'Galletas de Avena', precio: 8, stock: 2 },
    { id: 4, nombre: 'Cheesecake de Fresa', precio: 45, stock: 12 }
  ];

  const agregarAlCarrito = (producto: any) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item => 
        item.id === producto.id 
          ? { ...item, cantidad: item.cantidad + 1, subtotal: (item.cantidad + 1) * item.precio }
          : item
      ));
    } else {
      setCarrito([...carrito, {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
        subtotal: producto.precio
      }]);
    }
  };

  const removerDelCarrito = (id: number) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      removerDelCarrito(id);
      return;
    }
    setCarrito(carrito.map(item => 
      item.id === id 
        ? { ...item, cantidad, subtotal: cantidad * item.precio }
        : item
    ));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.subtotal, 0);
  };

  const procesarVenta = () => {
    if (carrito.length === 0 || !clienteActual) return;

    const nuevaVenta: Venta = {
      id: Date.now(),
      fecha: new Date().toLocaleString('es-ES'),
      cliente: clienteActual,
      productos: [...carrito],
      total: calcularTotal(),
      vendedor: 'Usuario Actual'
    };

    setVentas([nuevaVenta, ...ventas]);
    setCarrito([]);
    setClienteActual('');
    setShowPOS(false);
  };

  const filteredVentas = ventas.filter(venta =>
    venta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venta.vendedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Registro de Ventas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona las ventas y punto de venta
          </p>
        </div>
        <Button onClick={() => setShowPOS(true)} className="flex items-center space-x-2 bg-confiteria-success">
          <ShoppingCart className="w-4 h-4" />
          <span>Nueva Venta</span>
        </Button>
      </div>

      {/* Punto de Venta */}
      {showPOS && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Productos Disponibles */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Productos Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productosDisponibles.map(producto => (
                    <div key={producto.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{producto.nombre}</h3>
                        <Badge variant="outline">Stock: {producto.stock}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-confiteria-primary">Bs. {producto.precio}</span>
                        <Button size="sm" onClick={() => agregarAlCarrito(producto)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carrito */}
          <Card>
            <CardHeader>
              <CardTitle>Carrito de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Nombre del cliente"
                  value={clienteActual}
                  onChange={(e) => setClienteActual(e.target.value)}
                />
                
                <div className="space-y-2">
                  {carrito.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium text-sm">{item.nombre}</p>
                        <p className="text-xs text-gray-500">Bs. {item.precio} c/u</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={item.cantidad}
                          onChange={(e) => actualizarCantidad(item.id, Number(e.target.value))}
                          className="w-16 h-8"
                          min="1"
                        />
                        <Button size="sm" variant="outline" onClick={() => removerDelCarrito(item.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {carrito.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>Bs. {calcularTotal()}</span>
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      onClick={procesarVenta}
                      disabled={!clienteActual}
                    >
                      <Receipt className="w-4 h-4 mr-2" />
                      Procesar Venta
                    </Button>
                  </div>
                )}

                <Button variant="outline" className="w-full" onClick={() => setShowPOS(false)}>
                  Cerrar POS
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar ventas por cliente o vendedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Ventas */}
      <div className="space-y-4">
        {filteredVentas.map(venta => (
          <Card key={venta.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Venta #{venta.id}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {venta.fecha}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {venta.cliente}
                    </div>
                    <div className="flex items-center">
                      <span>Vendedor: {venta.vendedor}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-confiteria-success">Bs. {venta.total}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Productos:</h4>
                {venta.productos.map(producto => (
                  <div key={producto.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>{producto.nombre}</span>
                    <span>{producto.cantidad} x Bs. {producto.precio} = Bs. {producto.subtotal}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Ventas;
