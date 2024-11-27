import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const getAccessToken = () => {
  return Cookies.get('authToken');
};

const apiRequests = {
  getAllContacts: () => {
    const accessToken = getAccessToken();
    return api.get('/client/contact', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  deleteContact: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`/admin/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const ContactsSection = () => {
  const [contacts, setContacts] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedContact, setExpandedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllContacts();
      setContacts(response.data);
    } catch (error) {
      setError('Failed to fetch contacts');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch contacts',
        placement: 'topRight',
      });
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async () => {
    try {
      setIsLoading(true);
      await apiRequests.deleteContact(selectedContact._id);
      notification.success({
        message: 'Success',
        description: 'Contact deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedContact(null);
      fetchContacts();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete contact',
        placement: 'topRight',
      });
      setError('Failed to delete contact');
      console.error('Error deleting contact:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = (contactId) => {
    if (expandedContact === contactId) {
      setExpandedContact(null);
    } else {
      setExpandedContact(contactId);
    }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading && !contacts.length) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        CONTACTS
      </motion.h1>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <div key={contact._id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{contact.name}</h3>
              <button
                onClick={() => toggleExpand(contact._id)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                {expandedContact === contact._id ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-2">{contact.email}</p>
            {expandedContact === contact._id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 space-y-2"
              >
                <p className="text-gray-700"><strong>Phone:</strong> {contact.phone}</p>
                <p className="text-gray-700"><strong>Company:</strong> {contact.company}</p>
                <p className="text-gray-700"><strong>Message:</strong> {contact.message}</p>
              </motion.div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setSelectedContact(contact);
                  setIsDeleteOpen(true);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete the contact for "{selectedContact?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedContact(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteContact}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsSection;

