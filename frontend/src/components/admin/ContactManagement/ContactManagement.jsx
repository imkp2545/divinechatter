import { useState, useEffect } from 'react';
import { FiMail, FiUser, FiCalendar } from 'react-icons/fi';
import { contactApi } from '@api/contactApi';
import { useToast } from '@context/ToastContext';
import { formatDate, formatTime } from '@utils/helpers';
import './ContactManagement.css';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactApi.getContacts();
      setContacts(data);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-management">
      <div className="management-header">
        <h1 className="management-title">Contact Messages</h1>
        <p className="management-subtitle">
          {contacts.length} total message{contacts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {loading ? (
        <div className="management-loading">
          <div className="loading-spinner">ॐ</div>
          <p>Loading messages...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="no-data">
          <FiMail className="no-data-icon" />
          <p>No contact messages yet</p>
        </div>
      ) : (
        <div className="contacts-grid">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="contact-card"
              onClick={() => setSelectedContact(contact)}
            >
              <div className="contact-header">
                <div className="contact-avatar">
                  {contact.name?.charAt(0).toUpperCase()}
                </div>
                <div className="contact-info">
                  <h3 className="contact-name">{contact.name}</h3>
                  <p className="contact-email">{contact.email}</p>
                </div>
              </div>

              <p className="contact-message-preview">
                {contact.message.substring(0, 120)}
                {contact.message.length > 120 ? '...' : ''}
              </p>

              <div className="contact-date">
                <FiCalendar />
                {formatDate(contact.createdAt)} at {formatTime(contact.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedContact && (
        <div className="contact-modal-overlay" onClick={() => setSelectedContact(null)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-header">
              <h2>Contact Message</h2>
              <button className="modal-close" onClick={() => setSelectedContact(null)}>
                ×
              </button>
            </div>

            <div className="contact-modal-body">
              <div className="contact-detail-row">
                <FiUser />
                <div>
                  <strong>Name:</strong>
                  <p>{selectedContact.name}</p>
                </div>
              </div>

              <div className="contact-detail-row">
                <FiMail />
                <div>
                  <strong>Email:</strong>
                  <p>
                    <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>
                  </p>
                </div>
              </div>

              <div className="contact-detail-row">
                <FiCalendar />
                <div>
                  <strong>Date:</strong>
                  <p>
                    {formatDate(selectedContact.createdAt)} at{' '}
                    {formatTime(selectedContact.createdAt)}
                  </p>
                </div>
              </div>

              <div className="contact-message-full">
                <strong>Message:</strong>
                <p>{selectedContact.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;