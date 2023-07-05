import { useState } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Container } from './App.styled';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState([...initialContacts]);
  const [filter, setFilter] = useState('');

  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  const handleInputChange = ({ target }) => {
    // this.setState({ [target.name]: target.value });
    setFilter(target.value);
  };

  const addContact = ({ name, number }) => {
    // e.preventDefault();
    // const { contacts } = this.state;

    // const name = e.target.name.value.trim();
    // const number = e.target.number.value.trim();

    const isExist = contacts.find(contact => contact.name === name);
    if (isExist) return alert(`${name} is already in contacts.`);

    // this.setState({
    //   contacts: [...contacts, { name, number, id: nanoid() }],
    // });

    setContacts([{ name, number, id: nanoid() }, ...contacts]);
  };

  const filterContacts = () => {
    // const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDelete = id => {
    // this.setState({
    //   contacts: this.state.contacts.filter(contact => contact.id !== id),
    // });
    const restContacts = contacts.filter(contact => contact.id !== id);
    setContacts(restContacts);
  };

  // const { filter } = this.state;
  const filteredContacts = filterContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm
        // onInputChange={handleInputChange}
        onHandleSubmit={addContact}
      />
      <h2>Contacts</h2>
      <Filter filterValue={filter} onFilterChange={handleInputChange} />
      <ContactList contacts={filteredContacts} onDeleteClick={handleDelete} />
    </Container>
  );
};
