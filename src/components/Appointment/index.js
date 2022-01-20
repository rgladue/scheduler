import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";



const Appointment = function (props) {
  return (
  
    <article className="appointment">
    <Header time={props.time}/>
    {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
    {!props.interview && <Empty />}
    </article>


  )
}

export default Appointment;