import { useState } from 'react';
import './index.css';

function Addaccount({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <div className="complete-btn" title="关闭">&times;</div>

        </div>
    </div>
  );
}

export default Addaccount;
