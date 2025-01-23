import React, { useEffect, useState } from 'react';
import { Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom'; // For accessing URL query params

function ReactivateAccount() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success'); // Can be 'success' or 'danger'

    useEffect(() => {
        const token = searchParams.get('token'); // Get the token from the URL
        if (token) {
            handleReactivateAccount(token);
        }
    }, [searchParams]);

    const handleReactivateAccount = async (token) => {
        setLoading(true);
        setMessage('');
        setVariant('success'); // Default to success

        try {
            const response = await fetch(`http://127.0.0.1:8000/admin_console/activate-account/?token=${token}`, {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.detail || 'Account activated successfully.');
                setVariant('success');
            } else {
                setMessage(data.detail || 'Failed to activate account.');
                setVariant('danger');
            }
        } catch (error) {
            console.error('Error reactivating account:', error);
            setMessage('Error activating account.');
            setVariant('danger');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6} className="text-center">
                    {loading ? (
                        <Spinner animation="border" variant="primary" />
                    ) : (
                        message && (
                            <Alert variant={variant}>
                                {message}
                            </Alert>
                        )
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ReactivateAccount;
