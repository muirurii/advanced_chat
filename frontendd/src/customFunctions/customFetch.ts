const customFetch = async (
  endpoint: string,
  method: string,
  details: any,
  token: string
): Promise<any> => {
  const formattedURL: string = `/api/${endpoint}`;

  try {
    const options = method === "GET" ? null : { body: JSON.stringify(details) };
    const res = await fetch(formattedURL, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accepts: "*/*",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      ...options,
    });

    const data: any = await res.json();

    if (res.status === 200) {
      return {
        success: true,
        data,
      };
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export default customFetch;
