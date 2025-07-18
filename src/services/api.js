import axios from "axios";
import { apiURL, apiKey } from "../constants/constants";

export const fetchMovies = async ({
  page = 1,
  sort = "year",
  order = "DESC",
  limit = 20,
  actor,
  title,
  search,
} = {}) => {
  try {
    const response = await axios.get(`${apiURL}`, {
      params: {
        sort,
        order,
        limit,
        offset: (page - 1) * limit,
        ...(actor && { actor }),
        ...(title && { title }),
        ...(search && { search }),
      },
      headers: {
        Authorization: apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieById = async (id) => {
  try {
    const response = await axios.get(`${apiURL}/${id}`, {
      headers: {
        Authorization: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    throw error;
  }
};

export const addMovie = async (movie) => {
  try {
    const response = await axios.post(`${apiURL}`, movie, {
      headers: {
        Authorization: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    await axios.delete(`${apiURL}/${id}`, {
      headers: {
        Authorization: apiKey,
      },
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

export const searchMoviesByTitle = async (title) => {
  try {
    const response = await axios.get(`${apiURL}/movies`, {
      params: { title },
      headers: {
        Authorization: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies by title:", error);
    throw error;
  }
};

export const searchMoviesByActor = async (actor) => {
  try {
    const response = await axios.get(`${apiURL}/movies`, {
      params: { actor },
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies by actor:", error);
    throw error;
  }
};

export const importMovies = async (movies) => {
  try {
    const response = await axios.post(`${apiURL}/import`, movies, {
      headers: {
        Authorization: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error importing movies:", error);
    throw error;
  }
};
