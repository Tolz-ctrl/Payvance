import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    profilePicture?: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    updateUser: (userData: Partial<User>) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUser = async (userData: Partial<User>) => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Replace with actual API call
            const response = await fetch('your-api-endpoint/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update user data');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUser, isLoading, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
