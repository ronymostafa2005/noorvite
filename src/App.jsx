import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetStart from './pages/GetStart';
import SignIn from './pages/SignIn';
import SignUp        from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword  from './pages/ResetPassword';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Projects from './pages/Projects';
import Addproject from './pages/Addproject';
import EditingPage from "./pages/EditingPage";
import ProjectDetails from "./pages/ProjectDetails";
import Tasklist from "./pages/Tasklist";
import ProgressPage from './pages/ProgressPage';
import Calander from './pages/Calander';
import Profile from './pages/Profile';

//------------------------------------
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing / entry screen */}
        <Route path="/" element={<GetStart />} />

        {/* Authentication screens */}
        <Route path="/signin"          element={<SignIn />} />
        <Route path="/signup"          element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password"  element={<ResetPassword />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/EditingPage" element={< EditingPage/>} />
        <Route path="/calendar" element={<Calander />} />
        <Route path="/progress" element={< ProgressPage/>} />
        <Route path="/ProjectDetails" element={<ProjectDetails />} />
        <Route path="/Tasklist" element={<Tasklist />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Addproject" element={< Addproject/>} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Add your protected routes here, e.g.: */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
