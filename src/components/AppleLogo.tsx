import React, { useEffect, useState } from 'react';
import { LogoService } from '../services/api/logoService';

const AppleLogo: React.FC = () => {
    const [logoUrl, setLogoUrl] = useState<string>('/default-logo.png');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const url = await LogoService.getAppleLogo();
                setLogoUrl(url);
            } catch (error) {
                console.error('Error fetching Apple logo:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogo();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <img src={logoUrl} alt="Apple Logo" className="w-[419px] h-[512px]" />;
};

export default AppleLogo;