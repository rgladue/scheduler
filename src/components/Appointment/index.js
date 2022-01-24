import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";

const Appointment = function (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY

  );

  function save(name, interviewer) {
    console.log(name, interviewer);
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)

    transition(SHOW);
  }

  function cancel() {
    transition(DELETING);
    props.cancelInterview(props.id);
    transition(EMPTY);
  }
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message="Saving..."/>}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && <Confirm message="Are You Sure about This???" onCancel={back} onConfirm={cancel}  />}
    </article>
  );
};

export default Appointment;
