import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { contentApi } from '@api/contentApi';
import { useToast } from '@context/ToastContext';
import { formatDate } from '@utils/helpers';
import Button from '@components/common/Button/Button';
import Modal from '@components/common/Modal/Modal';
import './ContentManagement.css';

const ComingSoonManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    launchInfo: '',
    expectedDate: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await contentApi.getComingSoon();
      setItems(data);
    } catch (error) {
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', launchInfo: '', expectedDate: '' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      launchInfo: item.launchInfo || '',
      expectedDate: item.expectedDate ? item.expectedDate.split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;

    try {
      await contentApi.deleteComingSoon(id);
      toast.success('Item deleted');
      fetchItems();
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    try {
      setSubmitting(true);

      if (editingItem) {
        await contentApi.updateComingSoon(editingItem._id, formData);
        toast.success('Item updated');
      } else {
        await contentApi.createComingSoon(formData);
        toast.success('Item created');
      }

      setShowModal(false);
      fetchItems();
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="content-section">
      <div className="section-header-with-action">
        <h2 className="section-title">Coming Soon Products</h2>
        <button className="btn-primary" onClick={handleAdd}>
          <FiPlus /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="management-loading">Loading products...</div>
      ) : items.length === 0 ? (
        <div className="no-data">
          <p>No coming soon products</p>
          <button className="btn-primary" onClick={handleAdd}>
            <FiPlus /> Add First Product
          </button>
        </div>
      ) : (
        <div className="content-list">
          {items.map((item) => (
            <div key={item._id} className="content-item">
              <div className="content-item-body">
                <h3 className="content-item-title">{item.name}</h3>
                {item.launchInfo && <p className="content-item-text">{item.launchInfo}</p>}
                {item.expectedDate && (
                  <p className="content-item-date">
                    Expected: {formatDate(item.expectedDate)}
                  </p>
                )}
              </div>
              <div className="content-item-actions">
                <button className="action-btn edit" onClick={() => handleEdit(item)}>
                  <FiEdit />
                </button>
                <button className="action-btn delete" onClick={() => handleDelete(item._id)}>
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
        title={editingItem ? 'Edit Coming Soon Product' : 'Add Coming Soon Product'}
      >
        <form onSubmit={handleSubmit} className="content-form">
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input
              type="text"
              className="input-divine"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Launch Information</label>
            <textarea
              className="input-divine"
              rows="3"
              value={formData.launchInfo}
              onChange={(e) => setFormData({ ...formData, launchInfo: e.target.value })}
              placeholder="Optional launch details"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Expected Launch Date</label>
            <input
              type="date"
              className="input-divine"
              value={formData.expectedDate}
              onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <Button type="submit" variant="primary" loading={submitting}>
              {editingItem ? 'Update' : 'Create'}
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

export default ComingSoonManagement;