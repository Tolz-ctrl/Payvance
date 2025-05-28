import React, { useState,  } from 'react';
// import { ArrowRightIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
    UserGroupIcon,
    ShieldCheckIcon,
    SparklesIcon,
    GlobeAltIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '@heroicons/react/24/outline';
import Collab from "../assets/collab.jpg";
import Founding from "../assets/founding.jpg";
import { LogoService } from '../services/api/logoService';
import BackButton from '../components/BackButton';
// Service Card Component with animation
const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  details 
}: { 
  icon: string; 
  title: string; 
  description: string;
  details?: string[];
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '320px',
        backgroundColor: "#f8fafc",
        borderRadius: "0.75rem",
        padding: "2rem",
        border: "1px solid #f1f5f9",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
        overflow: "hidden",
        boxShadow: isHovered ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "none",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-expanded={isHovered}
    >
      {/* Icon and title container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.5s ease-in-out',
          position: isHovered ? 'absolute' : 'relative',
          left: isHovered ? '50%' : '0',
          top: isHovered ? '20px' : '0',
          transform: isHovered ? 'translateX(-50%) scale(0.8)' : 'translateX(0) scale(1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isHovered ? '2rem' : '2.5rem',
            marginBottom: '1rem',
            transition: 'all 0.5s ease',
            backgroundColor: isHovered ? '#E6F7FF' : 'transparent',
            borderRadius: '50%',
            width: isHovered ? '60px' : '80px',
            height: isHovered ? '60px' : '80px',
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontSize: isHovered ? '1.1rem' : '1.25rem',
            fontWeight: 600,
            color: "#0f172a",
            marginBottom: "0.75rem",
            textAlign: "center",
            transition: 'all 0.5s ease',
          }}
        >
          {title}
        </h3>
      </div>

      {/* Content container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '2rem',
          paddingTop: '100px',
          textAlign: 'left',
          transition: 'all 0.5s ease',
          transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
          opacity: isHovered ? 1 : 0,
          overflowY: 'auto'
        }}
      >
        <div style={{ marginTop: '2rem', width: '100%' }}>
          <p style={{ 
            color: "#475569", 
            marginBottom: '1rem',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {description}
          </p>
          
          {isHovered && details && details.length > 0 && (
            <ul style={{ 
              listStyleType: 'none', 
              padding: 0,
              margin: 0,
              marginTop: '1rem'
            }}>
              {details.map((detail, index) => (
                <li key={index} style={{ 
                  padding: '0.5rem',
                  marginBottom: '0.5rem',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '0.5rem',
                  fontSize: '0.85rem',
                  color: '#334155',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}>
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// Value Card Component
const ValueCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        borderRadius: "0.75rem",
        padding: "2rem",
        border: "1px solid #f1f5f9",
        transition: "box-shadow 0.2s",
        height: "100%",
        boxShadow: isHovered ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ fontSize: "2.25rem", marginBottom: "1rem" }}>{icon}</div>
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "#0f172a",
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </h3>
      <p style={{ color: "#475569" }}>{description}</p>
    </div>
  );
};

// Team Member Component
const TeamMember = ({ 
  name, 
  role, 
  image, 
  description 
}: { 
  name: string; 
  role: string; 
  image: string;
  description?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: "inline-block",
        width: "calc(33.333% - 2rem)",
        margin: "1rem",
        position: "relative",
        borderRadius: "0.75rem",
        overflow: "hidden",
        boxShadow: isHovered
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: "relative", paddingBottom: "100%", backgroundColor: "#f1f5f9" }}>
        <img
          src={image}
          alt={name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: isHovered ? "brightness(0.7)" : "brightness(1)",
            transition: "filter 0.3s ease",
          }}
        />
        
        {/* Overlay with description that appears on hover */}
        {description && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <p style={{ 
              color: "white", 
              fontSize: "0.9rem", 
              lineHeight: "1.5",
              textAlign: "center" 
            }}>
              {description}
            </p>
          </div>
        )}
      </div>
      <div
        style={{
          padding: "1.25rem",
          backgroundColor: "white",
        }}
      >
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "#0f172a",
            marginBottom: "0.25rem",
          }}
        >
          {name}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "#00C2FF", fontWeight: 500 }}>{role}</p>
      </div>
    </div>
  );
};

