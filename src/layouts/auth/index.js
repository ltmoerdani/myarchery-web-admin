import PropTypes from 'prop-types';
import React from "react";
import { useLocation } from "react-router-dom";
import "toastr/build/toastr.min.css";

const NonAuthLayout = (props) => {
  const location = useLocation();
  
  return (
    <div>
      <div className="account-pages">
        {props.children}
      </div>
    </div>
  );
};

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export { NonAuthLayout };
