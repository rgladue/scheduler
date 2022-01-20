


export const getAppointmentsForDay = (state, day) => {
  const days = state.days.filter(date => date.name === day);

  if (!days || days.length === 0 || days[0] === undefined) {
    return [];
}
const appIDs = days[0].appointments;
const results = [];
const appArr = Object.values(state.appointments)

for (const item of appArr) {
 if(appIDs.includes(item.id)) {
   results.push(item);
}
}
return results;
}