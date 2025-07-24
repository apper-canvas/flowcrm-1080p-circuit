import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const ContactDetail = ({ contact, onClose, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(contact.Id);
    onClose();
  };

  if (!contact) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ApperIcon name="X" className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Contact Header */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl mr-4">
                <span className="text-white font-bold text-2xl">
                  {contact.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{contact.name}</h3>
                <p className="text-gray-600">{contact.company || "No company"}</p>
              </div>
            </div>

            {/* Contact Information */}
            <Card className="p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <ApperIcon name="Mail" className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ApperIcon name="Phone" className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ApperIcon name="Building2" className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="text-gray-900">{contact.company || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Notes */}
            {contact.notes && (
              <Card className="p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Notes</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{contact.notes}</p>
              </Card>
            )}

            {/* Metadata */}
            <Card className="p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Details</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
                  <span>Created: {format(new Date(contact.createdAt), "MMM d, yyyy 'at' h:mm a")}</span>
                </div>
                <div className="flex items-center">
                  <ApperIcon name="Clock" className="h-4 w-4 mr-2" />
                  <span>Updated: {format(new Date(contact.updatedAt), "MMM d, yyyy 'at' h:mm a")}</span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center"
              >
                <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
                Delete
              </Button>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="secondary"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  onClick={() => onEdit(contact)}
                  className="flex items-center"
                >
                  <ApperIcon name="Edit2" className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-10"
        >
          <div className="bg-white rounded-xl shadow-2xl p-6 m-4 max-w-sm w-full">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mr-3">
                <ApperIcon name="AlertTriangle" className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Contact</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>{contact.name}</strong>?
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                className="flex items-center"
              >
                <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactDetail;