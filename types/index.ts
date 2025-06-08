export type RootStackParamList = {
  SignUp: undefined;
  Map: undefined;
  GitHubProfile: { username: string };
};

export interface User {
  login: string;
  location: {
    latitude: number;
    longitude: number;
  };
  avatar_url?: string;
  name?: string;
  bio?: string;
  locationName?: string; // optional readable location name
}






