import { useQueryClient, useMutation } from "react-query";
import { postAnecdote } from "../services/anecdotes";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";


const AnecdoteForm = () => {
  // eslint-disable-next-line
  const [notificationContent, notificationContentDispatch] =
    useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMudation = useMutation(postAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecdoteMudation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          notificationContentDispatch({ type: "ADDED", payload: content });
          setTimeout(() => {
            notificationContentDispatch({ type: "HIDE" });
          }, 5000);
        },
        onError: (error) => {
          notificationContentDispatch({
            type: "ERROR",
            payload: error.message,
          });
          setTimeout(() => {
            notificationContentDispatch({ type: "HIDE" });
          }, 5000);
        },
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
