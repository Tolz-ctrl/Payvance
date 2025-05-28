import { useState } from 'react';
import {
    QuestionMarkCircleIcon,
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    PhoneIcon,
    ChevronDownIcon,
    ChevronUpIcon
} from '@heroicons/react/24/outline';

interface FAQ {
    question: string;
    answer: string;
    category: string;
}

interface SupportCategory {
    id: string;
    title: string;
    description: string;
    icon: React.ForwardRefExoticComponent<any>;
}

const Support = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const categories: SupportCategory[] = [
        {
            id: 'account',
            title: 'Account & Security',
            description: 'Account access, security settings, and profile management',
            icon: QuestionMarkCircleIcon
        },
        {
            id: 'payments',
            title: 'Payments & Billing',
            description: 'Payment issues, transactions, and billing inquiries',
            icon: QuestionMarkCircleIcon
        },
        {
            id: 'technical',
            title: 'Technical Support',
            description: 'App functionality, features, and technical issues',
            icon: QuestionMarkCircleIcon
        }
    ];

    const faqs: FAQ[] = [
        {
            question: 'How do I reset my password?',
            answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address, and we\'ll send you instructions to reset your password.',
            category: 'account'
        },
        {
            question: 'Why is my payment pending?',
            answer: 'Payments may be pending due to bank processing times or verification requirements. Most payments are processed within 24 hours.',
            category: 'payments'
        },
        {
            question: 'How do I set up automatic payments?',
            answer: 'Go to the Payment Automation section under Pay Bills, select the bill you want to automate, and set up your preferred payment schedule.',
            category: 'payments'
        },
        // Add more FAQs as needed
    ];

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement contact form submission
        console.log('Contact form submitted:', contactForm);
    };

    return (
        <div style={{
            padding: '32px 24px',
            maxWidth: '1280px',
            margin: '0 auto'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#1A2233',
                    marginBottom: '16px'
                }}>
                    How can we help you?
                </h1>
                <p style={{
                    fontSize: '18px',
                    color: '#6A7385',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Find answers to common questions or get in touch with our support team
                </p>
            </div>

            {/* Support Categories */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '48px'
            }}>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        style={{
                            padding: '24px',
                            borderRadius: '12px',
                            border: '1px solid #E2E8F0',
                            backgroundColor: activeCategory === category.id ? '#F8FAFC' : 'white',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <category.icon style={{ width: '24px', height: '24px', marginBottom: '16px' }} />
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                            {category.title}
                        </h3>
                        <p style={{ color: '#64748B', fontSize: '14px' }}>
                            {category.description}
                        </p>
                    </button>
                ))}
            </div>

            {/* FAQs */}
            <div id="faqs" style={{
                marginBottom: '48px',
                scrollMarginTop: '100px' // This ensures the section header is visible when scrolled to
            }}>
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '24px'
                }}>
                    Frequently Asked Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {faqs
                        .filter(faq => activeCategory === 'all' || faq.category === activeCategory)
                        .map((faq, index) => (
                            <div
                                key={index}
                                style={{
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '8px',
                                    overflow: 'hidden'
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
                                    <span style={{ fontWeight: '500' }}>{faq.question}</span>
                                    {expandedFAQ === faq.question ? (
                                        <ChevronUpIcon style={{ width: '20px', height: '20px' }} />
                                    ) : (
                                        <ChevronDownIcon style={{ width: '20px', height: '20px' }} />
                                    )}
                                </button>
                                {expandedFAQ === faq.question && (
                                    <div style={{
                                        padding: '16px',
                                        borderTop: '1px solid #E2E8F0',
                                        color: '#64748B'
                                    }}>
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </div>

            {/* Contact Form */}
            <div id="contact" style={{
                scrollMarginTop: '100px' // This ensures the section header is visible when scrolled to
            }}>
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '24px'
                }}>
                    Get in Touch
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '48px'
                }}>
                    {/* Contact Information */}
                    <div>
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px' }}>
                                Contact Information
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <EnvelopeIcon style={{ width: '20px', height: '20px' }} />
                                    <span>support@payvance.com</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <PhoneIcon style={{ width: '20px', height: '20px' }} />
                                    <span>+1 (234) 567-8900</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <ChatBubbleLeftRightIcon style={{ width: '20px', height: '20px' }} />
                                    <span>Live chat available 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleContactSubmit}>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={contactForm.name}
                                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #E2E8F0'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={contactForm.email}
                                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #E2E8F0'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={contactForm.subject}
                                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #E2E8F0'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Message
                                </label>
                                <textarea
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    required
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #E2E8F0',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#00C2FF',
                                    color: 'white',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Support;
