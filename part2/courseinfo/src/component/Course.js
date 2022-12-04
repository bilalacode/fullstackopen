const Header = ({ course }) => {

    return (
        <h1>{course}</h1>
    )
}

const Content = ({ parts }) => {

    return (
        <>

            <ul>
                {parts.map((x, ind) => <li key={parts[ind].id}>{parts[ind].name} {parts[ind].exercises}</li>)}
            </ul>
        </>
    )
}


const Total = ({ parts }) => <p><strong>Number of exercise {parts.map(elem => elem.exercises).reduce((x, a) => x + a, 0)}</strong></p>

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course