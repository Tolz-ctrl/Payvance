type StatusType = 'success' | 'error' | 'warning' | 'priority';

interface StatusLabelProps {
    type: StatusType;
    label: string;
    size?: 'small' | 'medium';
}

const StatusLabel = ({ type, label, size = 'medium' }: StatusLabelProps) => {
    const styles = {
        success: {
            background: '#1F4732',
            text: '#A0F3C1',
        },
        error: {
            background: '#4A1F1F',
            text: '#FF7C7C',
        },
        warning: {
            background: '#443A1F',
            text: '#FFD979',
        },
        priority: {
            background: '#1F2F3F',
            text: '#00C2FF',
        },
    };

    const sizeStyles = {
        small: {
            padding: '4px 8px',
            fontSize: '12px',
            borderRadius: '4px',
        },
        medium: {
            padding: '6px 12px',
            fontSize: '14px',
            borderRadius: '6px',
        },
    };

    const currentStyle = styles[type];
    const currentSize = sizeStyles[size];

    return (
        <span style={{
            display: 'inline-block',
            backgroundColor: currentStyle.background,
            color: currentStyle.text,
            fontWeight: 500,
            ...currentSize,
        }}>
            {label}
        </span>
    );
};

export default StatusLabel;