// Primary Button Component
const PrimaryButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        backgroundColor: isHovered ? "#00A6D6" : "#00C2FF",
        color: "#0B0F1A",
        fontWeight: 500,
        textDecoration: "none",
        transition: "background-color 0.2s, transform 0.2s",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: isHovered ? "0px 6px 20px rgba(0, 194, 255, 0.3)" : "0px 4px 15px rgba(0, 194, 255, 0.2)",
        marginRight: "1rem",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

// Secondary Button Component
const SecondaryButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        backgroundColor: isHovered ? "#2C3447" : "#1A2233",
        color: "#E6EAF1",
        fontWeight: 500,
        textDecoration: "none",
        transition: "background-color 0.2s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

// Dark Button Component
const DarkButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        backgroundColor: isHovered ? "#334155" : "#1e293b",
        border: "1px solid #334155",
        color: "white",
        fontWeight: 500,
        textDecoration: "none",
        transition: "background-color 0.2s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

// Arrow Right Icon Component
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      marginLeft: "0.5rem",
      height: "1rem",
      width: "1rem",
      verticalAlign: "middle",
    }}
  >
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
)

// Testimonial Card Component
const TestimonialCard = ({ quote, author, company }: { quote: string; author: string; company: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        borderRadius: "0.75rem",
        padding: "2rem",
        border: "1px solid #f1f5f9",
        transition: "box-shadow 0.2s, transform 0.3s",
        height: "100%",
        boxShadow: isHovered ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" : "none",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p style={{ fontSize: "1.125rem", color: "#475569", marginBottom: "1.5rem", fontStyle: "italic" }}>"{quote}"</p>
      <div>
        <p style={{ fontWeight: 600, color: "#0f172a" }}>{author}</p>
        <p style={{ color: "#64748b", fontSize: "0.875rem" }}>{company}</p>
      </div>
    </div>
  );
}

