import { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>
const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => <tr>{text} {value}</tr>

const Statistics = ({ good, netural, bad }) => {

  if (good + netural + bad === 0) return <p>No feedback given</p>

  return (
    <table>
      <td>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"netural"} value={netural} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={good + netural + bad} />
        <StatisticLine text={"average"} value={(good + netural + bad) / 3} />
        <StatisticLine text={"positive"} value={good * 100 / (good + netural + bad) + "%"} />
      </td>
    </table>

  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Title text="give feedback" />
      <div>
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="netural" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <Title text={"statistics"} />

      <Statistics good={good} netural={neutral} bad={bad} />

    </div>
  )
}

export default App