import {
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

import { useAuth } from "../hooks/useAuth";

import {
  getReadings,
  createReading as createReadingAPI,
  updateReading as updateReadingAPI,
  deleteReading as deleteReadingAPI,
} from "../services/readingService";

const ReadingContext = createContext(null);


const initialState = {
  readings: [],
  loading: false,
  error: null,
  initialized: false,
};


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        readings: action.payload,
        loading: false,
        initialized: true,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        initialized: true,
        error: action.payload,
      };

    case "CREATE_SUCCESS":
      return {
        ...state,
        // Prepend and re-sort so newest date + slot order stays consistent
        readings: sortReadings([action.payload, ...state.readings]),
        error: null,
      };

    case "UPDATE_SUCCESS":
      return {
        ...state,
        readings: sortReadings(
          state.readings.map((r) =>
            r.id === action.payload.id ? action.payload : r
          )
        ),
        error: null,
      };

    case "DELETE_SUCCESS":
      return {
        ...state,
        readings: state.readings.filter((r) => r.id !== action.payload),
        error: null,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};


const SLOT_ORDER = {
  morning: 1,
  after_breakfast: 2,
  after_lunch: 3,
  after_dinner: 4,
};


function sortReadings(readings) {
  return [...readings].sort((a, b) => {
    const dateA = a.reading_date || a.date || "";
    const dateB = b.reading_date || b.date || "";

    // Newest date first
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;

    // Same date → slot order
    const slotA = SLOT_ORDER[a.time_slot || a.timeSlot] ?? 5;
    const slotB = SLOT_ORDER[b.time_slot || b.timeSlot] ?? 5;
    return slotA - slotB;
  });
}

// Provider 
export const ReadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, token } = useAuth();

  // Fetch all readings 
  const fetchReadings = useCallback(async () => {
    if (!isAuthenticated || !token) return;

    dispatch({ type: "FETCH_START" });

    try {
      const response = await getReadings();
      const readingsList = Array.isArray(response) ? response : (response?.readings || []);
      dispatch({ type: "FETCH_SUCCESS", payload: readingsList });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload:
          error.response?.data?.message || "Failed to fetch readings.",
      });
    }
  }, [isAuthenticated, token]);

  // Auto-fetch when user logs in; reset when they log out
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchReadings();
    } else {
      dispatch({ type: "RESET" });
    }
  }, [isAuthenticated, token, fetchReadings]);

  //  Add reading 
  const addReading = async (readingData) => {
    try {
      const newReading = await createReadingAPI(readingData);
      dispatch({ type: "CREATE_SUCCESS", payload: newReading });
      return { success: true, reading: newReading };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to add reading.";
      return { success: false, message };
    }
  };

  //  Edit reading
  const editReading = async (id, readingData) => {
    try {
      const updated = await updateReadingAPI(id, readingData);
      dispatch({ type: "UPDATE_SUCCESS", payload: updated });
      return { success: true, reading: updated };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update reading.";
      return { success: false, message };
    }
  };

  //  Delete reading
  const removeReading = async (id) => {
    try {
      await deleteReadingAPI(id);
      dispatch({ type: "DELETE_SUCCESS", payload: id });
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete reading.";
      return { success: false, message };
    }
  };

  const clearError = () => dispatch({ type: "CLEAR_ERROR" });


  const getTodayReadings = useCallback(() => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    return state.readings.filter((r) => {
      // DB returns reading_date as "YYYY-MM-DD" or "YYYY-MM-DDT00:00:00.000Z"
      const rDate = (r.reading_date || r.date || "").slice(0, 10);
      return rDate === today;
    });
  }, [state.readings]);

  /**
   * Get reading count for today (max 4).
   */
  const todayCount = useCallback(() => {
    return getTodayReadings().length;
  }, [getTodayReadings]);

  return (
    <ReadingContext.Provider
      value={{
        ...state,
        fetchReadings,
        addReading,
        editReading,
        removeReading,
        clearError,
        getTodayReadings,
        todayCount,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};

export default ReadingContext;
