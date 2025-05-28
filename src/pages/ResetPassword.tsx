import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    CurrencyDollarIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [token, setToken] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [isTokenValidating, setIsTokenValidating] = useState(true);
    const [tokenError, setTokenError] = useState('');

    useEffect(() => {
        // Extract token from URL query parameters
        const params = new URLSearchParams(location.search);
        const resetToken = params.get('token');
        
        if (!resetToken) {
            setIsTokenValid(false);
            setTokenError('Invalid or missing reset token. Please request a new password reset link.');
            setIsTokenValidating(false);
            return;
        }
        
        setToken(resetToken);
        
        // In a real app, you would validate the token with your API
        const validateToken = async () => {
            try {
                setIsTokenValidating(true);
                
                // Simulate API call to validate token
                // const response = await axios.post('/api/auth/validate-reset-token', { token: resetToken });
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // For demo purposes, we'll consider tokens starting with "valid" as valid
                if (!resetToken.startsWith('valid')) {
                    setIsTokenValid(false);
                    setTokenError('This password reset link has expired or is invalid. Please request a new one.');
                }
            } catch (err: any) {
                setIsTokenValid(false);
                if (err.response && err.response.data && err.response.data.message) {
                    setTokenError(err.response.data.message);
                } else {
                    setTokenError('Failed to validate reset token. Please try again later.');
                }
            } finally {
                setIsTokenValidating(false);
            }
        };
        
        validateToken();
    }, [location]);

    const inputContainerStyles = {
        position: 'relative' as 'relative',
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

    const validatePassword = (password: string) => {
        // Password must be at least 8 characters with at least one number and one letter
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        // Validate passwords
        if (!formData.password) {
            setError('Password is required');
            return;
        }
        
        if (!validatePassword(formData.password)) {
            setError('Password must be at least 8 characters and contain at least one letter and one number');
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        setIsLoading(true);
        
        try {
            // In a real app, you would call your API here
            // const response = await axios.post('/api/auth/reset-password', {
            //     token,
            //     password: formData.password
            // });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setIsSuccess(true);
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to reset password. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
                    {isTokenValidating ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '32px 0'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                border: '3px solid #E2E8F0',
                                borderTopColor: '#00C2FF',
                                borderRadius: '50%',
                                margin: '0 auto 24px',
                                animation: 'spin 1s linear infinite',
                            }}>
                                <style>
                                    {`
                                    @keyframes spin {
                                        0% { transform: rotate(0deg); }
                                        100% { transform: rotate(360deg); }
                                    }
                                    `}
                                </style>
                            </div>
                            <p style={{
                                color: '#64748B',
                            }}>
                                Validating your reset link...
                            </p>
                        </div>
                    ) : !isTokenValid ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '16px 0'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: '#FEE2E2',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px'
                            }}>
                                <ExclamationTriangleIcon style={{ 
                                    width: '32px', 
                                    height: '32px', 
                                    color: '#EF4444' 
                                }} />
                            </div>
                            
                            <h2 style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#121826',
                                marginBottom: '16px'
                            }}>
                                Invalid Reset Link
                            </h2>
                            
                            <p style={{
                                color: '#64748B',
                                marginBottom: '24px'
                            }}>
                                {tokenError}
                            </p>
                            
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                            }}>
                                <Link
                                    to="/forgot-password"
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: '#00C2FF',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    Request a new reset link
                                </Link>
                                
                                <Link
                                    to="/login"
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: 'transparent',
                                        color: '#64748B',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    Return to login
                                </Link>
                            </div>
                        </div>
                    ) : isSuccess ? (
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
                                Password Reset Successful
                            </h2>
                            
                            <p style={{
                                color: '#64748B',
                                marginBottom: '24px'
                            }}>
                                Your password has been successfully reset. You can now log in with your new password.
                            </p>
                            
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
                                Go to login
                            </button>
                        </div>
                    ) : (
                        <>
                            <h1 style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                marginBottom: '8px',
                                color: '#121826'
                            }}>
                                Create new password
                            </h1>
                            <p style={{
                                color: '#64748B',
                                marginBottom: '24px'
                            }}>
                                Your new password must be at least 8 characters and include at least one letter and one number.
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
                                {/* New Password Input */}
                                <div style={{ marginBottom: '16px' }}>
                                    <label 
                                        htmlFor="password"
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            color: '#1A2233',
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        New password
                                    </label>
                                    <div style={{
                                        ...inputContainerStyles,
                                        borderColor: error && !formData.password ? '#EF4444' : '#E2E8F0'
                                    }}>
                                        <LockClosedIcon style={iconStyles} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            style={inputStyles}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '0 12px',
                                                color: '#64748B',
                                            }}
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon style={{ width: '20px', height: '20px' }} />
                                            ) : (
                                                <EyeIcon style={{ width: '20px', height: '20px' }} />
                                            )}
                                        </button>
                                    </div>
                                    <p style={{
                                        fontSize: '12px',
                                        color: '#64748B',
                                        marginTop: '8px'
                                    }}>
                                        Must be at least 8 characters with at least one letter and one number
                                    </p>
                                </div>

                                {/* Confirm Password Input */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label 
                                        htmlFor="confirmPassword"
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            color: '#1A2233',
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Confirm new password
                                    </label>
                                    <div style={{
                                        ...inputContainerStyles,
                                        borderColor: error && formData.password !== formData.confirmPassword ? '#EF4444' : '#E2E8F0'
                                    }}>
                                        <LockClosedIcon style={iconStyles} />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                            style={inputStyles}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '0 12px',
                                                color: '#64748B',
                                            }}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeSlashIcon style={{ width: '20px', height: '20px' }} />
                                            ) : (
                                                <EyeIcon style={{ width: '20px', height: '20px' }} />
                                            )}
                                        </button>
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
                                    {isLoading ? 'Resetting password...' : 'Reset password'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ResetPassword;



