import Note from './components/Note'
const Header = (props) => {

  return (
    <h1>{props.name}</h1>
  )
}
const Content = (props) => {
  return (
    <div>
      {/* <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/> */}

      {props.parts.map(part => 
      <Part key={part.id} part={part}/>
      )}
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
    {courses.map(course => 
      <Course key={course.id} course={course}/>
      )}
    </div>
  )
  

}



export default App