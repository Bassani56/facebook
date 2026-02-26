import { Header } from "../components/Header";
import { Post } from "../components/Post";
import mockData from "../../data/mock-data.json";

export function Feed() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-2xl mb-6">Feed de Notícias</h2>
        
        {mockData.posts.map((post) => (
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
        ))}
      </main>
    </div>
  );
}
