import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to the Register page when the component is loaded
    navigate("/register");
  }, [navigate]);

  return null; // No need to render anything here
};

export default CreateAccount;
