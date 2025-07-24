import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const ContactForm = ({ contact, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
        company: contact.company || "",
        notes: contact.notes || ""
      });
    }
  }, [contact]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "Edit Contact" : "Add New Contact"}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ApperIcon name="X" className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              placeholder="Enter full name"
            />

            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              placeholder="Enter email address"
            />

            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
              placeholder="Enter phone number"
            />

            <FormField
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              error={errors.company}
              placeholder="Enter company name"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
                placeholder="Add any notes about this contact..."
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    {isEditing ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>
                    <ApperIcon name={isEditing ? "Save" : "Plus"} className="h-4 w-4 mr-2" />
                    {isEditing ? "Update Contact" : "Add Contact"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;