const LOGINURL = "https://verguldepantoffelbe.onrender.com/api/login"

export const login = async (username, password) => {
  try {
    const response = await fetch(LOGINURL, { // Replace with your deployed backend URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data; // Return the response data
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};