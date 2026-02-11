import { useState } from 'react';
import { FiX, FiUpload } from 'react-icons/fi';
import { productApi } from '@api/productApi';
import { useToast } from '@context/ToastContext';
import Button from '@components/common/Button/Button';

const ProductForm = ({ product, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    features: product?.features || [],
    isLive: product?.isLive ?? true
  });
  const [featureInput, setFeatureInput] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState(product?.images || []);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = async (publicId) => {
    if (!window.confirm('Delete this image?')) return;

    try {
      await productApi.deleteProductImage(product._id, publicId);
      setExistingImages((prev) => prev.filter((img) => img.publicId !== publicId));
      toast.success('Image deleted');
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('features', JSON.stringify(formData.features));
      data.append('isLive', formData.isLive);

      images.forEach((image) => {
        data.append('images', image);
      });

      if (product) {
        await productApi.updateProduct(product._id, data);
        toast.success('Product updated successfully');
      } else {
        await productApi.createProduct(data);
        toast.success('Product created successfully');
      }

      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label className="form-label">Product Name *</label>
        <input
          type="text"
          name="name"
          className="input-divine"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="input-divine"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Features</label>
        <div className="feature-input-group">
          <input
            type="text"
            className="input-divine"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            placeholder="Add a feature"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
          />
          <button type="button" className="btn-secondary" onClick={handleAddFeature}>
            Add
          </button>
        </div>

        {formData.features.length > 0 && (
          <div className="features-list">
            {formData.features.map((feature, index) => (
              <div key={index} className="feature-tag-removable">
                {feature}
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="remove-tag-btn"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Product Images</label>

        {existingImages.length > 0 && (
          <div className="existing-images">
            {existingImages.map((img) => (
              <div key={img.publicId} className="image-preview">
                <img src={img.url} alt="Product" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() => handleRemoveExistingImage(img.publicId)}
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="file-upload-label">
          <FiUpload /> Choose Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </label>

        {images.length > 0 && (
          <div className="new-images">
            {images.map((img, index) => (
              <div key={index} className="image-preview">
                <img src={URL.createObjectURL(img)} alt="Preview" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() => handleRemoveImage(index)}
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isLive"
            checked={formData.isLive}
            onChange={handleChange}
          />
          <span>Publish Product (Make it visible to users)</span>
        </label>
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary" loading={loading}>
          {product ? 'Update Product' : 'Create Product'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;