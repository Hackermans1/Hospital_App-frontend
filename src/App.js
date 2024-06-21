import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/home/loginRegister/Login';
import Register from './components/home/loginRegister/Register';
import AdminPage from './components/admin/AdminPage';
import AddNews from './components/admin/addNews/AddNews';
import AdminDetails from './components/admin/adminDetails/AdminDetails'
import EditAdminDetails from './components/admin/editAdminDetails/EditAdminDetails';
import DoctorPage from './components/doctor/DoctorPage'
import DoctorAvailability from './components/doctor/doctorAvailability/DoctorAvailability'
import DoctorDetails from './components/doctor/doctorDetails/DoctorDetails'
import EditDoctorDetails from './components/doctor/editDoctorDetails/EditDoctorDetails'
import AdminNotifications from './components/admin/adminNotifications/AdminNotifications'
import ViewNotificationDetail from './components/admin/viewNotificationDetail/ViewNotificationDetail'
import Inventory from './components/admin/inventory/Inventory';
import PatientPage from './components/patient/PatientPage'
import PatientDashboard from './components/patient/patientDashboard/PatientDashboard';
import PatientDetails from './components/patient/patientDetails/PatientDetails';
import EditPatientDetails from './components/patient/editPatientDetails/EditPatientDetails';
import DynamicGraph from './components/admin/dynamicGraph/DynamicGraph';
import ForgotPassword from './components/home/loginRegister/ForgotPassword';
import BookingNotifications from './components/doctor/bookingNotifications/BookingNotifications';
import WritePrescription from './components/doctor/writePrescription/WritePrescription';
import Prescription from './components/patient/prescription/Prescription';
import PrescriptionManager from './components/doctor/prescriptionManager/PrescriptionManager'


function App() {
  // const isAuth = localStorage.getItem("authToken");
  return (
    <div className="App">
      
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route exact path='/admin/*' element={<AdminPage />}>
          <Route exact path='news' element={<AddNews />} />
          <Route exact path='admindetails' element={<AdminDetails />} />
          <Route exact path='admindetails/editadmindetails' element={<EditAdminDetails />} />
          <Route exact path='adminnotifications' element={<AdminNotifications />} />
          <Route exact path='adminnotifications/viewnotificationdetail/:id' element={<ViewNotificationDetail />} />
          <Route exact path='inventory' element={<Inventory />} />
          <Route exact path='dynamicgraph' element={<DynamicGraph />} />
        </Route>

        <Route exact path='/doctor/*' element={<DoctorPage />}>
          <Route exact path='doctoravailability' element={<DoctorAvailability />} />
          <Route exact path='doctordetails' element={<DoctorDetails />} />
          <Route exact path='doctordetails/editdoctordetails' element={<EditDoctorDetails />} />
          <Route exact path='bookingnotifications' element={<BookingNotifications />} />
          <Route exact path='bookingnotifications/writeprescription/:id' element={<PrescriptionManager />} />
        </Route>

        <Route exact path='/patient/*' element={<PatientPage />} >
          <Route exact path='getapproveddoctors' element={<PatientDashboard />} />
          <Route exact path='patientdetails' element={<PatientDetails />} />
          <Route exact path='patientdetails/editpatientdetails' element={<EditPatientDetails />} />
          <Route exact path='prescription' element={<Prescription />} />
        </Route>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/forgotpassword' element={<ForgotPassword />} />
      </Routes>
      
    </div>
  );
}

export default App;
