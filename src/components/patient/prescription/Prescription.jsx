import React, { useState, useEffect } from 'react';
import './Prescription.css';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Prescription = () => {
    const [prescriptionData, setPrescriptionData] = useState([]);
    const [expandedDoctor, setExpandedDoctor] = useState(null);
    const [expandedAppointment, setExpandedAppointment] = useState(null);

    const fetchData = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(`https://hospital-app-backend-1.onrender.com/getAllBookings`, {
                headers: { 'Authorization': `${token}` }
            });
            console.log(response.data);
            setPrescriptionData(response.data);
        } catch (error) {
            alert('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleDoctor = (index) => {
        setExpandedDoctor(expandedDoctor === index ? null : index);
        setExpandedAppointment(null);  // Reset expanded appointment when doctor is toggled
    };

    const toggleAppointment = (index) => {
        setExpandedAppointment(expandedAppointment === index ? null : index);
    };

    const downloadPDF = (doctor, appointment) => {
        const doc = new jsPDF();
        const doctorName = `Doctor Name: ${doctor.doctorDetails.name}`;
        doc.setFontSize(14);
        doc.text(doctorName, 15, 20);

        const title = `Appointment ${appointment.index + 1}`;
        doc.setFontSize(12);
        const startY = 30;
        doc.text(title, 15, startY);

        const data = appointment.prescription.map((prescription) => [
            prescription.name,
            prescription.qunatity,
            prescription.morning,
            prescription.afternoon,
            prescription.evening
        ]);

        doc.autoTable({
            head: [['Medicine Name', 'Quantity', 'Morning', 'Afternoon', 'Evening']],
            body: data,
            startY: startY + 10,
            theme: 'grid',
            margin: { top: 25 },
            styles: { overflow: 'linebreak', columnWidth: 'wrap' }
        });

        doc.save('appointment-details.pdf');
    };

    if (prescriptionData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='view-prescription'>
            {prescriptionData.map((doctor, doctorIndex) => (
                <div key={doctorIndex} className='prescription-item'>
                    <div className='doctor-name' onClick={() => toggleDoctor(doctorIndex)}>
                        <h3 className='appointmenth3'><strong>Doctor Name:</strong> {doctor.doctorDetails.name}</h3>
                    </div>
                    {expandedDoctor === doctorIndex && (
                        <div className='view-prescription-right'>
                            {doctor.appointments.map((appointment, appointmentIndex) => (
                                <div key={appointment._id} className='appointment-details'>
                                    <h4 className='appointmenth4' onClick={() => toggleAppointment(appointmentIndex)}>
                                        Appointment {appointmentIndex + 1}
                                    </h4>
                                    {expandedAppointment === appointmentIndex && (
                                        <>
                                            <table className='prescription-table'>
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
                                                    {appointment.prescription.map((prescription, idx) => (
                                                        <tr key={idx}>
                                                            <td>{prescription.name}</td>
                                                            <td>{prescription.quantity}</td>
                                                            <td>{prescription.morning}</td>
                                                            <td>{prescription.afternoon}</td>
                                                            <td>{prescription.evening}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <button onClick={() => downloadPDF(doctor, { ...appointment, index: appointmentIndex })} className='downloadpdfbutton'>
                                                Download PDF
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Prescription;
