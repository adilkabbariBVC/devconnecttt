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








