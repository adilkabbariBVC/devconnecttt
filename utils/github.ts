export const getUserData = async (username: string) => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    return {
      login: data.login,
      name: data.name,
      bio: data.bio,
      avatar_url: data.avatar_url,
      locationName: data.locationName,
      
    };
  } catch (err) {
    console.error('Failed to fetch GitHub user:', username, err);
    return null;
  }
};










// import axios from 'axios';
// import { User } from '../types';



// export const getUserData = async (username: string) => {
//   try {
//     const res = await fetch(`https://api.github.com/users/${username}`);
//     const data = await res.json();

//     // Add custom coordinates if needed (for now, static Calgary coords)
//     return {
//       login: data.login,
//       name: data.name,
//       bio: data.bio,
//       avatar_url: data.avatar_url,
//       locationName: data.location,
//       location: {
//         latitude: 51.0447,
//         longitude: -114.0719,
//       },
//     };
//   } catch (err) {
//     console.error('Failed to fetch GitHub user:', username, err);
//     return null;
//   }
// };






// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'https://api.github.com/',
// });

// export function getUserData(username: string) {
//     return api.get(`https://github.com/users/${username}`).then(({ data }) => data);
// }