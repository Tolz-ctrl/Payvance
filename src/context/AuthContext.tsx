import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
    id: unknown;
    name: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useUser = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useUser must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const login = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
        try {
            setLoading(true);
            
            // Get registered users from localStorage
            const registeredUsersJSON = localStorage.getItem('registered_users');
            const registeredUsers = registeredUsersJSON ? JSON.parse(registeredUsersJSON) : [];
            
            console.log("Login attempt for:", email);
            console.log("Found registered users:", registeredUsers.length);
            
            // Find the user with matching email AND password
            const user = registeredUsers.find((u: any) => 
                u.email === email && u.password === password
            );
            
            if (user) {
                console.log("Valid credentials for user:", user.name);
                
                const userData: User = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
                
                setIsAuthenticated(true);
                setUser(userData);
                
                // Store in localStorage for persistence
                localStorage.setItem('auth_user', JSON.stringify(userData));
                localStorage.setItem('auth_status', 'true');
                
                if (rememberMe) {
                    localStorage.setItem('auth_remember', 'true');
                } else {
                    localStorage.removeItem('auth_remember');
                }
                
                return true;
            }
            
            console.log("Invalid credentials");
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = (): void => {
        setIsAuthenticated(false);
        setUser(null);
        
        // Clear localStorage
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_status');
    };

    // Check for existing auth on mount
    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const savedUser = localStorage.getItem('auth_user');
                const savedAuthStatus = localStorage.getItem('auth_status');
                
                if (savedUser && savedAuthStatus === 'true') {
                    const userData = JSON.parse(savedUser);
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error parsing saved user data:', error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const value: AuthContextType = {
        isAuthenticated,
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
