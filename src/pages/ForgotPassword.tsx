import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    CurrencyDollarIcon,
    EnvelopeIcon,
    ArrowLeftIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const inputContainerStyles = {
        position: 'relative' as const,
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        overflow: 'hidden',
    };

    const iconStyles = {
        width: '20px',
        height: '20px',
        color: '#64748B',
        margin: '0 12px',
    };

    const inputStyles = {
        flex: '1',
        padding: '12px 16px 12px 0',
        border: 'none',
        outline: 'none',
        fontSize: '16px',
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        // Validate email
        if (!email) {
            setError('Email is required');
            return;
        }
        
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        
        setIsLoading(true);
        
        try {
            // In a real app, you would call your API here
            // For demo purposes, we'll simulate an API call
            // const response = await axios.post('/api/auth/forgot-password', { email });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // For demo purposes, we'll generate a reset token and log it
            const resetToken = 'valid' + Math.random().toString(36).substring(2, 15);
            console.log('Reset token generated:', resetToken);
            console.log('Reset link:', `${window.location.origin}/reset-password?token=${resetToken}`);
            
            setIsSubmitted(true);
            setSuccessMessage(`Password reset instructions have been sent to ${email}`);
        } catch (err: unknown) {
            if (typeof err === 'object' && err !== null && 'response' in err && 
                err.response && typeof err.response === 'object' && 'data' in err.response && 
                err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
                setError(typeof err.response.data.message === 'string' ? err.response.data.message : 'An error occurred');
            } else {
                setError('Failed to send reset instructions. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleTryAgain = () => {
        setIsSubmitted(false);
        setSuccessMessage('');
        setEmail('');
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <header style={{
                padding: '24px',
                borderBottom: '1px solid #E2E8F0'
            }}>
                <Link 
                    to="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                        width: 'fit-content'
                    }}
                >
                    <CurrencyDollarIcon 
                        style={{ 
                            width: '32px', 
                            height: '32px',
                            color: '#00C2FF'
                        }} 
                    />
                    <span style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold',
                        color: '#121826'
                    }}>
                        Payvance
                    </span>
                </Link>
            </header>

            {/* Main Content */}
            <main style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '32px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}>
                    {!isSubmitted ? (
                        <>
                            <Link 
                                to="/login"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: '#64748B',
                                    textDecoration: 'none',
                                    marginBottom: '24px',
                                    fontSize: '14px',
                                }}
                            >
                                <ArrowLeftIcon style={{ width: '16px', height: '16px' }} />
                                Back to login
                            </Link>

                            <h1 style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                marginBottom: '8px',
                                color: '#121826'
                            }}>
                                Reset your password
                            </h1>
                            <p style={{
                                color: '#64748B',
                                marginBottom: '24px'
                            }}>
                                Enter your email address and we'll send you instructions to reset your password.
                            </p>

                            {error && (
                                <div style={{
                                    backgroundColor: '#FEE2E2',
                                    color: '#EF4444',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    marginBottom: '16px',
                                    fontSize: '14px'
                                }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Email Input */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label 
                                        htmlFor="email"
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            color: '#1A2233',
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Email address
                                    </label>
                                    <div style={{
                                        ...inputContainerStyles,
                                        borderColor: error && !email ? '#EF4444' : '#E2E8F0'
                                    }}>
                                        <EnvelopeIcon style={iconStyles} />
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            style={inputStyles}
                                            placeholder="john@example.com"
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: '#00C2FF',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: isLoading ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s ease',
                                        opacity: isLoading ? 0.7 : 1,
                                    }}
                                >
                                    {isLoading ? 'Sending instructions...' : 'Send reset instructions'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '16px 0'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: '#DCFCE7',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px'
                            }}>
                                <CheckCircleIcon style={{ 
                                    width: '32px', 
                                    height: '32px', 
                                    color: '#22C55E' 
                                }} />
                            </div>
                            
                            <h2 style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#121826',
                                marginBottom: '16px'
                            }}>
                                Check your email
                            </h2>
                            
                            <p style={{
                                color: '#64748B',
                                marginBottom: '24px'
                            }}>
                                {successMessage}
                            </p>
                            
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                            }}>
                                <button
                                    onClick={() => navigate('/login')}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: '#00C2FF',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    Return to login
                                </button>
                                
                                <button
                                    onClick={handleTryAgain}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: 'transparent',
                                        color: '#64748B',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    Try with a different email
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ForgotPassword;






