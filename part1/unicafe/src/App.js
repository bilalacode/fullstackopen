const Header = ({course}) => {
  
  return(
    <h1>{course}</h1>
  )
}

const Part = ({part, exercise}) => <p>{part} {exercise}</p>
const Content = ({parts, excercises}) => {
  
  return (
    <>
      <Part part={parts[0]} exercise={excercises[0]}/>
      <Part part={parts[1]} exercise={excercises[1]}/>
      <Part part={parts[2]} exercise={excercises[2]}/>


    </>
  )
}

const Total = ({excercises}) => <p>Number of excercises {excercises.reduce((a, b) => a + b, 0)}</p>

const App = () => {

  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const excercises = [10, 7, 14]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} excercises={excercises} />
      <Total excercises={excercises} />
    </div>
  )
}

export default App