import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    WalletIcon,
    DocumentDuplicateIcon,
    CreditCardIcon,
    ClockIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

interface NavItem {
    icon: React.ElementType;
    label: string;
    path: string;
}

interface SidebarProps {
    isOpen: boolean;
}

const navItems: NavItem[] = [
    { icon: HomeIcon, label: 'Dashboard', path: '/dashboard' },
    { icon: WalletIcon, label: 'Wallet', path: '/wallet' },
    { icon: DocumentDuplicateIcon, label: 'My Services', path: '/services' },
    { icon: CreditCardIcon, label: 'Pay Bills', path: '/payments' },
    { icon: ClockIcon, label: 'History', path: '/history' },
    { icon: QuestionMarkCircleIcon, label: 'Help', path: '/support' },
];

const Sidebar = ({ isOpen }: SidebarProps) => {
    const location = useLocation();

    return (
        <aside
            style={{
                backgroundColor: '#121826',
                width: isOpen ? '240px' : '80px',
                height: 'calc(100vh - 80px)', // Adjust for navbar height
                position: 'fixed',
                left: 0,
                top: '80px',
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                zIndex: 40,
                overflow: 'hidden', // Prevent content overflow during transition
            }}
        >
            <nav style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 0',
                overflowY: 'auto',
                overflowX: 'hidden',
                msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
                scrollbarWidth: 'none', // Hide scrollbar in Firefox
            } as React.CSSProperties}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '48px',
                                color: isActive ? '#00C2FF' : '#E6EAF1',
                                textDecoration: 'none',
                                position: 'relative',
                                backgroundColor: isActive ? '#1E2638' : 'transparent',
                                borderLeft: isActive ? '4px solid #00C2FF' : '4px solid transparent',
                                transition: 'all 0.2s ease',
                                width: '100%',
                                marginBottom: '4px',
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = '#1A1F2E';
                                    e.currentTarget.style.color = '#00C2FF';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#E6EAF1';
                                }
                            }}
                            title={!isOpen ? item.label : undefined}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                padding: `0 ${isOpen ? '24px' : '28px'}`,
                                transition: 'padding 0.3s ease',
                            }}>
                                <Icon
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        flexShrink: 0,
                                        filter: isActive ? 'drop-shadow(0 0 4px rgba(0,194,255,0.4))' : 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                />
                                <span style={{
                                    marginLeft: '12px',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    opacity: isOpen ? 1 : 0,
                                    visibility: isOpen ? 'visible' : 'hidden',
                                    transition: 'all 0.2s ease',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
