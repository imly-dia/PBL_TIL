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
