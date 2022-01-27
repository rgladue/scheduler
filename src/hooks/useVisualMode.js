import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    replace
      ? setHistory((prev) => {
          prev.pop();
          return [...prev, newMode];
        })
      : setHistory([...history, newMode]);

    setMode(newMode);
  };
  const back = () => {
    if (history[history.length - 1] !== initial) {
      history.pop();
      setMode(() => history[history.length - 1]);
    }
  };
  return { mode, transition, back };
}