// Partner Category Component with improved logo handling
const PartnerCategory = ({ 
  title, 
  icon, 
  companies 
}: { 
  title: string; 
  icon: string; 
  companies: {name: string, domain?: string, logoUrl?: string}[];
}) => {
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>(
    companies.reduce((acc, company) => ({...acc, [company.name]: true}), {})
  );

  // Function to get logo URL directly from Brandfetch CDN with updated format
  const getLogoUrl = (company: {name: string, domain?: string, logoUrl?: string}) => {
    // If a custom logo URL is provided, use that
    if (company.logoUrl) {
      return company.logoUrl;
    }
    
    // Otherwise use the Brandfetch CDN
    if (company.domain) {
      // Remove protocol and www if present
      const cleanDomain = company.domain.replace(/^(https?:\/\/)?(www\.)?/, '');
      return `https://cdn.brandfetch.io/${cleanDomain}/w/512/h/512/logo?c=1idQOP3w5WG5h4g__Gn`;
    }
    
    // Fallback to placeholder
    return `https://via.placeholder.com/150/0088cc/FFFFFF?text=${company.name.charAt(0)}`;
  };

  const handleImageLoad = (companyName: string) => {
    setLoadingStates(prev => ({...prev, [companyName]: false}));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, company: {name: string}) => {
    console.log(`Error loading image for ${company.name}`);
    const target = e.target as HTMLImageElement;
    target.src = `https://via.placeholder.com/150/0088cc/FFFFFF?text=${company.name.charAt(0)}`;
    setLoadingStates(prev => ({...prev, [company.name]: false}));
  };

  return (
    <div style={{ marginBottom: "3rem" }}>
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        marginBottom: "1.5rem",
        gap: "0.75rem"
      }}>
        <span style={{ fontSize: "1.5rem" }}>{icon}</span>
        <h3 style={{ 
          fontSize: "1.25rem", 
          fontWeight: 600, 
          color: "#0f172a",
          margin: 0
        }}>
          {title}
        </h3>
      </div>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", 
        gap: "1.5rem" 
      }}>
        {companies.map((company, index) => (
          <div 
            key={index}
            style={{
              padding: "1rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              transform: expandedCompany === company.name ? "scale(1.05)" : "scale(1)",
            }}
            onClick={() => setExpandedCompany(expandedCompany === company.name ? null : company.name)}
            title={company.name} // Add title attribute for tooltip on hover
          >
            <div style={{ 
              height: "60px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              position: "relative"
            }}>
              {loadingStates[company.name] && (
                <div style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  border: "2px solid #f3f3f3",
                  borderTop: "2px solid #00C2FF",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
              )}
              <img 
                src={getLogoUrl(company)} 
                alt={company.name} 
                style={{
                  maxWidth: "100%",
                  maxHeight: "60px",
                  objectFit: "contain",
                  opacity: loadingStates[company.name] ? 0 : 1,
                  transition: "opacity 0.3s ease"
                }}
                onLoad={() => handleImageLoad(company.name)}
                onError={(e) => handleImageError(e, company)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

// Main Component
const AboutPage: React.FC = () => {
  // Add a style tag for the spinner animation
  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Data
 const values = [
     {
         icon: UserGroupIcon,
         title: 'Customer First',
         description: 'We put our customers at the heart of everything we do, ensuring their needs drive our innovations.'
     },
     {
         icon: ShieldCheckIcon,
         title: 'Security',
         description: 'We maintain the highest standards of security to protect our users financial data and transactions.'
     },
     {
         icon: SparklesIcon,
         title: 'Innovation',
         description: 'We continuously evolve our platform to provide cutting-edge solutions for modern payment needs.'
     },
     {
         icon: GlobeAltIcon,
         title: 'Accessibility',
         description: 'We make financial management tools accessible to everyone, regardless of their technical expertise.'
     }
 ];

  const services = [
    {
      icon: "🏠",
      title: "Utility Bill Management",
      description: "Manage all your essential home utilities in one place:",
      details: [
        "Electricity – Pay PHCN/DISCOs like Ikeja, Eko",
        "Water – Settle bills with state water boards",
        "Gas – Pay for LPG refills or piped gas",
        "Waste – Manage monthly waste bills"
      ]
    },
    {
      icon: "📶",
      title: "Telecom & Internet",
      description: "Handle all your connectivity needs seamlessly:",
      details: [
        "Airtime & Data – Recharge MTN, Airtel, Glo, 9mobile",
        "Internet – Pay ISPs like Spectranet, Smile",
        "Postpaid – Settle mobile postpaid bills"
      ]
    },
    {
      icon: "📺",
      title: "TV Subscriptions",
      description: "Never miss your favorite shows with easy subscription management:",
      details: [
        "Cable TV – Renew DSTV, GOTV, or StarTimes",
        "Streaming – Manage Netflix, Amazon Prime subscriptions",
        "Pay-per-view – Access special events and content"
      ]
    },
    {
      icon: "💳",
      title: "Financial Tools",
      description: "Smart financial features to simplify your bill payments:",
      details: [
        "Virtual Wallet – Fund once, pay for everything",
        "AutoPay – Set and forget your recurring bills",
        "Priorities – Choose which services get paid first",
        "Bill Split – Share utility costs with others"
      ]
    },
    {
      icon: "🔔",
      title: "Reminders & Alerts",
      description: "Stay on top of all your payments with smart notifications:",
      details: [
        "Due Date Alerts – Never miss a payment deadline",
        "Low Balance Warnings – Get notified before funds run out",
        "Payment Confirmations – Instant receipts for all transactions",
        "Usage Alerts – Monitor unusual consumption patterns"
      ]
    },
    {
      icon: "📊",
      title: "Spending Analytics",
      description: "Gain insights into your utility spending habits:",
      details: [
        "Monthly Reports – Track spending across all utilities",
        "Seasonal Comparisons – Understand usage patterns",
        "Budget Planning – Set limits for different categories",
        "Saving Opportunities – Identify where you can reduce costs"
      ]
    },
  ];

  const team = [
    {
      name: "Toluwani Onipede",
      role: "Founder & Product Lead",
      description: "Drives product vision and user experience. Focused on solving everyday financial pain points through smart automation and clean design.",
      image: "https://via.placeholder.com/400",
    },
    {
      name: "Sam Rivera",
      role: "Engineering Lead",
      description: "Architects the core platform and ensures performance, security, and scalability. Obsessed with writing clean, efficient code.",
      image: "https://via.placeholder.com/400",
    },
    {
      name: "Jamie Chen",
      role: "Design & UX",
      description: "Crafts intuitive, beautiful interfaces that users love to interact with. Champions simplicity and accessibility across all screens.",
      image: "https://via.placeholder.com/400",
    },
    {
      name: "Taylor Morgan",
      role: "Marketing & Growth",
      description: "Tells the Payvance story. Focused on user acquisition, retention, and community building through campaigns that actually resonate.",
      image: "https://via.placeholder.com/400",
    },
    {
      name: "Jordan Smith",
      role: "Partnerships & Support",
      description: "Builds bridges with utility providers and ensures users get the help they need—fast, friendly, and reliable.",
      image: "https://via.placeholder.com/400",
    },
  ];

  const stats = [
    { number: "0+", label: "Services Provided" },
    { number: "1+", label: "Team Members" },
    { number: "30+", label: "States Served" },
    { number: "95%", label: "Client Satisfaction" },
  ];

  const testimonials = [
    {
      quote:
        "Payvance took the headache out of paying for electricity and internet. I now spend zero time worrying about renewals.",
      author: "Sarah Johnson",
      company: "Product Manager, TechCorp",
    },
    {
      quote:
        "I love how everything is in one place — airtime, TV, bills. It just works, every time.",
      author: "Michael Chen",
      company: "Founder, Innovate Inc.",
    },
    {
      quote:
        "The auto-pay feature has been a game-changer. No more late payments or service interruptions.",
      author: "Emma Rodriguez",
      company: "Operations Lead, Global Solutions",
    },
  ];

  const partnerCompanies = {
    utilities: [
      { name: "Ikeja Electric", domain: "ikejaelectric.com" },
      { name: "Eko Electricity Distribution Company", domain: "ekedp.com" },
      { name: "Port Harcourt Electricity Distribution Company", logoUrl: "/icons/phedc.webp" },
      { name: "Kano Electricity Distribution Company", domain: "kedco.ng" },
      { name: "Enugu Electricity Distribution Company", domain: "enugudisco.com" },
      { name: "Abuja Electricity Distribution Company", logoUrl: "/icons/aedc.png" },
      { name: "Lagos Water Corporation", logoUrl: "/icons/lwc.png" },
      { name: "LAWMA", domain: "lawma.gov.ng" },
    ],
    telecom: [
      { 
        name: "MTN", 
        domain: "mtn.com",
        logoUrl: "https://www.mtn.com/wp-content/themes/mtn-refresh/public/img/mtn-logo.svg"
      },
      { 
        name: "Airtel", 
        domain: "airtel.com.ng",
        logoUrl: "https://cdn.brandfetch.io/airtel.com/w/512/h/128/logo?c=1idQOP3w5WG5h4g__Gn"
      },
      { 
        name: "Glo", 
        domain: "gloworld.com",
        logoUrl: "https://cdn.brandfetch.io/gloworld.com/w/70/h/70/logo?c=1idQOP3w5WG5h4g__Gn" 
      },
      { 
        name: "9mobile", 
        domain: "9mobile.com.ng",
        logoUrl: "https://cdn.brandfetch.io/9mobile.com.ng/w/305/h/512/logo?c=1idQOP3w5WG5h4g__Gn"
      },
      { name: "Spectranet", domain: "spectranet.com.ng" },
      { name: "Smile Communications", domain: "smile.com.ng" },
      { name: "Swift Networks", domain: "swiftng.com" },
    ],
    entertainment: [
      { 
        name: "DSTV", logoUrl: "/icons/dstv.jpg"
      },
      { 
        name: "GOTV", logoUrl: "/icons/gotv.jpg"
      },
      { name: "StarTimes", logoUrl: "/icons/startimes.jpg" },
      { 
        name: "Netflix", 
        domain: "netflix.com",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
      },
      { 
        name: "Spotify", 
        domain: "spotify.com",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1200px-Spotify_logo_without_text.svg.png"
      },
      { 
        name: "Amazon Prime", 
        domain: "amazon.com",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/1200px-Amazon_Prime_Logo.svg.png"
      },
      { 
        name: "YouTube Premium", 
        domain: "youtube.com",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1200px-YouTube_full-color_icon_%282017%29.svg.png"
      },
    ],
    technology: [
      { 
        name: "Paystack", 
        domain: "paystack.com",
        logoUrl: "https://cdn.brandfetch.io/paystack.com/w/512/h/91/logo?c=1idQOP3w5WG5h4g__Gn"
      },
      { 
        name: "Flutterwave", 
        domain: "flutterwave.com",
        logoUrl: "https://cdn.brandfetch.io/flutterwave.com/w/512/h/81/logo?c=1idQOP3w5WG5h4g__Gn"
      },
      { name: "Mono", domain: "mono.co" },
      { name: "Okra", domain: "okra.ng" },
      { 
        name: "AWS", 
        domain: "aws.amazon.com",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"
      },
      { 
        name: "Google Cloud", 
        domain: "cloud.google.com",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/1200px-Google_Cloud_logo.svg.png"
      },
    ]
  };

  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      question: 'How does Payvance simplify bill payments?',
      answer: 'Payvance consolidates all your utility bills, subscriptions, and payments in one platform. You can manage everything from a single dashboard, set up automatic payments, and receive timely reminders.',
      category: 'general'
    },
    {
      question: 'Is my financial information secure with Payvance?',
      answer: 'Absolutely. We employ bank-level encryption and security protocols to protect your data. We never store your complete card details and use tokenization for all transactions.',
      category: 'security'
    },
    {
      question: 'What payment methods are supported?',
      answer: 'Payvance supports multiple payment methods including debit/credit cards, bank transfers, and digital wallets. You can add multiple payment methods to your account for flexibility.',
      category: 'payments'
    },
    {
      question: 'Can I schedule automatic payments?',
      answer: 'Yes! One of our core features is the ability to schedule one-time or recurring payments. You can set up auto-pay for your bills with custom rules and limits.',
      category: 'features'
    },
    {
      question: 'How do I get started with Payvance?',
      answer: 'Simply register for an account, verify your email, add your payment method, and start adding the bills you want to manage. Our onboarding process will guide you through each step.',
      category: 'general'
    }
  ];

  return (
    <div style={{ backgroundColor: "white" }}>
      <BackButton />
      {/* Hero Section */}
      <section style={{ position: "relative", overflow: "hidden", padding: "5rem 0 8rem" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom right, #f8fafc, #f1f5f9)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "table",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "table-cell",
                verticalAlign: "middle",
                paddingRight: "2rem",
                width: "50%",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  backgroundColor: "#00C2FF",
                  border: "1px solid #e2e8f0",
                  color: "#475569",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  marginBottom: "1.5rem",
                }}
              >
                About Us
              </div>
              <h1
                style={{
                  fontSize: "2.25rem",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: "#0f172a",
                  marginBottom: "1.5rem",
                }}
              >
                We're on a mission to  <span style={{ color: "#00C2FF" }}>simplify bill payments and financial management </span>for everyone
              </h1>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "#475569",
                  maxWidth: "32rem",
                  marginBottom: "1.5rem",
                }}
              >
                At Payvance, we believe managing bills should be simple and stress-free. 
                                Our platform is designed to give you complete control over your payments 
                                while saving you time and eliminating the hassle of managing multiple 
                                payment platforms.
              </p>
              <div style={{ marginBottom: "1rem" }}>
                <PrimaryButton href="/contact">
                  Get in touch
                  <ArrowRightIcon style={{ width: "20px", height: "20px" }} />
                </PrimaryButton>
                <SecondaryButton href="/careers">Join our team</SecondaryButton>
              </div>
            </div>
            <div
              style={{
                display: "table-cell",
                verticalAlign: "middle",
                width: "50%",
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: "-1rem",
                    backgroundColor: "#E6F7FF",
                    borderRadius: "1rem",
                    transform: "rotate(-2deg)",
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 10,
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <img
                    src={Collab}
                    alt="Our team collaborating"
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              maxWidth: "48rem",
              margin: "0 auto",
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "1.5rem",
              }}
            >
              Our Mission & Values
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#475569" }}>
            We're committed to providing innovative solutions that make financial 
                                management accessible to everyone, backed by robust security and 
                                exceptional customer support.
            </p>
          </div>

          <div style={{ overflow: "hidden", marginLeft: "-1rem", marginRight: "-1rem" }}>
            {values.map((value, index) => (
              <div
                key={index}
                style={{
                  float: "left",
                  width: "33.333%",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  marginBottom: "2rem",
                  boxSizing: "border-box",
                  color:"#00C2FF"
                }}
              >
                <ValueCard 
                  icon={<value.icon style={{ width: "24px", height: "24px" }} />} 
                  title={value.title} 
                  description={value.description} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: "5rem 0", backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ width: "50%", padding: "1rem" }}>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        inset: "-1rem",
                        backgroundColor: "#d1fae5",
                        borderRadius: "1rem",
                        transform: "rotate(-2deg)",
                        zIndex: 0,
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        zIndex: 10,
                        borderRadius: "0.75rem",
                        overflow: "hidden",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <img
                        src={Founding}
                        alt="Company founding"
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </td>
                <td style={{ width: "50%", padding: "1rem", verticalAlign: "middle" }}>
                  <h2 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#0f172a", marginBottom: "1.5rem" }}>
                    Our Story
                  </h2>
                  <p style={{ fontSize: "1.125rem", color: "#475569", marginBottom: "1.5rem" }}>
                  In Nigeria, managing bills is more than just a monthly routine—it's a constant source of stress. 
                  Between unstable electricity, unexpected data cutoffs, and last-minute DSTV renewals, utility payments 
                  feel like a never-ending chore
                  </p>
                  <p style={{ fontSize: "1.125rem", color: "#475569", marginBottom: "1.5rem" }}>
                  But the real headache? Juggling multiple apps, bank transfers, USSD codes, 
                  and payment portals—each with their own logins, fees, and failed transaction 
                  risks.It’s chaotic, time-consuming, and often unreliable.
                  </p>
                  <p style={{ fontSize: "1.125rem", color: "#475569", marginBottom: "1.5rem" }}>
                  At <span style= {{color:"#00C2FF"}}>Payvance</span>, we believe no one should have to deal with that kind of friction just to stay connected.
                  </p>
                  <p style={{fontSize:"1.125rem", color:"#475569", marginBottom:"1.5rem"}}>
                  We built Payvance to simplify everything. One wallet. One dashboard. One priority system that ensures your
                  essentials are always taken care of—automatically. Whether it’s power, water, internet, or TV, you decide what
                  gets paid first, and we handle the rest behind the scenes.
                  No more hopping between apps. No more late fees. No more surprises.
                  <span style={{color:"#00C2FF"}}>Payvance gives you control, convenience, and peace of mind.</span>Because modern living should feel smart—not scattered.
                  </p>
                  <div>
                    <a
                      href="/history"
                      style={{
                        display: "inline-block",
                        color: "#00C2FF",
                        fontWeight: 500,
                        textDecoration: "none",
                      }}
                    >
                      {/* Read our full story
                      <ArrowRightIcon /> */}
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Services We Work With */}
      <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              maxWidth: "48rem",
              margin: "0 auto",
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "1.5rem",
              }}
            >
              Services We Work With
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#475569" }}>
              We specialize in a wide range of technologies and services to deliver exceptional digital experiences for
              our clients.
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
              gap: "1.5rem",
              maxWidth: "1200px",
              margin: "0 auto"
            }}>
              {services.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  icon={service.icon} 
                  title={service.title} 
                  description={service.description}
                  details={service.details}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: "5rem 0", backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              maxWidth: "48rem",
              margin: "0 auto",
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "1.5rem",
              }}
            >
              Meet Our Team
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#475569" }}>
              We're a diverse group of thinkers, creators, and problem-solvers committed to making bill payments simpler for everyone.
            </p>
          </div>

          <div style={{ textAlign: "center", marginLeft: "-1rem", marginRight: "-1rem", fontSize: "1.75rem" }}>
            {team.map((member, index) => (
              <TeamMember 
                key={index} 
                name={member.name} 
                role={member.role} 
                image={member.image} 
                description={member.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "5rem 0", backgroundColor: "#00C2FF", color: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              maxWidth: "48rem",
              margin: "0 auto",
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              Our Impact
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#a7f3d0" }}>
              We're proud of what we've accomplished together with our clients and community.
            </p>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                {stats.map((stat, index) => (
                  <td key={index} style={{ width: "25%", textAlign: "center", padding: "1rem" }}>
                    <div
                      style={{
                        fontSize: "2.25rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {stat.number}
                    </div>
                    <p style={{ color: "#a7f3d0" }}>{stat.label}</p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              maxWidth: "48rem",
              margin: "0 auto",
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "1.5rem",
              }}
            >
              What People Say
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#475569" }}>
              Don't just take our word for it — here's what our users have to say about simplifying life with Payvance:
            </p>
          </div>

          <div style={{ overflow: "hidden", marginLeft: "-1rem", marginRight: "-1rem" }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  float: "left",
                  width: "33.333%",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  marginBottom: "2rem",
                  boxSizing: "border-box",
                }}
              >
                <TestimonialCard quote={testimonial.quote} author={testimonial.author} company={testimonial.company} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              maxWidth: "48rem",
              margin: "0 auto",
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "1.5rem",
              }}
            >
              Companies We Work With
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#475569" }}>
              We partner with trusted utility providers, telecom networks, and digital service platforms to bring seamless payments to your fingertips.
            </p>
          </div>

          <div>
            <PartnerCategory 
              title="Utility & Billers" 
              icon="⚡" 
              companies={partnerCompanies.utilities} 
            />
            
            <PartnerCategory 
              title="Telecom & Internet Providers" 
              icon="📶" 
              companies={partnerCompanies.telecom} 
            />
            
            <PartnerCategory 
              title="Entertainment & Subscriptions" 
              icon="📺" 
              companies={partnerCompanies.entertainment} 
            />
            
            <PartnerCategory 
              title="Technology & Payment Partners" 
              icon="💼" 
              companies={partnerCompanies.technology} 
            />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq" style={{ padding: "5rem 0", backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              maxWidth: "48rem",
              margin: "0 auto",
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "1.5rem",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#475569" }}>
              Find answers to common questions about Payvance and our services.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: 'white'
                }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.question ? null : faq.question)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: '500', color: '#0f172a' }}>{faq.question}</span>
                  {expandedFAQ === faq.question ? (
                    <ChevronUpIcon style={{ width: '20px', height: '20px', color: '#00C2FF' }} />
                  ) : (
                    <ChevronDownIcon style={{ width: '20px', height: '20px', color: '#00C2FF' }} />
                  )}
                </button>
                {expandedFAQ === faq.question && (
                  <div style={{
                    padding: '16px',
                    borderTop: '1px solid #E2E8F0',
                    color: '#475569'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "5rem 0", backgroundColor: "#0f172a", color: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ maxWidth: "64rem", margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              Ready to take the stress out of bill payments?
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#cbd5e1",
                marginBottom: "2rem",
                maxWidth: "42rem",
                margin: "0 auto 2rem",
              }}
            >
              Join thousands of users who trust Payvance to simplify and automate their utility payments. One wallet. Zero hassle. Total control.
            </p>
            <div>
              <PrimaryButton href="/register">
                Start Paying Smartly
                <ArrowRightIcon />
              </PrimaryButton>
              {/* <DarkButton href="/case-studies">View our work</DarkButton> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage


