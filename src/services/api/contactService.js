import contactsData from "@/services/mockData/contacts.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ContactService {
  constructor() {
    this.contacts = [...contactsData];
  }

  async getAll() {
    await delay(300);
    return [...this.contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    await delay(200);
    const contact = this.contacts.find(contact => contact.Id === parseInt(id));
    if (!contact) {
      throw new Error("Contact not found");
    }
    return { ...contact };
  }

  async create(contactData) {
    await delay(400);
    
    const maxId = this.contacts.reduce((max, contact) => 
      contact.Id > max ? contact.Id : max, 0
    );
    
    const newContact = {
      Id: maxId + 1,
      ...contactData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.contacts.push(newContact);
    return { ...newContact };
  }

  async update(id, contactData) {
    await delay(350);
    
    const index = this.contacts.findIndex(contact => contact.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact not found");
    }
    
    const updatedContact = {
      ...this.contacts[index],
      ...contactData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    this.contacts[index] = updatedContact;
    return { ...updatedContact };
  }

  async delete(id) {
    await delay(250);
    
    const index = this.contacts.findIndex(contact => contact.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact not found");
    }
    
    this.contacts.splice(index, 1);
    return true;
  }
}

export const contactService = new ContactService();