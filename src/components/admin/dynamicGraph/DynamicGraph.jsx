import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './DynamicGraph.css';
import axios from 'axios'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const DynamicGraph = () => {
    const [barChartData, setBarChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});

    const doctorAndPatientCount = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(`https://hospital-app-backend-1.onrender.com/getTotalPatientByDoctor`, { headers: { 'Authorization': `${token}` } });
            //console.log(response.data);
            const doctorNames = response.data.map(item => item.doctorDetails.name);
            const patientCounts = response.data.map(item => item.uniquePatientCount);

            setBarChartData({
                labels: doctorNames,
                datasets: [
                    {
                        label: 'Number of Patients',
                        data: patientCounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }
                ]
            });
        } catch (error) {
            alert("error while fetch doctorAndPatientCount details");
        }
    }

    const dateAndPatientCount = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(`https://hospital-app-backend-1.onrender.com/getTotalPAtientByDate`, { headers: { 'Authorization': `${token}` } });
            const pieData = response.data;
            const dates = Object.keys(pieData);
            const patientCounts = dates.map(date => pieData[date].totalPatients);

            setPieChartData({
                labels: dates,
                datasets: [
                    {
                        label: 'Total Patients',
                        data: patientCounts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(199, 199, 199, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            });
        } catch (error) {
            alert("error while fetch dateAndPatientCount details");
        }
    }

    useEffect(() => {
        doctorAndPatientCount();
        dateAndPatientCount();
    }, []);

    return (
        <div className="dynamic-graph">
            <h1>Patients per Doctor</h1>
            {barChartData.labels ? (
                <Bar
                    data={barChartData}
                    options={{
                        responsive: true,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Doctor Name'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Number of Patients'
                                },
                                beginAtZero: true,
                            }
                        }
                    }}
                />
            ) : (
                <p>Loading data...</p>
            )}

            <h1>Total Patients in Last 7 Days</h1>
            {pieChartData.labels ? (
                <Pie
                    data={pieChartData}
                    options={{
                        responsive: true,
                        aspectRatio: 1.5,
                    }}
                />
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default DynamicGraph;
