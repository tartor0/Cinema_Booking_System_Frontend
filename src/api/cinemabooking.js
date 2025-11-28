import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/cinemas";

// Fetch all cinema bookings
export const getAllCinemaBookings = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching cinema bookings:", error);
    throw error;
  }
};

// Fetch single cinema booking by ID
export const getCinemaBookingById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cinema booking ${id}:`, error);
    throw error;
  }
};

// Create new cinema booking with posters and trailer
export const createCinemaBooking = async (cinemaData, posters, trailer) => {
  try {
    const formData = new FormData();

    // Add cinema data as JSON string
    formData.append("cinemaBooking", JSON.stringify(cinemaData));

    // Add posters (multiple images)
    if (posters && posters.length > 0) {
      posters.forEach((poster) => {
        formData.append("posters", poster);
      });
    }

    // Add trailer (single video file)
    if (trailer) {
      formData.append("trailer", trailer);
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating cinema booking:", error);
    throw error;
  }
};

// Update existing cinema booking
export const updateCinemaBooking = async (id, cinemaData, posters, trailer) => {
  try {
    const formData = new FormData();

    // Add cinema data as JSON string
    formData.append("cinemaBooking", JSON.stringify(cinemaData));

    // Add new posters if provided
    if (posters && posters.length > 0) {
      posters.forEach((poster) => {
        formData.append("posters", poster);
      });
    }

    // Add new trailer if provided
    if (trailer) {
      formData.append("trailer", trailer);
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error updating cinema booking ${id}:`, error);
    throw error;
  }
};

// Delete cinema booking
export const deleteCinemaBooking = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting cinema booking ${id}:`, error);
    throw error;
  }
};