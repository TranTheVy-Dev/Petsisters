import { useState } from "react";
import "./modal.css";

const Modal = ({ image, onClose, onSubmit }) => {
  const [newPublicId, setNewPublicId] = useState(image.public_id);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newPublicId);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Sửa thông tin ảnh</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Public ID</label>
            <input
              type="text"
              value={newPublicId}
              onChange={(e) => setNewPublicId(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
