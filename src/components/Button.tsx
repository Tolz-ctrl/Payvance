import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    loading?: boolean;
    icon?: React.ElementType;
}

const Button = ({ 
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    loading = false,
    icon: Icon,
    children,
    disabled,
    ...props 
}: ButtonProps) => {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 500,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: fullWidth ? '100%' : 'auto',
    };

    const variants = {
        primary: {
            backgroundColor: '#00C2FF',
            color: '#0B0F1A',
            boxShadow: '0px 4px 15px rgba(0, 194, 255, 0.2)',
            hover: {
                backgroundColor: '#00A6D6',
                transform: 'translateY(-2px)',
                boxShadow: '0px 6px 20px rgba(0, 194, 255, 0.3)',
            },
        },
        secondary: {
            backgroundColor: '#1A2233',
            color: '#E6EAF1',
            hover: {
                backgroundColor: '#2C3447',
            },
        },
    };

    const sizes = {
        small: {
            padding: '8px 16px',
            fontSize: '14px',
            borderRadius: '8px',
        },
        medium: {
            padding: '12px 20px',
            fontSize: '16px',
            borderRadius: '12px',
        },
        large: {
            padding: '16px 24px',
            fontSize: '18px',
            borderRadius: '12px',
        },
    };

    const currentVariant = variants[variant];
    const currentSize = sizes[size];

    const buttonStyle = {
        ...baseStyles,
        ...currentVariant,
        ...currentSize,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
    };

    return (
        <button
            {...props}
            disabled={disabled || loading}
            style={buttonStyle}
            onMouseOver={(e) => {
                if (!disabled && !loading) {
                    Object.assign(e.currentTarget.style, currentVariant.hover);
                }
            }}
            onMouseOut={(e) => {
                Object.assign(e.currentTarget.style, {
                    ...buttonStyle,
                    transform: 'translateY(0)',
                });
            }}
        >
            {loading ? (
                <>
                    <span 
                        style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid',
                            borderColor: `${variant === 'primary' ? '#0B0F1A' : '#E6EAF1'} transparent transparent transparent`,
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginRight: '8px',
                        }}
                    />
                    Loading...
                </>
            ) : (
                <>
                    {Icon && <Icon style={{ width: '20px', height: '20px' }} />}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;