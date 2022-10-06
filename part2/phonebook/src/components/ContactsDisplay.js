const ContactsDisplay = ({contacts}) => {
  return (
    <ul>
    {contacts.map(contact => 
      <Contact key={contact.name} name={contact.name} number={contact.number}/>
    )}
    </ul>
  )
}

const Contact = (props) => {
  return (
  <li>
    {props.name} {props.number}
  </li>
  )
}

export default ContactsDisplay