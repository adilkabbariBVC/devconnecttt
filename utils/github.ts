import axios from 'axios';
import { User } from '../types';



export const getUserData = async (username: string) => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    // Add custom coordinates if needed (for now, static Calgary coords)
    return {
      login: data.login,
      name: data.name,
      bio: data.bio,
      avatar_url: data.avatar_url,
      locationName: data.location,
      location: {
        latitude: 51.0447,
        longitude: -114.0719,
      },
    };
  } catch (err) {
    console.error('Failed to fetch GitHub user:', username, err);
    return null;
  }
};



// export const getUserData = async (username: string): Promise<User> => {
//   try {
//     const response = await axios.get(`https://api.github.com/users/${username}`);
//     const data = response.data;

//     // You can use static coordinates or geocode the location if needed.
//     // For now, use fallback coordinates if location is not available.
//     const location = {
//       latitude: 51.0447, // Default to Calgary
//       longitude: -114.0719,
//     };

//     return {
//       login: data.login,
//       location,
//     };
//   } catch  {
//     throw new Error('Failed to fetch GitHub profile');
//   }
// };






// // utils/github.ts
// import axios from 'axios';

// export async function fetchGithubProfile(username: string) {
//   try {
//     const response = await axios.get(`https://api.github.com/users/${username}`);
//     return response.data; // returns the profile data
//   } catch (error) {
//     console.error('GitHub API error:', error);
//     throw new Error('Could not fetch GitHub profile');
//   }
// }



