import React, { useState, useEffect } from "react";
import Header from "@/components/organisms/Header";
import ContactList from "@/components/organisms/ContactList";
import ContactForm from "@/components/organisms/ContactForm";
import ContactDetail from "@/components/organisms/ContactDetail";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { contactService } from "@/services/api/contactService";
import { toast } from "react-toastify";

const ContactsPage = ({ onMenuClick }) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editingContact, setEditingContact] = useState(null);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contactService.getAll();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      setError("Failed to load contacts");
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredContacts(contacts);
      return;
    }

    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      (contact.company && contact.company.toLowerCase().includes(searchValue.toLowerCase()))
    );
    setFilteredContacts(filtered);
  }, [contacts, searchValue]);

  const handleAddContact = async (contactData) => {
    try {
      const newContact = await contactService.create(contactData);
      setContacts(prev => [newContact, ...prev]);
      setShowForm(false);
      toast.success("Contact added successfully!");
    } catch (err) {
      toast.error("Failed to add contact");
      throw err;
    }
  };

  const handleEditContact = async (contactData) => {
    try {
      const updatedContact = await contactService.update(editingContact.Id, contactData);
      setContacts(prev => prev.map(contact => 
        contact.Id === editingContact.Id ? updatedContact : contact
      ));
      setEditingContact(null);
      setShowForm(false);
      if (selectedContact && selectedContact.Id === editingContact.Id) {
        setSelectedContact(updatedContact);
      }
      toast.success("Contact updated successfully!");
    } catch (err) {
      toast.error("Failed to update contact");
      throw err;
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await contactService.delete(contactId);
      setContacts(prev => prev.filter(contact => contact.Id !== contactId));
      toast.success("Contact deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete contact");
      console.error("Error deleting contact:", err);
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowDetail(true);
  };

  const handleEditClick = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedContact(null);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <Header
          title="Contacts"
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onMenuClick={onMenuClick}
          showAddButton={true}
          onAddClick={() => setShowForm(true)}
          addButtonText="Add Contact"
        />
        <div className="flex-1 p-6">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <Header
          title="Contacts"
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onMenuClick={onMenuClick}
          showAddButton={true}
          onAddClick={() => setShowForm(true)}
          addButtonText="Add Contact"
        />
        <div className="flex-1 p-6">
          <Error message={error} onRetry={loadContacts} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <Header
        title="Contacts"
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onMenuClick={onMenuClick}
        showAddButton={true}
        onAddClick={() => setShowForm(true)}
        addButtonText="Add Contact"
      />
      
      <div className="flex-1 p-6 overflow-y-auto">
        {filteredContacts.length === 0 && !searchValue ? (
          <Empty onAction={() => setShowForm(true)} />
        ) : filteredContacts.length === 0 && searchValue ? (
          <Empty 
            title="No matches found"
            message={`No contacts match your search for "${searchValue}". Try a different search term or add a new contact.`}
            actionText="Clear Search"
            onAction={() => setSearchValue("")}
          />
        ) : (
          <ContactList
            contacts={filteredContacts}
            onContactClick={handleContactClick}
            onEditContact={handleEditClick}
            onDeleteContact={handleDeleteContact}
          />
        )}
      </div>

      {showForm && (
        <ContactForm
          contact={editingContact}
          onSubmit={editingContact ? handleEditContact : handleAddContact}
          onCancel={closeForm}
          isEditing={!!editingContact}
        />
      )}

      {showDetail && selectedContact && (
        <ContactDetail
          contact={selectedContact}
          onClose={closeDetail}
          onEdit={handleEditClick}
          onDelete={handleDeleteContact}
        />
      )}
    </div>
  );
};

export default ContactsPage;