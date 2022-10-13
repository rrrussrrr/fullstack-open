const NewContactForm = (props) => {
    return (
    <div>
    <h3>Add new contact</h3>  
      <form onSubmit={
        props.onSubmit
        }>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.nameInputChange}
          />
        </div>
        <div>
          number: <input 
          value={props.newNumber}
          onChange={props.numberInputChange}
          />
        </div>
        <div>
          <button type="submit">
              add
          </button>
        </div>
      </form>
    </div>
    )
  }

export default NewContactForm