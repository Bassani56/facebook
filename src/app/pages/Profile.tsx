import { useParams } from "react-router";
import { Header } from "../components/Header";
import { Post } from "../components/Post";
import { FriendsList } from "../components/FriendsList";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import mockData from "../../data/mock-data.json";

export function Profile() {
  const { userId } = useParams();
  
  // Se não houver userId na URL, usa o usuário atual
  const profileUserId = userId || mockData.currentUserId;
  
  // Buscar dados do usuário
  const profileUser = mockData.users.find(u => u.id === profileUserId);
  
  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-600">Usuário não encontrado</p>
          </div>
        </main>
      </div>
    );
  }

  // Pegar dados dos amigos do perfil
  const friends = profileUser.friends.map(friendId => {
    const user = mockData.users.find(u => u.id === friendId);
    return user || { id: friendId, name: "Usuário", photo: "" };
  });

  // Filtrar posts do usuário do perfil
  const userPosts = mockData.posts.filter(post => post.userId === profileUserId);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Cover Photo e Perfil */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          {/* Foto de Capa */}
          <div className="h-64 bg-gradient-to-r from-blue-400 to-blue-600 relative">
            <img 
              src={profileUser.coverPhoto} 
              alt="Capa" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Informações do Perfil */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-[44px] md:-mt-[40px]">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-lg">
                <AvatarImage src={profileUser.photo} alt={profileUser.name} />
                <AvatarFallback className="text-4xl">{profileUser.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 md:mb-4">
                <h1 className="text-3xl">{profileUser.name}</h1>
                <p className="text-gray-600">{profileUser.bio}</p>
                <p className="text-gray-500 mt-2">{profileUser.friends.length} amigos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo em Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna da Esquerda - Amigos */}
          <div className="lg:col-span-1">
            <FriendsList friends={friends} />
          </div>

          {/* Coluna da Direita - Posts */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl mb-4">Posts</h2>
            
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  userId={post.userId}
                  userName={post.userName}
                  userPhoto={post.userPhoto}
                  description={post.description}
                  image={post.image}
                  timestamp={post.timestamp}
                  initialLikes={post.likes}
                  initialComments={post.comments}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                Nenhum post ainda
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
