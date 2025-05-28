import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
}

export interface UserData {
    fullName: string;
    email: string;
    phoneNumber?: string;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(() => {
        // Try to get user data from localStorage on initial load
        const savedUser = localStorage.getItem('userData');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const handleSetUser = (userData: UserData | null) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
        } else {
            localStorage.removeItem('userData');
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser: handleSetUser }}>
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