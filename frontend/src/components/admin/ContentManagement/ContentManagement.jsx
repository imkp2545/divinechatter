import { useState } from 'react';
import { FiFile, FiClock } from 'react-icons/fi';
import FAQManagement from './FAQManagement';
import ComingSoonManagement from './ComingSoonManagement';
import './ContentManagement.css';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('faq');

  const tabs = [
    { id: 'faq', label: 'FAQs', icon: FiFile },
    { id: 'coming-soon', label: 'Coming Soon', icon: FiClock }
  ];

  return (
    <div className="content-management">
      <div className="content-management-header">
        <h1 className="management-title">Content Management</h1>
        <p className="management-subtitle">Manage FAQs and Coming Soon products</p>
      </div>

      <div className="content-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`content-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="content-tab-content">
        {activeTab === 'faq' && <FAQManagement />}
        {activeTab === 'coming-soon' && <ComingSoonManagement />}
      </div>
    </div>
  );
};

export default ContentManagement;