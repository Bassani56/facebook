import { useParams } from "react-router";
import { Header } from "../components/Header";
import { Post } from "../components/Post";
import { FriendsList } from "../components/FriendsList";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import mockData from "../../data/mock-data.json";

export function Profile() {
  const { userId } = useParams();
  const profileUserId = userId || mockData.currentUserId;
  const profileUser = mockData.users.find((u) => u.id === profileUserId);

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-600">Usuario nao encontrado</p>
          </div>
        </main>
      </div>
    );
  }

  const isMaxNetProfile = profileUser.id === "maxnet";
  const maxNetFollowers = mockData.users.filter((user) => user.id !== "maxnet");
  const followerCount = isMaxNetProfile ? maxNetFollowers.length : profileUser.friends.length;
  const friendIds = isMaxNetProfile
    ? maxNetFollowers.map((user) => user.id)
    : profileUser.friends;
  const friends = friendIds
    .map((friendId) => {
      const user = mockData.users.find((u) => u.id === friendId);
      return user || { id: friendId, name: "Usuario", photo: "" };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }));
  const userPosts = mockData.posts.filter((post) => post.userId === profileUserId);
  const userPhotos = userPosts.filter((post) => post.image);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {isMaxNetProfile ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
              <div className="h-64 bg-gradient-to-r from-blue-400 to-blue-600 relative">
                <img src={profileUser.coverPhoto} alt="Capa" className="w-full h-full object-cover" />
              </div>
              <div className="relative px-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-[44px] md:-mt-[40px]">
                  <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-lg">
                    <AvatarImage src={profileUser.photo} alt={profileUser.name} />
                    <AvatarFallback className="text-4xl">{profileUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 md:mb-4">
                    <h1 className="text-3xl">{profileUser.name}</h1>
                    <p className="text-gray-600">{profileUser.bio}</p>
                    <p className="text-gray-500 mt-2">{followerCount} seguidores</p>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="gap-4">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="all">Tudo</TabsTrigger>
                <TabsTrigger value="photos">Fotos</TabsTrigger>
                <TabsTrigger value="followers">Seguidores</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <h2 className="text-2xl mb-4">Tudo</h2>
                {userPosts.length > 0 ? (
                  userPosts.map((post, index) => (
                    <Post
                      key={`${post.userId}-${post.id}-${post.timestamp}-${index}`}
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
              </TabsContent>

              <TabsContent value="photos">
                {userPhotos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-white rounded-lg shadow-md p-4">
                    {userPhotos.map((post, index) => (
                      <img
                        key={`${post.id}-${index}`}
                        src={post.image}
                        alt={`Foto ${index + 1} de ${profileUser.name}`}
                        className="w-full h-40 md:h-48 object-cover rounded-md"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                    Nenhuma foto ainda
                  </div>
                )}
              </TabsContent>

              <TabsContent value="followers">
                <FriendsList friends={friends} title="Seguidores" />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
              <div className="h-64 bg-gradient-to-r from-blue-400 to-blue-600 relative">
                <img src={profileUser.coverPhoto} alt="Capa" className="w-full h-full object-cover" />
              </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <FriendsList friends={friends} />
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-2xl mb-4">Posts</h2>
                {userPosts.length > 0 ? (
                  userPosts.map((post, index) => (
                    <Post
                      key={`${post.userId}-${post.id}-${post.timestamp}-${index}`}
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
          </>
        )}
      </main>
    </div>
  );
}
