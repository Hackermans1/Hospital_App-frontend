import React, { useState } from 'react';
import WritePrescription from '../writePrescription/WritePrescription';
import ModalPrescription from '../modalPrescription/ModalPrescription'
import './PrescriptionManager.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PrescriptionManager = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {id} = useParams("");
  const navigate = useNavigate();

  const addPrescription = (prescription) => {
    setPrescriptions([...prescriptions, prescription]);
  };

  const submitPrescriptions = async () => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.post("https://hospital-app-backend-1.onrender.com/addDetailsToPatient", { bookingId:id, prescription:prescriptions }, { headers: { 'Authorization': `${token}` } });
      alert('Prescriptions submitted successfully');
      navigate('/doctor/bookingnotifications');
    } catch (error) {
      alert('Error submitting prescriptions:', error);
    }
  };

  return (
    <div className="prescription-manager">
      <button onClick={() => setShowModal(true)} className="add-button">Add Prescription</button>
      <ModalPrescription show={showModal} handleClose={() => setShowModal(false)}>
        <WritePrescription onSave={addPrescription} onClose={() => setShowModal(false)} />
      </ModalPrescription>
      <table className="prescription-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Morning</th>
            <th>Afternoon</th>
            <th>Evening</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription, index) => (
            <tr key={index}>
              <td>{prescription.name}</td>
              <td>{prescription.qunatity}</td>
              <td>{prescription.morning}</td>
              <td>{prescription.afternoon}</td>
              <td>{prescription.evening}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={submitPrescriptions} className="submit-button">Submit Prescriptions</button>
    </div>
  );
};

export default PrescriptionManager;
