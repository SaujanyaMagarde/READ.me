import React from 'react';
import { useDispatch } from 'react-redux';
import Authservice from '../../../Appwrite/auth';
import { logout } from '../../../store/authSlice';
import './logoutbtn.css'; // Importing the CSS file for LogoutBtn

function Logoutbtn() {
  const dispatch = useDispatch();

  const logouthandler = () => {
    Authservice.Logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="logout-btn"
      onClick={logouthandler}
    >
      Logout
    </button>
  );
}

export default Logoutbtn;
