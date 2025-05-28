interface EmptyStateProps {
    icon: React.ElementType;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

const EmptyState = ({ 
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction
}: EmptyStateProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            textAlign: 'center',
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
        }}>
            <Icon style={{
                width: '48px',
                height: '48px',
                color: '#00C2FF',
                marginBottom: '24px',
            }} />
            
            <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1A2233',
                marginBottom: '8px',
            }}>
                {title}
            </h3>
            
            {description && (
                <p style={{
                    fontSize: '14px',
                    color: '#6A7385',
                    marginBottom: '24px',
                    maxWidth: '300px',
                }}>
                    {description}
                </p>
            )}
            
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    style={{
                        backgroundColor: '#00C2FF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#00A3E6';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#00C2FF';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;