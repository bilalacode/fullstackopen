import Anecdotes from "./components/Anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);
  return (
    <>
      <Notification />
      <Anecdotes />
      <AnecdoteForm />
    </>
  );
};

export default App;
