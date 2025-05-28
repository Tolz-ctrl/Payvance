
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Section {
  title: string;
  content: string | React.ReactElement;
}

const terms: Section[] = [
  {
    title: "1. Eligibility",
    content:
      "You must be at least 18 years old or the legal age of majority in your jurisdiction to use Payvance. By using Payvance, you represent and warrant that you meet these requirements.",
  },
  {
    title: "2. Account Registration and Security",
    content:
      "You agree to provide accurate, complete, and up-to-date information when creating an account. You are responsible for safeguarding your login credentials and for all activity on your account. Notify us immediately of any unauthorized use.",
  },
  {
    title: "3. Services We Provide",
    content: (
      <ul style={{
        listStyleType: 'disc',
        paddingLeft: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <li>Pay utility bills based on your location.</li>
        <li>Subscribe to and manage software products.</li>
        <li>Save funds towards specific goals.</li>
        <li>Prepay for upcoming software and games.</li>
        <li>Manage school fee payments.</li>
        <li>Auto-register external software subscriptions.</li>
      </ul>
    ),
  },
  {
    title: "4. User Responsibilities",
    content:
      "Use Payvance only for lawful purposes. Ensure that funds used for payments are from legitimate sources. Do not resell, duplicate, or redistribute the platform without authorization.",
  },
  {
    title: "5. Payment Terms",
    content:
      "All payments are final unless explicitly stated otherwise. You are responsible for confirming payment details. We may use third-party payment processors; their terms may also apply.",
  },
  {
    title: "6. Subscription Management",
    content:
      "You may be charged recurring fees for subscriptions. Cancel or delete subscriptions via your dashboard. Deletion does not guarantee refunds unless allowed by the provider.",
  },
  {
    title: "7. Geolocation Usage",
    content:
      "To offer localized services, Payvance may access your device's location data. By using the app, you consent to this functionality.",
  },
  {
    title: "8. Intellectual Property",
    content:
      "All trademarks, logos, and content are the property of Payvance Technologies or its licensors. Do not copy or modify without consent.",
  },
  {
    title: "9. Security",
    content: (
      <div>
        <p style={{ marginBottom: '12px' }}>
          Payvance employs advanced security measures to protect your personal and financial data. This includes data encryption (in transit and at rest), secure user authentication, fraud detection systems, and routine vulnerability assessments. We actively monitor for suspicious activity and unauthorized access to safeguard your account and transactions.
        </p>
        <p>
          However, no system is completely immune to breaches. Users are responsible for maintaining the confidentiality of their account credentials and should use strong passwords, avoid sharing login information, and report any suspicious activity immediately.
        </p>
      </div>
    ),
  },
  {
    title: "10. Data Privacy",
    content: (
      <div>
        <p style={{ marginBottom: '12px' }}>
          We value your privacy. Payvance collects only the data necessary to deliver services effectively and in compliance with applicable laws. This includes personal identifiers, device information, and transaction history. We do not sell your data to third parties.
        </p>
        <p style={{ marginBottom: '12px' }}>
          Your data may be shared with service providers (e.g., payment processors, subscription platforms) strictly for the purpose of delivering Payvance's core services. We apply strict data access controls and only work with partners who uphold similar data protection standards.
        </p>
        <p>
          You can view, update, or request deletion of your data by contacting us at support@payvance.com.
        </p>
      </div>
    ),
  },
  {
    title: "11. Termination",
    content:
      "We may suspend or terminate access at any time for violations of these Terms or harmful behavior on the platform.",
  },
  {
    title: "12. Disclaimer and Limitation of Liability",
    content:
      "Payvance is provided 'as is' without guarantees of uptime. We are not liable for indirect or incidental damages.",
  },
  {
    title: "13. Changes to These Terms",
    content:
      "We may update these Terms periodically. Continued use after changes means you accept them. We'll notify you of material changes.",
  },
  {
    title: "14. Contact",
    content:
      "Questions? Contact us at: support@payvance.com",
  },
];

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '32px 24px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#64748B',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '24px',
          padding: '8px 12px',
          borderRadius: '6px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#F1F5F9';
          e.currentTarget.style.color = '#00C2FF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#64748B';
        }}
      >
        <ArrowLeftIcon style={{ width: '16px', height: '16px' }} />
        Back
      </button>

      <header style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#0B0F1A',
          marginBottom: '8px'
        }}>
          Payvance Terms and Conditions
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#64748B'
        }}>
          Effective Date: May 23, 2025
        </p>
      </header>

      <p style={{
        marginBottom: '32px',
        color: '#475569',
        lineHeight: '1.6'
      }}>
        Welcome to Payvance! These Terms and Conditions ("Terms") govern your access to and use of our mobile and web platform,
        including all services related to utility payments, software subscriptions, savings, and other financial tools
        ("Services"). By accessing or using Payvance, you agree to be bound by these Terms.
      </p>

      {terms.map((section, idx) => {
        // Create an ID for the section based on its title
        const sectionId = section.title.toLowerCase().includes('security') ? 'security' :
                          section.title.toLowerCase().includes('privacy') ? 'privacy' : '';

        return (
          <section key={idx} id={sectionId} style={{ marginBottom: '28px' }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#0B0F1A',
              marginBottom: '12px'
            }}>
              {section.title}
            </h2>
            <div style={{
              color: '#475569',
              fontSize: '15px',
              lineHeight: '1.6'
            }}>
              {section.content}
            </div>
          </section>
        );
      })}

      <div style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #E2E8F0',
        textAlign: 'center',
        color: '#64748B',
        fontSize: '14px'
      }}>
        <p>© 2025 Payvance Technologies. All rights reserved.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
