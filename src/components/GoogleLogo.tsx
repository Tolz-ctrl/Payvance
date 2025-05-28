import React, { useEffect, useState } from 'react';
import { LogoService } from '../services/api/logoService';

const GoogleLogo: React.FC = () => {
    const [logoUrl, setLogoUrl] = useState<string>('/default-logo.png');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const url = await LogoService.getGoogleLogo();
                setLogoUrl(url);
            } catch (error) {
                console.error('Error fetching Google logo:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogo();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <img 
        src={logoUrl} 
        alt="Google Logo" 
        className="w-[512px] h-[512px]"
        style={{
            objectFit: 'contain'
        }}
    />;
};

export default GoogleLogo;