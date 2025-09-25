'use client';

interface FeedPageProps {
  onBack: () => void;
}

const feedPosts = [
  {
    id: 1,
    name: "María González",
    location: "Colombia",
    time: "Hace 2 horas",
    avatar: "👩‍⚕️",
    content: "Desde que me especialicé en nutrición infantil, mis oportunidades laborales se duplicaron. Ahora trabajo en proyectos más grandes y mejor pagados. ¡Fue un cambio total en mi carrera!"
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    location: "México",
    time: "Hace 1 día",
    avatar: "👨‍🍳",
    content: "Entender a fondo la alimentación de bebés me dio la confianza para emprender mi propio negocio. Hoy ofrezco servicios de consultoría nutricional y mis ingresos han crecido más de lo que imaginaba."
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    location: "España",
    time: "Hace 3 días",
    avatar: "👩‍🎓",
    content: "Las recetas y guías que aprendí me han permitido ayudar a cientos de familias. Ver el crecimiento saludable de los bebés que sigo es la mayor recompensa de mi trabajo."
  },
  {
    id: 4,
    name: "Diego Silva",
    location: "Argentina",
    time: "Hace 1 semana",
    avatar: "👨‍⚕️",
    content: "Como pediatra, estos conocimientos complementaron perfectamente mi formación. Ahora puedo ofrecer un servicio integral a mis pacientes y sus familias."
  }
];

export default function FeedPage({ onBack }: FeedPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-200">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
            Feed
          </h1>
          <p className="text-slate-600">
            Últimas noticias y actualizaciones de la escuela.
          </p>
        </div>

        {/* Feed Posts */}
        <div className="max-w-2xl mx-auto space-y-6 pb-32">
          {feedPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              {/* Post Header */}
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-lg">{post.avatar}</span>
                </div>
                
                {/* User Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-sm">
                    {post.name}, {post.location}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {post.time}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <div className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-xl p-4 border-l-4 border-yellow-400">
                <p className="text-slate-700 text-sm leading-relaxed">
                  {post.content}
                </p>
              </div>
            </div>
          ))}

          {/* Load More Button */}
          <div className="text-center pt-6">
            <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95">
              Cargar más publicaciones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
