export const getSignedUrl = async (file) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/get-signed-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename: file.name, filetype: file.type }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to get signed URL');
    }
  
    return await response.json(); // should return { url, key }
  };
  