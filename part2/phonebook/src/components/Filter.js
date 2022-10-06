const Filter = (props) => {
    return (
      <div>
      Filter contacts by name: <input 
        value={props.value}
        onChange={props.onChange}
      />
    </div>
    )
  }

  export default Filter