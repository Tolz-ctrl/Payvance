import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    CurrencyDollarIcon,
    EnvelopeIcon,
    LockClosedIcon,
    UserIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (!formData.agreeToTerms) {
            setError('Please agree to the Terms of Service');
            setIsLoading(false);
            return;
        }

        try {
            // Get existing registered users
            const registeredUsersJSON = localStorage.getItem('registered_users');
            const registeredUsers = registeredUsersJSON ? JSON.parse(registeredUsersJSON) : [];
            
            // Check if email already exists
            if (registeredUsers.some((user: any) => user.email === formData.email)) {
                setError('Email already registered');
                setIsLoading(false);
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now(), // Use timestamp for unique ID
                name: formData.fullName,
                email: formData.email,
                password: formData.password // In a real app, hash this password
            };
            
            console.log("Registering new user:", newUser);
            
            // Add to registered users
            registeredUsers.push(newUser);
            localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
            
            // Also set as current user
            localStorage.setItem('auth_user', JSON.stringify({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }));
            localStorage.setItem('auth_status', 'true');
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate('/dashboard');
        } catch (err) {
            console.error("Registration error:", err);
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Create a consistent input style object
    const inputStyles = {
        boxSizing: 'border-box' as const,
        width: '100%',
        padding: '12px 40px',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.2s ease',
    };

    // Create a consistent container style for input groups
    const inputContainerStyles = {
        position: 'relative' as const,
        width: '100%',
    };

    // Create a consistent icon style
    const iconStyles = {
        position: 'absolute' as const,
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '20px',
        height: '20px',
        color: '#64748B',
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
                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: '#121826'
                    }}>
                        Create your account
                    </h1>
                    <p style={{
                        color: '#64748B',
                        marginBottom: '24px'
                    }}>
                        Start managing your finances with ease
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
                        {/* Full Name Input */}
                        <div style={{ marginBottom: '16px' }}>
                            <label 
                                htmlFor="fullName"
                                style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: '#1A2233',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                Full Name
                            </label>
                            <div style={inputContainerStyles}>
                                <UserIcon style={iconStyles} />
                                <input
                                    type="text"
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    required
                                    style={inputStyles}
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div style={{ marginBottom: '16px' }}>
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
                            <div style={inputContainerStyles}>
                                <EnvelopeIcon style={iconStyles} />
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    style={inputStyles}
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
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
                                Password
                            </label>
                            <div style={inputContainerStyles}>
                                <LockClosedIcon style={iconStyles} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    style={inputStyles}
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        padding: '0',
                                        cursor: 'pointer',
                                        color: '#64748B'
                                    }}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon style={{ width: '20px', height: '20px' }} />
                                    ) : (
                                        <EyeIcon style={{ width: '20px', height: '20px' }} />
                                    )}
                                </button>
                            </div>
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
                                Confirm Password
                            </label>
                            <div style={inputContainerStyles}>
                                <LockClosedIcon style={iconStyles} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                    style={inputStyles}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        padding: '0',
                                        cursor: 'pointer',
                                        color: '#64748B'
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

                        {/* Terms Agreement */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        accentColor: '#00C2FF'
                                    }}
                                />
                                <span style={{ fontSize: '14px', color: '#64748B' }}>
                                    I agree to the{' '}
                                    <Link
                                        to="/terms"
                                        style={{
                                            color: '#00C2FF',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link
                                        to="/privacy"
                                        style={{
                                            color: '#00C2FF',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
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
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                opacity: isLoading ? 0.7 : 1,
                            }}
                        >
                            {isLoading ? 'Creating account...' : 'Create account'}
                        </button>

                        {/* Sign In Link */}
                        <p style={{
                            textAlign: 'center',
                            marginTop: '24px',
                            color: '#64748B',
                            fontSize: '14px'
                        }}>
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                style={{
                                    color: '#00C2FF',
                                    textDecoration: 'none',
                                    fontWeight: '500'
                                }}
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Register;





