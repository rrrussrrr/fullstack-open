import Note from './components/Note'
const Header = (props) => {

  return (
    <h1>{props.name}</h1>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>

  )
}

const Part = (props)=>{
  return (
  <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((acc, cur) => {return acc + cur.exercises},0);
  return (
    <p>Total exercises: {total}</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}



export default App