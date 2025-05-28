
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import AppLayout from "./components/AppLayout";
import Landing from "./pages/Landing";
import Services from "./pages/Services";
import Wallet from "./pages/Wallet";
import Payments from "./pages/Payments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Support from "./pages/Support";
import NoPage from "./pages/NoPage";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TermsAndConditions from "./pages/TermsAndConditions";

const App = () => {
  return (
    <UserProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes outside AppLayout */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/terms" element={<TermsAndConditions />} />

            {/* Protected routes with AppLayout */}
            <Route element={<AppLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/services" element={<Services />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/history" element={<History />} />
              <Route path="/support" element={<Support />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* 404 Route - Must be last */}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </UserProvider>
  );
};

export default App;









