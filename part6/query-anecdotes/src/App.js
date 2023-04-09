import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll } from "./services/anecdotes";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { updateAnecdote } from "./services/anecdotes";
import NotificationContext from "./NotificationContext";
import { useContext } from "react";

const App = () => {
  const [notificationContent, notificationContentDispatch] =
    useContext(NotificationContext);

  const clientQuery = useQueryClient();

  const voteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      clientQuery.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (anecdote) => {
    notificationContentDispatch({ type: "VOTE", payload: anecdote.content });
    setTimeout(() => {
      notificationContentDispatch({ type: "HIDE" });
    }, 5000);
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  
  const result = useQuery("anecdotes", getAll, {
    retry: 1,
  });

  if (result.isLoading) {
    return <div>Anecdotes are loading...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notificationContent} />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
