import { useState } from "react";
import { Link } from "react-router";
import { Heart, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  timestamp: string;
}

interface PostProps {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  description: string;
  image?: string;
  timestamp: string;
  initialLikes: number;
  initialComments: Comment[];
}

export function Post({
  id,
  userId,
  userName,
  userPhoto,
  description,
  image,
  timestamp,
  initialLikes,
  initialComments,
}: PostProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [comments] = useState<Comment[]>(initialComments);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleShare = () => {
    alert("Funcionalidade de compartilhar: O post seria compartilhado no seu perfil!");
  };

  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    const now = new Date();
    const diffMs = Math.max(0, now.getTime() - date.getTime());
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffHours < 24) return `${Math.max(1, diffHours)}h`;
    if (diffDays < 7) return `${Math.max(1, diffDays)}d`;
    if (diffDays < 28) return `${Math.max(1, diffWeeks)}s`;
    if (diffDays < 365) return `${Math.max(1, diffMonths)}m`;
    return `${Math.max(1, diffYears)}a`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4">
      {/* Header do Post */}
      <div className="p-4 flex items-center gap-3">
        <Link to={`/profile/${userId}`}>
          <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src={userPhoto} alt={userName} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link to={`/profile/${userId}`} className="hover:underline">
            <p className="font-semibold">{userName}</p>
          </Link>
          <p className="text-sm text-gray-500">{formatTimestamp(timestamp)}</p>
        </div>
      </div>

      {/* Descrição */}
      <div className="px-4 pb-3">
        <p>{description}</p>
      </div>

      {/* Imagem */}
      {image && (
        <div className="w-full">
          <img 
            src={image} 
            alt="Post" 
            className="w-full object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Estatísticas */}
      <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-600">
        <span>{likes} curtidas</span>
        <span>{comments.length} comentários</span>
      </div>

      {/* Ações */}
      <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-around">
        <Button
          variant="ghost"
          className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'text-gray-600'}`}
          onClick={handleLike}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span>Curtir</span>
        </Button>

        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5" />
          <span>Compartilhar</span>
        </Button>
      </div>
    </div>
  );
}
