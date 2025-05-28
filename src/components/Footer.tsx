
import { Link } from 'react-router-dom';
// import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface FooterSection {    title: string;
    links: {        label: string;
        href: string;    }[];
}
const footerSections: FooterSection[] = [
    {
        title: "Products",
        links: [
            { label: "Dashboard", href: "/dashboard" },
            { label: "Wallet", href: "/wallet" },
            { label: "Bill Payments", href: "/payments" },
        ]
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Blog", href: "/blog" },
        ]
    },
    {
        title: "Support",
        links: [
            { label: "Help Center", href: "/support" },
            { label: "Contact Us", href: "/support#contact" },
            { label: "FAQs", href: "/support#faqs" },
        ]
    },
    {
        title: "Legal",
        links: [
            { label: "Terms", href: "/terms" },
            { label: "Privacy", href: "/terms#privacy" },
            { label: "Security", href: "/terms#security" },
        ]
    }
];
const Footer = () => {
    
    const getHref = (href: string) => {
        return href;
    };

    return (
        <footer style={{
            backgroundColor: '#121826',
            color: '#E6EAF1',
            padding: '64px 24px 32px',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '32px',
                    marginBottom: '48px',
                }}>
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                marginBottom: '16px',
                            }}>
                                {section.title}
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex} style={{ marginBottom: '12px' }}>
                                        <Link
                                            to={getHref(link.href)}
                                            style={{
                                                color: '#A0AEC0',
                                                textDecoration: 'none',
                                                transition: 'color 0.2s ease',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.color = '#00C2FF';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.color = '#A0AEC0';
                                            }}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;








































































