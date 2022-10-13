const ContactsDisplay = ({contacts, deleteContactByID}) => {
    return (
      <ul>
      {contacts.map(contact => 
        <Contact key={contact.name} name={contact.name} number={contact.number} onClick={() => deleteContactByID(contact.id)}/>
      )}
      </ul>
    )
  }
  
  const Contact = (props) => {
    return (
    <li>
      {props.name} {props.number} <button onClick={props.onClick}>delete</button>
    </li>
    )
  }
  
  export default ContactsDisplay