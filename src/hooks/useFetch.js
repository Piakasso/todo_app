export const useFetch = () => {
  const request = async (
    url,
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });
      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();

      if (Object.keys(data).length > 0 || method !== "GET") {
        return data;
      } else {
        throw new Error("This user doesn't exist");
      }
    } catch (error) {
      throw error;
    }
  };

  return { request };
};
