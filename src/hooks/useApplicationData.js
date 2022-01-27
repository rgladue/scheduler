import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {

  // STATE VARIABLE

  const [state, setState] = useState({
    day: "Monday",
    days: [],

    appointments: {},
    interviewers: {},
  });

//SETDAY FUNCTION

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ])
      .then((all) => {
        // SETTING STATE FOR DAY INFORMATION
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => {
        console.log("oh no!", err);
      });
  }, []);

  // BOOKINTERVIEW FUNCTION

  function bookInterview(id, interview) {
   
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({
      ...state,
      appointments,
    });

    return axios.put(`/api/appointments/${id}`, { interview })
    .then((res) => {
      //filter through days to check if day name matches day of new appointment and adjust spots +1
      const spots =
        state.days.filter((curr) => curr.name === state.day)[0].spots - 1;
      const days = state.days.map((current) => {
        if (current.name === state.day) {
          return { ...current, spots };
        }
        return { ...current };
      });

      setState((prev) => ({
        ...prev,
        days,
      }));
    });
  }

  // CANCELINTERVIEW FUNCTION

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({
      ...state,
      appointments,
    });

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      //filter through days to check if day name matches day of deleted appointment and adjust spots -1
      const spots =
        state.days.filter((date) => date.name === state.day)[0].spots + 1;

      const days = state.days.map((current) => {
        if (current.name === state.day) {
          return { ...current, spots };
        }
        return { ...current };
      });

      setState((prev) => ({
        ...prev,
        appointments,
        days,
      }));
    });
  }


  //EXPORTING USEAPPLICATIONDATA HOOK/FUNCTIONS
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
