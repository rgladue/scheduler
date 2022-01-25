import { useState, useEffect } from "react";
import axios from "axios";




const useApplicationData = () => {



const [state, setState] = useState({
  day: "Monday",
  days: [],
  
  appointments: {},
  interviewers: {}
});
const setDay = day => setState({ ...state, day });

//   const setDays = (days) => {
//     setState(prev => ({ ...prev, days }));
// };
useEffect(() => {
Promise.all([
  axios.get('http://localhost:8001/api/days'),
  axios.get('http://localhost:8001/api/appointments'),
  axios.get('http://localhost:8001/api/interviewers')
]).then((all) => {
  setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
})
.catch((err) => {
  console.log("oh no!",err);
})
}, [])




function bookInterview(id, interview) {
// console.log(id, interview);
const appointment = {
  ...state.appointments[id],
  interview: { ...interview }
};
const appointments = {
  ...state.appointments,
  [id]: appointment
};

setState({
  ...state,
  appointments
});

return axios.put(`/api/appointments/${id}`, {interview})
.then((res) => {
  setState(prev => ({...prev, appointments}));
})

}





function cancelInterview(id) {
const appointment = {
  ...state.appointments[id],
  interview: null
};
const appointments = {
  ...state.appointments,
  [id]: appointment
};

setState({
  ...state,
  appointments
});

return axios.delete(`/api/appointments/${id}`)
.then((res) => {
  setState(prev => ({...prev, appointments}))
})


}


return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}

}

export default useApplicationData;