import React, { useState, useRef } from 'react';
import { useUser } from '../contexts/UserContext';
import Button from '../components/Button';

interface ProfileFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    language: string;
    currency: string;
}

const Profile = () => {
    const { user, updateUser } = useUser();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState<ProfileFormData>({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        language: 'en',
        currency: 'NGN'
    });

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setIsLoading(true);
            // TODO: Implement actual image upload API call
            const formData = new FormData();
            formData.append('image', file);
            
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setMessage({ type: 'success', text: 'Profile picture updated successfully' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile picture' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // TODO: Implement actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            await updateUser(formData);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="profile-container" style={{
            padding: '24px',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '24px'
            }}>Profile</h1>

            {message.text && (
                <div style={{
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    backgroundColor: message.type === 'success' ? '#DEF7EC' : '#FEE2E2',
                    color: message.type === 'success' ? '#03543F' : '#DC2626'
                }}>
                    {message.text}
                </div>
            )}

            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px'
            }}>
                {/* Profile Picture Section */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '60px',
                        backgroundColor: '#E5E7EB',
                        margin: '0 auto 16px',
                        overflow: 'hidden'
                    }}>
                        {user?.profilePicture ? (
                            <img 
                                src={user.profilePicture} 
                                alt="Profile" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '36px',
                                color: '#9CA3AF'
                            }}>
                                {formData.fullName.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="secondary"
                        disabled={isLoading}
                    >
                        Change Picture
                    </Button>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gap: '20px' }}>
                        <div>
                            <label htmlFor="fullName" style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '500'
                            }}>
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E7EB'
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '500'
                            }}>
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E7EB'
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '500'
                            }}>
                                Phone Number
                            </label>
                            <input
                                id="phoneNumber"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E7EB'
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="language" style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '500'
                            }}>
                                Language
                            </label>
                            <select
                                id="language"
                                value={formData.language}
                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E7EB'
                                }}
                            >
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="es">Spanish</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="currency" style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '500'
                            }}>
                                Preferred Currency
                            </label>
                            <select
                                id="currency"
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E7EB'
                                }}
                            >
                                <option value="NGN">Nigerian Naira (NGN)</option>
                                <option value="USD">US Dollar (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
                                <option value="GBP">British Pound (GBP)</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginTop: '24px' }}>
                        <Button
                            type="submit"
                            loading={isLoading}
                            disabled={isLoading}
                            fullWidth
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>

                <div style={{
                    marginTop: '24px',
                    padding: '24px',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '8px'
                }}>
                    <h2 style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '16px'
                    }}>Security Settings</h2>
                    <div style={{ display: 'grid', gap: '12px' }}>
                        <Button
                            variant="secondary"
                            onClick={() => {/* TODO: Implement password change */}}
                        >
                            Change Password
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {/* TODO: Implement 2FA settings */}}
                        >
                            Two-Factor Authentication
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;