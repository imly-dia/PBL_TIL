export interface ILion {
  id: string | number;
  name: string;
  profileImg: string;
  part: 'Frontend' | 'Backend' | 'Design'; 
  skills: string[];
  oneLine: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
  resolution: string;
  isMe: boolean;
}

export interface IApiUser {
  login: { uuid: string };
  name: { first: string; last: string };
  picture: { large: string };
  location: { city: string };
  email: string;
  phone: string;
}

export interface Database {
  public: {
    Tables: {
      lions: {
        Row: {
          id: number;
          created_at: string;
          name: string;
          part: string;
          oneLine: string;
          bio: string;
          profileImg: string;
          email: string;
          phone: string;
          website: string;
          resolution: string;
          skills: string[];
          isMe: boolean;
        };
        Insert: Omit<Database['public']['Tables']['lions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['lions']['Row']>;
      };
    };
  };
}