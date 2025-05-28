import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CurrencyDollarIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import AuthContext from "../context/AuthContext";

export default function Login() {
  // Basic component with minimal dependencies to ensure it renders
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Input styles matching other pages
  const inputContainerStyles = {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const iconStyles = {
    width: '20px',
    height: '20px',
    color: '#64748B',
    margin: '0 12px',
  };

  const inputStyles = {
    flex: '1',
    padding: '12px 16px 12px 0',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
  };

  useEffect(() => {
    // Debug function to check localStorage data
    const debugLocalStorage = () => {
      try {
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        console.log("DEBUG - Registered Users:", registeredUsers);
        
        const authUser = localStorage.getItem('auth_user');
        const authStatus = localStorage.getItem('auth_status');
        console.log("DEBUG - Auth Status:", { authUser, authStatus });
      } catch (err) {
        console.error("Error reading localStorage:", err);
      }
    };
    
    debugLocalStorage();
  }, []);

  // Simple login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Get registered users directly from localStorage
      const registeredUsersJSON = localStorage.getItem('registered_users');
      const registeredUsers = registeredUsersJSON ? JSON.parse(registeredUsersJSON) : [];
      
      console.log("Available registered users:", registeredUsers);
      
      // Find user with matching email and password
      const user = registeredUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        // Store auth data directly
        localStorage.setItem('auth_user', JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email
        }));
        localStorage.setItem('auth_status', 'true');
        
        // Navigate to home instead of dashboard
        navigate("/home", { replace: true });
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Simple UI with inline styles to ensure rendering
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0B0F1A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      backgroundImage: "radial-gradient(circle at 10% 20%, rgba(0, 194, 255, 0.05) 0%, transparent 50%)",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px"
      }}>
        {/* Logo */}
        <div style={{textAlign: "center", marginBottom: "2rem"}}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "4rem",
            height: "4rem",
            backgroundColor: "#00C2FF",
            borderRadius: "1rem",
            marginBottom: "1rem",
            boxShadow: "0px 4px 15px rgba(0, 194, 255, 0.2)",
            transition: "all 0.2s ease",
          }}>
            <CurrencyDollarIcon style={{width: "2rem", height: "2rem", color: "#0B0F1A"}} />
          </div>
          <h1 style={{fontSize: "1.875rem", fontWeight: "bold", color: "#FFFFFF", marginBottom: "0.5rem"}}>Payvance</h1>
          <p style={{color: "#E6EAF1"}}>Secure access to your financial dashboard</p>
        </div>

        {/* Form */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "1rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          border: "1px solid #1A2233",
          padding: "2rem"
        }}>
          <div style={{marginBottom: "1.5rem"}}>
            <h2 style={{fontSize: "1.5rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.5rem"}}>Welcome back</h2>
            <p style={{color: "#64748b"}}>Please sign in to your account</p>
          </div>

          {error && (
            <div style={{
              backgroundColor: "#FEE2E2",
              color: "#EF4444",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              fontSize: "14px"
            }}>
              <ExclamationCircleIcon style={{width: "1.25rem", height: "1.25rem", flexShrink: 0}} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{marginBottom: "1.5rem"}}>
              <label 
                htmlFor="email" 
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1A2233"
                }}
              >
                Email address
              </label>
              <div style={{
                ...inputContainerStyles,
                borderColor: error && !formData.email ? '#EF4444' : '#E2E8F0'
              }}>
                <EnvelopeIcon style={iconStyles} />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div style={{marginBottom: "1.5rem"}}>
              <label 
                htmlFor="password" 
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1A2233"
                }}
              >
                Password
              </label>
              <div style={{
                ...inputContainerStyles,
                borderColor: error && !formData.password ? '#EF4444' : '#E2E8F0'
              }}>
                <LockClosedIcon style={iconStyles} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  style={inputStyles}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 12px",
                    color: "#64748B",
                  }}
                >
                  {showPassword ? (
                    <EyeSlashIcon style={{ width: "20px", height: "20px" }} />
                  ) : (
                    <EyeIcon style={{ width: "20px", height: "20px" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem"
            }}>
              <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: "1rem",
                    height: "1rem"
                  }}
                />
                <label htmlFor="remember" style={{fontSize: "0.875rem", color: "#64748b"}}>
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" style={{fontSize: "0.875rem", color: "#00C2FF", fontWeight: "500", textDecoration: "none"}}>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#00C2FF",
                color: "#0B0F1A",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                opacity: isLoading ? 0.7 : 1,
                boxShadow: "0px 4px 15px rgba(0, 194, 255, 0.2)",
              }}
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>

            {/* Sign Up Link */}
            <div style={{marginTop: "1.5rem", textAlign: "center"}}>
              <p style={{fontSize: "0.875rem", color: "#64748b"}}>
                Don't have an account?{" "}
                <Link to="/register" style={{color: "#00C2FF", fontWeight: "500", textDecoration: "none"}}>
                  Sign up for free
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}




