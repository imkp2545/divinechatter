import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { contentApi } from '../../../api/contentApi';
import { useToast } from '../../../context/ToastContext';
import Button from '../../common/Button/Button';
import Modal from '../../common/Modal/Modal';

const FAQManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const data = await contentApi.getFaqs();
      setFaqs(data);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
      toast.error('Failed to fetch FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingFaq(null);
    setFormData({ question: '', answer: '' });
    setShowModal(true);
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      await contentApi.deleteFaq(id);
      toast.success('FAQ deleted successfully');
      fetchFaqs();
    } catch (error) {
      toast.error('Failed to delete FAQ');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error('Question and answer are required');
      return;
    }

    try {
      setSubmitting(true);

      if (editingFaq) {
        await contentApi.updateFaq(editingFaq._id, formData);
        toast.success('FAQ updated successfully');
      } else {
        await contentApi.createFaq(formData);
        toast.success('FAQ created successfully');
      }

      setShowModal(false);
      fetchFaqs();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="content-section">
      <div className="section-header-with-action">
        <div>
          <h2 className="section-title">FAQ Management</h2>
          <p className="section-subtitle">{faqs.length} FAQ{faqs.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn-primary" onClick={handleAdd}>
          <FiPlus /> Add FAQ
        </button>
      </div>

      {loading ? (
        <div className="management-loading">
          <div className="loading-spinner">ॐ</div>
          <p>Loading FAQs...</p>
        </div>
      ) : faqs.length === 0 ? (
        <div className="no-data">
          <div className="empty-icon">📿</div>
          <p>No FAQs yet. Create your first FAQ to get started.</p>
          <button className="btn-primary" onClick={handleAdd}>
            <FiPlus /> Add First FAQ
          </button>
        </div>
      ) : (
        <div className="content-list">
          {faqs.map((faq, index) => (
            <div key={faq._id} className="content-item">
              <div className="content-item-number">{index + 1}</div>
              <div className="content-item-body">
                <h3 className="content-item-title">{faq.question}</h3>
                <p className="content-item-text">{faq.answer}</p>
              </div>
              <div className="content-item-actions">
                <button className="action-btn edit" onClick={() => handleEdit(faq)} title="Edit">
                  <FiEdit />
                </button>
                <button className="action-btn delete" onClick={() => handleDelete(faq._id)} title="Delete">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
      >
        <form onSubmit={handleSubmit} className="content-form">
          <div className="form-group">
            <label className="form-label">Question *</label>
            <input
              type="text"
              className="input-divine"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="Enter the question"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Answer *</label>
            <textarea
              className="input-divine"
              rows="6"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Enter the answer"
            />
          </div>

          <div className="form-actions">
            <Button type="submit" variant="primary" loading={submitting}>
              {editingFaq ? 'Update FAQ' : 'Create FAQ'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FAQManagement;