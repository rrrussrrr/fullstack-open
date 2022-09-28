const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part course={props.course1} exercises={props.exercises1}/>
      <Part course={props.course2} exercises={props.exercises2}/>
      <Part course={props.course3} exercises={props.exercises3}/>
    </div>

  )
}

const Part = (props)=>{
  return (
  <p>{props.course} {props.exercises}</p>
  )
}

const Total = (props) => {
  return (
    <p>{props.text} {props.total}</p>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content course1={part1} exercises1={exercises1} course2={part2} course3={part3}
        exercises2={exercises2} exercises3={exercises3}/>
      <Total text= "Number of exercises: " total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App