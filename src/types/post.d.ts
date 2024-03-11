interface Post {
  id: number;
  content: string;
  reactions: Reaction[];
}

interface Reaction {
  type: number;
  user: object;
}
