import React from 'react';
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem";


const InterviewerList = function (props) {
  const intArray = props.interviewers;
  const InterviewerItem = intArray.map((interviewer) =>
    <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
    />
  );
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{InterviewerItem}</ul>
</section>
  )
}


export default InterviewerList;