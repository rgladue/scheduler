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
    const targetDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day) => {
      if (
        day.name === targetDay.name &&
        state.appointments[id].interview === null
      ) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
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
    const targetDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day) => {
      if (day.name === targetDay.name) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
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
