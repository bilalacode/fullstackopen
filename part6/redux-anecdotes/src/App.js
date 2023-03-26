import Anecdotes from "./components/Anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  return (
    <>
    <Notification />
    <Anecdotes />
   <AnecdoteForm />
    </>
  );
};

export default App;
