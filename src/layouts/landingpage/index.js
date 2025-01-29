import PropTypes from 'prop-types';
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "toastr/build/toastr.min.css";

// Functional Component untuk LandingPageLayout
const LandingPageLayout = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <React.Fragment>
      {/* Menampilkan anak komponen yang dikirim melalui props */}
      {props.children}
    </React.Fragment>
  );
};

// Definisi prop types untuk komponen
LandingPageLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

// Membungkus komponen dengan withRouter untuk mendapatkan akses ke props history
export { LandingPageLayout };
