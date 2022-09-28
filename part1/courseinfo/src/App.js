const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) => {
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
      <Content course={part1} exercises={exercises1}/>
      <Content course={part2} exercises={exercises2}/>
      <Content course={part3} exercises={exercises3}/>
      <Total text= "Number of exercises: " total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App