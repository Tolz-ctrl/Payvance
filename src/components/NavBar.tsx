
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import { useUser } from '../contexts/UserContext';
import { 
    Bars3Icon, 
    BellIcon,
    CurrencyDollarIcon 
} from '@heroicons/react/24/outline';
import userIcon from '../icons/usericon.svg';

const NavBar = () => {
    const navigate = useNavigate();
    const { toggle } = useSidebar();
    const { user, setUser } = useUser();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const walletBalance = "₦ 250,000.00";

    const handleLogout = () => {
        // Clear user data
        setUser(null);
        // Navigate to landing page
        navigate('/');
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdowns when pressing Escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowNotifications(false);
                setShowProfile(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    useEffect(() => {
        // For testing purposes - set a sample user if none exists
        if (!user) {
            setUser({
                fullName: "Test User",
                email: "test@example.com"
            });
        }
    }, [user, setUser]);

    const styles = {
        nav: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            backgroundColor: '#0B0F1A',
            zIndex: 50,
            width: '100%',
        },
        container: {
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1rem',
            height: '100%',
        },
        logo: {
            color: '#00C2FF',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
        },
        searchInput: {
            backgroundColor: '#1A1F2E',
            color: '#E6EAF1',
            padding: '0.5rem 1rem 0.5rem 2.5rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            width: '240px',
            transition: 'all 0.2s ease',
        },
        walletButton: {
            backgroundColor: '#1A1F2E',
            color: '#E6EAF1',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'background-color 0.2s ease',
        },
        iconButton: {
            color: '#E6EAF1',
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
        },
        dropdown: {
            position: 'absolute' as const,
            top: 'calc(100% + 8px)',
            right: 0,
            backgroundColor: '#1A1F2E',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
            width: '240px',
            zIndex: 50,
            animation: 'dropdownFadeIn 0.2s ease',
        },
        notificationBadge: {
            position: 'absolute' as const,
            top: '-8px',
            right: '-8px',
            backgroundColor: '#FF4444',
            borderRadius: '12px',
            minWidth: '18px',
            height: '18px',
            border: '2px solid #121826',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 'bold',
            color: 'white',
            padding: '0 4px',
        },
        notificationItem: {
            padding: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'block',
            textDecoration: 'none',
        },
        dropdownItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            color: '#E6EAF1',
            textDecoration: 'none',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            width: '100%',
            textAlign: 'left' as const,
        },
    };

    const notifications = [
        {
            id: 1,
            title: 'Payment Successful',
            message: 'Your bill payment was successful',
            time: '2 mins ago',
            unread: true,
        },
        {
            id: 2,
            title: 'New Service Available',
            message: 'Check out our new bill payment options',
            time: '1 hour ago',
            unread: false,
        },
    ];

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={toggle}
                            style={{ color: '#E6EAF1', background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer' }}
                        >
                            <Bars3Icon style={{ width: '24px', height: '24px' }} />
                        </button>
                        <Link to="/home" style={{ ...styles.logo, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CurrencyDollarIcon 
                                style={{ 
                                    width: '24px', 
                                    height: '24px',
                                    color: '#00C2FF'
                                }} 
                            />
                            Payvance
                        </Link>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="hidden md:block" style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                style={styles.searchInput}
                            />
                            <svg 
                                style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#E6EAF1' }}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <button 
                            onClick={() => navigate('/wallet')}
                            style={styles.walletButton}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2A2F3E'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1A1F2E'}
                        >
                            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{walletBalance}</span>
                        </button>

                        <div ref={notificationRef} style={{ position: 'relative' }}>
                            <button 
                                onClick={() => setShowNotifications(!showNotifications)}
                                style={styles.iconButton}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <BellIcon style={{ width: '24px', height: '24px' }} />
                                {notifications.some(n => n.unread) && (
                                    <div style={styles.notificationBadge}>
                                        {notifications.filter(n => n.unread).length}
                                    </div>
                                )}
                            </button>
                            {showNotifications && (
                                <div style={{
                                    ...styles.dropdown,
                                    width: '320px',
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                }}>
                                    <div style={{ 
                                        padding: '16px',
                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <h3 style={{ margin: 0, color: '#E6EAF1', fontSize: '16px' }}>Notifications</h3>
                                        {notifications.length > 0 && (
                                            <button
                                                onClick={() => {/* handle mark all as read */}}
                                                style={{
                                                    ...styles.dropdownItem,
                                                    padding: '4px 8px',
                                                    fontSize: '12px',
                                                    color: '#00C2FF',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(0,194,255,0.1)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }}
                                            >
                                                Mark all as read
                                            </button>
                                        )}
                                    </div>
                                    
                                    {notifications.length > 0 ? (
                                        <div>
                                            {notifications.map((notification) => (
                                                <div 
                                                    key={notification.id}
                                                    style={styles.notificationItem}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = notification.unread 
                                                            ? 'rgba(0,194,255,0.15)'
                                                            : 'rgba(255,255,255,0.05)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = notification.unread 
                                                            ? 'rgba(0,194,255,0.1)'
                                                            : 'transparent';
                                                    }}
                                                    onClick={() => {
                                                        // Handle notification click based on type
                                                        if (notification.title.includes('Payment')) {
                                                            navigate('/history');
                                                        } else if (notification.title.includes('Service')) {
                                                            navigate('/services');
                                                        } else {
                                                            navigate('/dashboard');
                                                        }
                                                    }}
                                                >
                                                    <div style={{ marginBottom: '8px' }}>
                                                        <span style={{ 
                                                            color: '#E6EAF1',
                                                            fontWeight: notification.unread ? 600 : 400,
                                                        }}>
                                                            {notification.title}
                                                        </span>
                                                    </div>
                                                    <p style={{ 
                                                        margin: '0 0 8px 0',
                                                        color: '#6A7385',
                                                        fontSize: '14px',
                                                        lineHeight: '1.4'
                                                    }}>
                                                        {notification.message}
                                                    </p>
                                                    <span style={{ 
                                                        color: '#6A7385',
                                                        fontSize: '12px'
                                                    }}>
                                                        {notification.time}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{ 
                                            padding: '24px 16px',
                                            color: '#6A7385',
                                            textAlign: 'center',
                                            fontSize: '14px'
                                        }}>
                                            No new notifications
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div ref={profileRef} style={{ position: 'relative' }}>
                            <button 
                                onClick={() => setShowProfile(!showProfile)}
                                style={{
                                    ...styles.iconButton,
                                    gap: '12px',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <div style={{ 
                                    width: '36px', 
                                    height: '36px', 
                                    borderRadius: '50%', 
                                    overflow: 'hidden',
                                    border: '2px solid rgba(0,194,255,0.2)',
                                    transition: 'all 0.2s ease',
                                }}>
                                    <img 
                                        src={userIcon} 
                                        alt="User profile"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </button>
                            {showProfile && (
                                <div style={styles.dropdown}>
                                    <div style={{ 
                                        padding: '16px',
                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                    }}>
                                        <div style={{ 
                                            color: '#E6EAF1',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            marginBottom: '4px',
                                        }}>
                                            {user?.fullName || 'Guest User'}
                                        </div>
                                        <div style={{ 
                                            color: '#6A7385',
                                            fontSize: '14px',
                                        }}>
                                            {user?.email || 'No email provided'}
                                        </div>
                                    </div>

                                    <div style={{ padding: '8px 0' }}>
                                        {[
                                            { label: 'Profile', path: '/profile' },
                                            { label: 'Settings', path: '/settings' },
                                        ].map((item) => (
                                            <Link 
                                                key={item.path}
                                                to={item.path} 
                                                style={styles.dropdownItem}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                        
                                        <button 
                                            onClick={handleLogout}
                                            style={{
                                                ...styles.dropdownItem,
                                                color: '#FF4D4D',
                                                marginTop: '8px',
                                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
