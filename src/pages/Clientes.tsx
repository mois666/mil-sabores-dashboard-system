
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  User, 
  Phone, 
  Mail,
  Star,
  Edit,
  Trash2
} from 'lucide-react';

interface Cliente {
  id: number;
  ci: string;
  nombre: string;
  telefono: string;
  email: string;
  frecuente: boolean;
  totalCompras: number;
  ultimaCompra: string;
}

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Cliente | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: 1,
      ci: '12345678',
      nombre: 'María López García',
      telefono: '75123456',
      email: 'maria.lopez@email.com',
      frecuente: true,
      totalCompras: 2450,
      ultimaCompra: '2024-06-14'
    },
    {
      id: 2,
      ci: '87654321',
      nombre: 'Carlos Ruiz Mendoza',
      telefono: '76987654',
      email: 'carlos.ruiz@email.com',
      frecuente: false,
      totalCompras: 890,
      ultimaCompra: '2024-06-13'
    },
    {
      id: 3,
      ci: '11223344',
      nombre: 'Ana García Silva',
      telefono: '77445566',
      email: 'ana.garcia@email.com',
      frecuente: true,
      totalCompras: 3200,
      ultimaCompra: '2024-06-15'
    },
  ]);

  const [newClient, setNewClient] = useState({
    ci: '',
    nombre: '',
    telefono: '',
    email: '',
    frecuente: false
  });

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.ci.includes(searchTerm) ||
    cliente.telefono.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      setClientes(clientes.map(cliente => 
        cliente.id === editingClient.id 
          ? { ...editingClient, ...newClient }
          : cliente
      ));
      setEditingClient(null);
    } else {
      const cliente: Cliente = {
        id: Date.now(),
        ...newClient,
        totalCompras: 0,
        ultimaCompra: new Date().toISOString().split('T')[0]
      };
      setClientes([...clientes, cliente]);
    }
    setNewClient({ ci: '', nombre: '', telefono: '', email: '', frecuente: false });
    setShowForm(false);
  };

  const handleEdit = (cliente: Cliente) => {
    setNewClient({
      ci: cliente.ci,
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      email: cliente.email,
      frecuente: cliente.frecuente
    });
    setEditingClient(cliente);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Clientes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Administra la información de tus clientes
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nuevo Cliente</span>
        </Button>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, CI o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Formulario */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Cédula de Identidad"
                value={newClient.ci}
                onChange={(e) => setNewClient({...newClient, ci: e.target.value})}
                required
              />
              <Input
                placeholder="Nombre completo"
                value={newClient.nombre}
                onChange={(e) => setNewClient({...newClient, nombre: e.target.value})}
                required
              />
              <Input
                placeholder="Teléfono"
                value={newClient.telefono}
                onChange={(e) => setNewClient({...newClient, telefono: e.target.value})}
                required
              />
              <Input
                placeholder="Email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
              />
              <div className="flex items-center space-x-2 md:col-span-2">
                <input
                  type="checkbox"
                  id="frecuente"
                  checked={newClient.frecuente}
                  onChange={(e) => setNewClient({...newClient, frecuente: e.target.checked})}
                />
                <label htmlFor="frecuente">Cliente frecuente</label>
              </div>
              <div className="flex space-x-2 md:col-span-2">
                <Button type="submit">
                  {editingClient ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setShowForm(false);
                  setEditingClient(null);
                  setNewClient({ ci: '', nombre: '', telefono: '', email: '', frecuente: false });
                }}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClientes.map((cliente) => (
          <Card key={cliente.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-confiteria-primary" />
                  <CardTitle className="text-lg">{cliente.nombre}</CardTitle>
                </div>
                {cliente.frecuente && (
                  <Badge className="bg-confiteria-warning text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Frecuente
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">CI:</span>
                  <span className="ml-2">{cliente.ci}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{cliente.telefono}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{cliente.email}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Total compras:</span>
                    <span className="font-bold text-confiteria-success">Bs. {cliente.totalCompras}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Última compra:</span>
                    <span>{new Date(cliente.ultimaCompra).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline" onClick={() => handleEdit(cliente)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(cliente.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clientes;
