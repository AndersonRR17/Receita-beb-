'use client';

import { Upload } from 'lucide-react';
import { useState, useRef } from 'react';

interface ProfilePageProps {
  onBack: () => void;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar se é uma imagem válida
      if (file.type.startsWith('image/')) {
        // Verificar tamanho (máximo 10MB)
        if (file.size <= 10 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setProfileImage(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          alert('La imagen debe ser menor a 10MB');
        }
      } else {
        alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, GIF)');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-200">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
            Mi Perfil
          </h1>
          <p className="text-slate-600">
            Ve y edita tu información personal.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Detalles del Perfil
            </h2>
            <p className="text-slate-600 text-sm">
              Mantén tu información actualizada.
            </p>
          </div>

          {/* Profile Photo Section */}
          <div className="flex items-center gap-4 mb-2">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl text-yellow-800">👤</span>
              )}
            </div>
            <button 
              onClick={triggerFileInput}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 text-pink-800 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95"
            >
              <Upload className="w-4 h-4" />
              Subir Foto
            </button>
            {/* Input de arquivo oculto */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          
          <p className="text-xs text-slate-500 mb-6">
            PNG, JPG, GIF de hasta 10MB.
          </p>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Nome Completo */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gradient-to-r from-pink-50 to-yellow-50 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:outline-none transition-colors duration-200"
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                defaultValue="teste@gmail.com"
                className="w-full px-4 py-3 bg-gradient-to-r from-pink-50 to-yellow-50 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:outline-none transition-colors duration-200"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button 
              onClick={onBack}
              className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
            >
              Cerrar Sesión
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95">
              Guardar Cambios
            </button>
          </div>
        </div>

        {/* Espaçamento para navegação inferior */}
        <div className="h-24"></div>
      </div>
    </div>
  );
}
