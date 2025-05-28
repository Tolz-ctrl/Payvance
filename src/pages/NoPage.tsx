import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/24/outline';

const NoPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: '#F8FAFC',
            textAlign: 'center'
        }}>
            <ExclamationTriangleIcon style={{
                width: '64px',
                height: '64px',
                color: '#EF4444',
                marginBottom: '24px'
            }} />

            <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1A2233',
                marginBottom: '16px'
            }}>
                404
            </h1>

            <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1A2233',
                marginBottom: '16px'
            }}>
                Page Not Found
            </h2>

            <p style={{
                fontSize: '16px',
                color: '#6A7385',
                maxWidth: '400px',
                marginBottom: '32px'
            }}>
                The page you're looking for doesn't exist or has been moved.
                Please check the URL or return to the homepage.
            </p>

            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    backgroundColor: '#00C2FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#00A3E0';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#00C2FF';
                }}
            >
                <HomeIcon style={{ width: '20px', height: '20px' }} />
                Return Home
            </button>
        </div>
    );
};

export default NoPage;