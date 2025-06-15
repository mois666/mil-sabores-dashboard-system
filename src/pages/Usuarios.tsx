
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, Plus, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Usuario {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'Administrador' | 'Recepcionista';
  isActive: boolean;
  lastLogin: string;
}

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: '1',
      username: 'admin',
      email: 'admin@milsabores.com',
      fullName: 'Administrador Principal',
      role: 'Administrador',
      isActive: true,
      lastLogin: '2024-01-15 10:30'
    },
    {
      id: '2',
      username: 'recepcionista',
      email: 'recepcion@milsabores.com',
      fullName: 'María González',
      role: 'Recepcionista',
      isActive: true,
      lastLogin: '2024-01-15 09:15'
    },
    {
      id: '3',
      username: 'carlos.ruiz',
      email: 'carlos@milsabores.com',
      fullName: 'Carlos Ruiz',
      role: 'Recepcionista',
      isActive: false,
      lastLogin: '2024-01-10 16:45'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    role: 'Recepcionista' as 'Administrador' | 'Recepcionista',
    password: ''
  });

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      // Actualizar usuario existente
      setUsuarios(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData, id: editingUser.id, lastLogin: user.lastLogin }
          : user
      ));
      toast({
        title: 'Usuario actualizado',
        description: 'Los datos del usuario se han actualizado correctamente',
      });
    } else {
      // Crear nuevo usuario
      const newUser: Usuario = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        lastLogin: 'Nunca'
      };
      setUsuarios(prev => [...prev, newUser]);
      toast({
        title: 'Usuario creado',
        description: 'El nuevo usuario se ha creado correctamente',
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      fullName: '',
      role: 'Recepcionista',
      password: ''
    });
    setShowForm(false);
    setEditingUser(null);
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUser(usuario);
    setFormData({
      username: usuario.username,
      email: usuario.email,
      fullName: usuario.fullName,
      role: usuario.role,
      password: ''
    });
    setShowForm(true);
  };

  const toggleUserStatus = (id: string) => {
    setUsuarios(prev => prev.map(user => 
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ));
    
    const user = usuarios.find(u => u.id === id);
    toast({
      title: `Usuario ${user?.isActive ? 'desactivado' : 'activado'}`,
      description: `El usuario ${user?.fullName} ha sido ${user?.isActive ? 'desactivado' : 'activado'}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra los usuarios del sistema
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-confiteria-primary hover:bg-confiteria-accent"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Formulario */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Nombre Completo</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({...prev, fullName: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="username">Usuario</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({...prev, username: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Rol</Label>
                  <Select value={formData.role} onValueChange={(value: 'Administrador' | 'Recepcionista') => 
                    setFormData(prev => ({...prev, role: value}))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                      <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="password">
                    {editingUser ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                    required={!editingUser}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="bg-confiteria-primary hover:bg-confiteria-accent">
                  {editingUser ? 'Actualizar' : 'Crear'} Usuario
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="space-y-4">
            {filteredUsuarios.map((usuario) => (
              <div key={usuario.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-confiteria-primary flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">{usuario.fullName}</h3>
                    <p className="text-sm text-gray-600">@{usuario.username} • {usuario.email}</p>
                    <p className="text-xs text-gray-500">Último acceso: {usuario.lastLogin}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={usuario.role === 'Administrador' ? 'default' : 'secondary'}>
                    {usuario.role}
                  </Badge>
                  <Badge variant={usuario.isActive ? 'default' : 'destructive'}>
                    {usuario.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(usuario)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant={usuario.isActive ? 'destructive' : 'default'}
                    onClick={() => toggleUserStatus(usuario.id)}
                  >
                    {usuario.isActive ? 'Desactivar' : 'Activar'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Usuarios;
