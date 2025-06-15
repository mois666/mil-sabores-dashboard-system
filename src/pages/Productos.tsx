
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Package, 
  AlertTriangle,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  descripcion: string;
  imagen?: string;
}

const Productos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: 1,
      nombre: 'Torta de Chocolate',
      categoria: 'Tortas',
      precio: 85,
      stock: 3,
      stockMinimo: 10,
      descripcion: 'Deliciosa torta de chocolate con crema'
    },
    {
      id: 2,
      nombre: 'Pasteles de Vainilla',
      categoria: 'Pasteles',
      precio: 15,
      stock: 5,
      stockMinimo: 15,
      descripcion: 'Pasteles individuales de vainilla'
    },
    {
      id: 3,
      nombre: 'Galletas de Avena',
      categoria: 'Galletas',
      precio: 8,
      stock: 2,
      stockMinimo: 20,
      descripcion: 'Galletas caseras de avena con pasas'
    },
    {
      id: 4,
      nombre: 'Cheesecake de Fresa',
      categoria: 'Postres',
      precio: 45,
      stock: 12,
      stockMinimo: 8,
      descripcion: 'Cheesecake cremoso con fresa natural'
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    nombre: '',
    categoria: '',
    precio: 0,
    stock: 0,
    stockMinimo: 0,
    descripcion: ''
  });

  const categorias = ['Tortas', 'Pasteles', 'Galletas', 'Postres', 'Bebidas', 'Dulces'];

  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || producto.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProductos(productos.map(producto => 
        producto.id === editingProduct.id 
          ? { ...editingProduct, ...newProduct }
          : producto
      ));
      setEditingProduct(null);
    } else {
      const producto: Producto = {
        id: Date.now(),
        ...newProduct
      };
      setProductos([...productos, producto]);
    }
    setNewProduct({ nombre: '', categoria: '', precio: 0, stock: 0, stockMinimo: 0, descripcion: '' });
    setShowForm(false);
  };

  const handleEdit = (producto: Producto) => {
    setNewProduct({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      stock: producto.stock,
      stockMinimo: producto.stockMinimo,
      descripcion: producto.descripcion
    });
    setEditingProduct(producto);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setProductos(productos.filter(producto => producto.id !== id));
  };

  const getStockStatus = (producto: Producto) => {
    if (producto.stock <= 0) return { status: 'Sin stock', color: 'bg-red-500' };
    if (producto.stock <= producto.stockMinimo) return { status: 'Stock bajo', color: 'bg-orange-500' };
    return { status: 'Stock normal', color: 'bg-green-500' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Productos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Administra tu inventario y productos
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nuevo Producto</span>
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Todas las categorías</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Formulario */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Nombre del producto"
                value={newProduct.nombre}
                onChange={(e) => setNewProduct({...newProduct, nombre: e.target.value})}
                required
              />
              <select
                value={newProduct.categoria}
                onChange={(e) => setNewProduct({...newProduct, categoria: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Input
                placeholder="Precio (Bs.)"
                type="number"
                value={newProduct.precio}
                onChange={(e) => setNewProduct({...newProduct, precio: Number(e.target.value)})}
                required
              />
              <Input
                placeholder="Stock actual"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                required
              />
              <Input
                placeholder="Stock mínimo"
                type="number"
                value={newProduct.stockMinimo}
                onChange={(e) => setNewProduct({...newProduct, stockMinimo: Number(e.target.value)})}
                required
              />
              <Input
                placeholder="Descripción"
                value={newProduct.descripcion}
                onChange={(e) => setNewProduct({...newProduct, descripcion: e.target.value})}
                className="md:col-span-2"
              />
              <div className="flex space-x-2 md:col-span-2">
                <Button type="submit">
                  {editingProduct ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                  setNewProduct({ nombre: '', categoria: '', precio: 0, stock: 0, stockMinimo: 0, descripcion: '' });
                }}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProductos.map((producto) => {
          const stockStatus = getStockStatus(producto);
          return (
            <Card key={producto.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-confiteria-primary" />
                    <CardTitle className="text-lg">{producto.nombre}</CardTitle>
                  </div>
                  <Badge className={`${stockStatus.color} text-white text-xs`}>
                    {stockStatus.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Categoría:</span>
                    <Badge variant="outline">{producto.categoria}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Precio:</span>
                    <span className="font-bold text-confiteria-primary">Bs. {producto.precio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Stock:</span>
                    <span className={`font-medium ${producto.stock <= producto.stockMinimo ? 'text-red-500' : 'text-green-500'}`}>
                      {producto.stock} {producto.stock <= producto.stockMinimo && <AlertTriangle className="w-4 h-4 inline ml-1" />}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500">{producto.descripcion}</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(producto)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(producto.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Productos;
