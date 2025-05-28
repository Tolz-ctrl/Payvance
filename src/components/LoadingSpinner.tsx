interface LoadingSpinnerProps {
    size?: number;
}

const LoadingSpinner = ({ size = 40 }: LoadingSpinnerProps) => {
    return (
        <div style={{
            display: 'inline-block',
            position: 'relative',
            width: size,
            height: size,
        }}>
            <style>
                {`
                    @keyframes spinner-dots {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            <div style={{
                boxSizing: 'border-box',
                display: 'block',
                position: 'absolute',
                width: size,
                height: size,
                border: `${size/8}px solid #00C2FF`,
                borderRadius: '50%',
                animation: 'spinner-dots 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
                borderColor: '#00C2FF transparent transparent transparent',
                opacity: 0.7,
            }} />
        </div>
    );
};

export default LoadingSpinner;