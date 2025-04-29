import { createContext, useContext, useEffect, useReducer } from "react";
import Message from "../components/Message";

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "citiy/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "rejected":
      return {...state, isLoading: false, error: action.payload}
    default:
      throw new Error("unauthorized action");
  }
}

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);

        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({type: "rejected", payload: err.message});
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      dispatch({ type: "citiy/loaded", payload: data });
    } catch (err) {
      dispatch({type: "rejected", payload: err.message});
    } 
  }

  async function addCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();

      dispatch({ type: "cities/created", payload: data });
    } catch (err) {
      dispatch({type: "rejected", payload: err.message});
    } 
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, { method: "delete" });

      dispatch({ type: "cities/deleted", payload: id });
    } catch (err) {
      dispatch({type: "rejected", payload: err.message});
    } 
  }

  
  if (error) return <Message message={error} />

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, useCities };
