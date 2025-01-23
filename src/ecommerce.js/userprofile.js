import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Modal, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactivateVerification from './Reactivate verification';



function UserProfile({ setIsAuthenticated }) {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        pincode: '',
        address: '',
        city: '',
        state: '',
        country: '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [showReactivation, setShowReactivation] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/user_mgmt/profile/`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                    setFormData(data);
                } else {
                    setError('Failed to fetch profile data.');
                }
            } catch (err) {
                setError('An error occurred while fetching profile data.');
                console.error('Error fetching profile:', err);
            }
        };

        fetchProfile();
    }, [setIsAuthenticated]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = profile
                ? `http://127.0.0.1:8000/user_mgmt/profile/update/`
                : `http://127.0.0.1:8000/user_mgmt/profile/create/`;
            const method = profile ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data);
                setMessage(profile ? 'Profile updated successfully!' : 'Profile created successfully!');
                setError(null);
            } else {
                setError('Failed to save profile.');
            }
        } catch (err) {
            setError('An error occurred while saving the profile.');
            console.error('Error saving profile:', err);
        }
    };

    // Handle password change
const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword } = passwordData; // Ensure passwordData is defined and includes these fields

    try {
        const response = await fetch(`http://127.0.0.1:8000/user_mgmt/profile/change_password/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword,
            }),
            credentials: 'include',
        });

        if (response.ok) {
            // Password changed successfully
            setMessage('Password changed successfully!');
            setError(null); // Clear any previous error messages
        } else {
            // Handle error response from API
            const errorData = await response.json();
            setError(errorData.detail || 'Failed to change password.');
        }
    } catch (error) {
        console.error('Error changing password:', error.message);
        setError('An unexpected error occurred while changing the password.');
    }
};
    // Handle Deactivate Account
    const handleDeactivateAccount = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/user_mgmt/profile/deactivate/`, {
                method: 'PUT',
                credentials: 'include',
            });

            if (response.ok) {
                setShowModal(false); // Close the modal
                setMessage('Profile deactivated successfully!');
                setError(null); // Clear any previous error messages
                setProfile(null);
                setIsAuthenticated(false);
                // navigate('/login');
                

            } else {
                const errorData = await response.json();
                setError('Failed to deactivate account.');
            }
        } catch (err) {
            setError('An error occurred while deactivating the account.');
            console.error('Error deactivating account:', err);
        }
    };

    return (
        <Container className="user-profile-container d-flex justify-content-center align-items-center py-5" style={{ minHeight: '100vh' }}>
            <Card className="shadow mb-4" style={{ width: '100%', maxWidth: '600px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">User Profile</h2>

                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {profile ? (
                        <div className="profile-details mb-4">
                            <h3 className="text-primary">Profile Details</h3>
                            <p><strong>Address:</strong> {profile.address}</p>
                            <p><strong>City:</strong> {profile.city}</p>
                            <p><strong>State:</strong> {profile.state}</p>
                            <p><strong>Country:</strong> {profile.country}</p>
                            <p><strong>Pincode:</strong> {profile.pincode}</p>
                        </div>
                    ) : (
                        <p className="text-muted">No profile found. Please create one first.</p>
                    )}

                    <Form onSubmit={handleProfileSubmit} className="mb-4">
                        <h3 className="text-secondary">{profile ? 'Update' : 'Create'} Profile</h3>

                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCity" className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formState" className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCountry" className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPincode" className="mb-3">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            {profile ? 'Update Profile' : 'Create Profile'}
                        </Button>
                    </Form>

                    <Form onSubmit={handlePasswordSubmit} className="mb-4">
                        <h3 className="text-secondary">Change Password</h3>
                        <Form.Group controlId="formCurrentPassword" className="mb-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNewPassword" className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="secondary" type="submit" className="w-100">
                            Change Password
                        </Button>
                    </Form>

                    <Button variant="danger" className="w-100 mb-4" onClick={() => setShowModal(true)}>
                        Deactivate Account
                    </Button>

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deactivation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to deactivate your account? This action cannot be undone.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDeactivateAccount}>
                                Deactivate
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Button variant="info" className="w-100" onClick={() => setShowReactivation(!showReactivation)}>
                        {showReactivation ? 'Hide Reactivation Options' : 'Reactivate Account'}
                    </Button>

                    {showReactivation && (
                        <div className="mt-3 text-center">
                            <ReactivateVerification/>
                            <p>If you have a reactivation token, use the link provided in your email.</p>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default UserProfile;
