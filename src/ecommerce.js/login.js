//  import React, { useState } from 'react';
//  import { useNavigate } from 'react-router-dom';
//  import ResendVerification from './Resendverification';
// export const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false); // For showing loading indicator
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setMessage(''); // Reset message before making the request
//     setLoading(true); // Show loading indicator

//     try {
//       // Send login request to backend
//       const response = await fetch('http://127.0.0.1:8000/admin_console/login/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//         credentials: 'include', // Include cookies if needed
//       });

//       // Parse the response data
//       const data = await response.json();

//       // Check if response was successful
//       if (response.ok ) {
        
//         // Display success message and navigate to the product page
//         setMessage('Login successful!');
//         navigate('/product');
//       } else {
//         // If response is unsuccessful, display error message
//         setMessage(data.message || 'Invalid credentials!');
//       }
//     } catch (error) {
//       // Handle unexpected errors (e.g., network issues)
//       console.error('Login Error:', error);
//       setMessage('An unexpected error occurred. Please try again later.');
//     } finally {
//       setLoading(false); // Hide loading indicator
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-4">
//           <h3 className="text-center mb-4">Login</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>

//           {/* Show message if any */}
//           {message && (
//             <div
//               className="alert mt-3"
//               role="alert"
//               style={{ color: message.includes('successful') ? 'green' : 'red' }}
//             >
//               {message}
//             </div>
//           )}

//           {/* Additional links */}
//           <div className="mt-4 text-center">
//             <button
//               type="button"
//               className="btn btn-link"
//               onClick={() => navigate('/forgot-password')}
//             >
//               Forgot Password?
//             </button>
//             <button
//               type="button"
//               className="btn btn-link"
//               onClick={() => navigate('/request-otp')}
//             >
//               Request OTP
//             </button>
//             <button
//               type="button"
//               className="btn btn-link"
//               onClick={() => navigate('/create-account')}
//             >
//               Create Account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResendVerification from './Resendverification';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError('');
    setShowResendVerification(false); // Reset state before making a new request

    try {
      const response = await fetch('http://127.0.0.1:8000/admin_console/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true'); 
        // Navigate to the product page upon successful login
        navigate('/product');
      } else {
        // Check if the error is related to an unactivated account
        if (data.error && data.error.includes('Account not activated')) {
          setLoginError('Account not activated');
          setShowResendVerification(true); // Show the resend verification button
        } else {
          setLoginError(data.message || 'Invalid credentials!');
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      setLoginError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-lg-4 col-md-6 col-sm-8 col-11">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="btn btn-link "
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </button>
                {/* <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => navigate('/otp-login')}
                >
                  Request OTP
                </button> */}
                <button
                  type="button"
                  className="btn btn-link "
                  onClick={() => navigate('/create-account')}
                >
                  Create Account
                </button>

                {loginError && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {loginError}
                  </div>
                )}

                {/* Conditionally render the "Resend Verification" button */}
                {showResendVerification && (
                  <div className="mt-3">
                    <ResendVerification email={email} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
