import { API_CONFIG } from './config';

export interface BrandfetchResponse {
    name: string;
    domain: string;
    icon?: {
        src: string;
    }[];
    logos?: {
        src: string;
        type: string;
    }[];
}

export class LogoService {
    private static async fetchBrandInfo(brandName: string): Promise<BrandfetchResponse> {
        try {
            const encodedName = encodeURIComponent(brandName);
            const url = `${API_CONFIG.BRANDFETCH_API.BASE_URL}/brands/${encodedName}`;
            
            console.log('Fetching brand info from:', url);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_CONFIG.BRANDFETCH_API.API_KEY}`,
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Response:', {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText
                });
                throw new Error(`Failed to fetch brand info for ${brandName}`);
            }

            const data = await response.json();
            console.log('API Response data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching brand info:', error);
            throw error;
        }
    }

    public static async getGoogleLogo(): Promise<string> {
        try {
            const brandInfo = await this.fetchBrandInfo('google.com');
            
            // Log available logos
            console.log('Available Google logos:', brandInfo.logos);
            console.log('Available Google icons:', brandInfo.icon);
            
            if (brandInfo.logos && brandInfo.logos.length > 0) {
                // Try to find the colored logo first
                const logo = brandInfo.logos.find(l => l.type === 'logo') || brandInfo.logos[0];
                console.log('Selected Google logo:', logo);
                return logo.src;
            }
            
            if (brandInfo.icon && brandInfo.icon.length > 0) {
                console.log('Using Google icon:', brandInfo.icon[0]);
                return brandInfo.icon[0].src;
            }

            console.log('Falling back to default Google logo');
            return '/icons/google.svg';
        } catch (error) {
            console.error('Failed to get Google logo:', error);
            return '/icons/google.svg';
        }
    }

    public static async getAppleLogo(): Promise<string> {
        try {
            const brandInfo = await this.fetchBrandInfo('apple.com');
            
            // Log available logos
            console.log('Available Apple logos:', brandInfo.logos);
            console.log('Available Apple icons:', brandInfo.icon);
            
            if (brandInfo.logos && brandInfo.logos.length > 0) {
                // Try to find the colored logo first
                const logo = brandInfo.logos.find(l => l.type === 'logo') || brandInfo.logos[0];
                console.log('Selected Apple logo:', logo);
                return logo.src;
            }
            
            if (brandInfo.icon && brandInfo.icon.length > 0) {
                console.log('Using Apple icon:', brandInfo.icon[0]);
                return brandInfo.icon[0].src;
            }

            console.log('Falling back to default Apple logo');
            return '/icons/apple.svg';
        } catch (error) {
            console.error('Failed to get Apple logo:', error);
            return '/icons/apple.svg';
        }
    }
}




