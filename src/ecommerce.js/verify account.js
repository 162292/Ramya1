import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function VerifyAccount() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState(null); // Tracks verification status
    const [message, setMessage] = useState(''); // Tracks success or error messages

    useEffect(() => {
        const token = searchParams.get('token'); // Retrieve the token from the URL query string
        if (token) {
            fetch(`http://127.0.0.1:8000/admin_console/verify-account/?token=${token}`, 
            {
                method: 'POST',
                credentials: 'include',
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((err) => {
                            throw new Error(err.detail || 'Verification failed.');
                        });
                    }
                    return response.json();
                })
                .then((data) => {
                    setMessage(data.detail || 'Account verified successfully!');
                    setStatus('success');
                })
                .catch((error) => {
                    setMessage(error.message || 'Verification failed. Please try again.');
                    setStatus('error');
                });
        } else {
            setMessage('No token provided for verification.');
            setStatus('error');
        }
    }, [searchParams]); // Dependency array ensures this runs when searchParams changes

    return (
        <div className="container mt-5">
            <h2>Verify Account</h2>
            {status === 'success' && (
                <p className="text-success">{message}</p>
            )}
            {status === 'error' && (
                <p className="text-danger">{message}</p>
            )}
            {!status && <p>Please wait while we verify your account...</p>}
        </div>
    );
}

export default VerifyAccount;
