import React, { useState } from 'react';
import './WritePrescription.css';

const WritePrescription = ({ onSave, onClose }) => {
  const [prescriptionData, setPrescriptionData] = useState({
    name: "",
    qunatity: "",
    morning: "",
    afternoon: "",
    evening: ""
  });

  const onChange = (event) => {
    setPrescriptionData({ ...prescriptionData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(prescriptionData);
    onClose();
  };

  return (
    <div className='prescription'>
      <div className='prescription-right'>
        <form onSubmit={handleSubmit}>
          <h3>Write Prescription</h3>
          <label className='prescription-label name-label'>Medicine Name</label>
          <input className='prescription-input name-input' type="text" name="name" value={prescriptionData.name} onChange={onChange} placeholder="Enter medicine name" required />
          
          <label className='prescription-label quantity-label'>Quantity</label>
          <input className='prescription-input quantity-input' type="number" name="qunatity" value={prescriptionData.qunatity} onChange={onChange} placeholder="Enter quantity" required />
          
          <label className='prescription-label morning-label'>Morning</label>
          <input className='prescription-input morning-input' type="time" name="morning" value={prescriptionData.morning} onChange={onChange} />
          
          <label className='prescription-label afternoon-label'>Afternoon</label>
          <input className='prescription-input afternoon-input' type="time" name="afternoon" value={prescriptionData.afternoon} onChange={onChange} />
          
          <label className='prescription-label evening-label'>Evening</label>
          <input className='prescription-input evening-input' type="time" name="evening" value={prescriptionData.evening} onChange={onChange} />
          
          <div className="prescription-wrap">
            <button className='prescription-button' type="submit"> Save </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePrescription;
