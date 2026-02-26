import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Friend {
  id: string;
  name: string;
  photo: string;
}

interface FriendsListProps {
  friends: Friend[];
}

export function FriendsList({ friends }: FriendsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Amigos</h3>
      <div className="grid grid-cols-2 gap-3">
        {friends.map((friend) => (
          <Link
            key={friend.id}
            to={`/profile/${friend.id}`}
            className="flex flex-col items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <Avatar className="w-16 h-16">
              <AvatarImage src={friend.photo} alt={friend.name} />
              <AvatarFallback>{friend.name[0]}</AvatarFallback>
            </Avatar>
            <p className="text-sm text-center">{friend.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}