import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

type AlertType = 'success' | 'error' | 'warning' | 'priority';

interface AlertProps {
    type: AlertType;
    message: string;
    onClose?: () => void;
}

const Alert = ({ type, message, onClose }: AlertProps) => {
    const styles = {
        success: {
            background: '#1F4732',
            text: '#A0F3C1',
            icon: CheckCircleIcon,
        },
        error: {
            background: '#4A1F1F',
            text: '#FF7C7C',
            icon: ExclamationCircleIcon,
        },
        warning: {
            background: '#443A1F',
            text: '#FFD979',
            icon: ExclamationTriangleIcon,
        },
        priority: {
            background: '#1F2F3F',
            text: '#00C2FF',
            icon: InformationCircleIcon,
        },
    };

    const currentStyle = styles[type];
    const Icon = currentStyle.icon;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: currentStyle.background,
            color: currentStyle.text,
            marginBottom: '16px',
        }}>
            <Icon style={{ width: '20px', height: '20px', marginRight: '12px' }} />
            <span style={{ flex: 1 }}>{message}</span>
            {onClose && (
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: currentStyle.text,
                        cursor: 'pointer',
                        padding: '4px',
                        opacity: 0.8,
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default Alert;