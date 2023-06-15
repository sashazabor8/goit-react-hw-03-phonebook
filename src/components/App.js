import React, { Component } from 'react';
import Container from './Container';
import Form from './Form';
import Contacts from './Contacts';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsParse = JSON.parse(localStorage.getItem('contacts'));
    if (contactsParse) this.setState({ contacts: contactsParse });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  filterChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  addContact = newContact => {
    if (
      this.state.contacts.find(
        ({ name }) =>
          newContact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    this.setState({
      contacts: [...this.state.contacts, newContact],
    });
  };

  getFilteredList = () => {
    if (this.state.contacts.length === 0) return [];
    const { filter, contacts } = this.state;

    const optimizedFilter = filter.toLocaleLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(optimizedFilter)
    );
  };

  removeContacts = removeId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== removeId),
    }));
  };

  render() {
    return (
      <>
        <Container title="Phonebook">
          <Form addContact={this.addContact} />
        </Container>
        <Container title="Contacts">
          <Filter filter={this.state.filter} filterChange={this.filterChange} />
          <Contacts
            contacts={this.getFilteredList()}
            removeContacts={this.removeContacts}
          />
        </Container>
      </>
    );
  }
}

export default App;
