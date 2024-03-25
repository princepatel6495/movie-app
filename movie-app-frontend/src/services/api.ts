import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getTokenAndUserId = () => {
  const userDataString = localStorage.getItem("userData");
  const token = localStorage.getItem("token");
  if (!userDataString || !token) {
    throw new Error("User data or token not found in localStorage");
  }
  const userData = JSON.parse(userDataString);
  const userId = userData._id;
  return { userId, token };
};

export const loginUser = async (userData: any) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMovies = async () => {
  try {
    const { userId, token } = getTokenAndUserId();
    const response = await api.get(`/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-User-Id': userId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchAllMovies = async () => {
  try {
    const response = await api.get(`/movies/get-all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = async (movieId: string) => {
  try {
    const { userId, token } = getTokenAndUserId();
    const response = await api.delete(`/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-User-Id': userId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const addMovie = async (formData: FormData) => {
  try {
    const { token } = getTokenAndUserId();
    const response = await api.post(`/movies`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMovie = async (movieId: string, formData: FormData) => {
  try {
    const { token } = getTokenAndUserId();
    const response = await api.put(`/movies/${movieId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
