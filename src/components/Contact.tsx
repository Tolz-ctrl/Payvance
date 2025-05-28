import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Contact = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{
      isolation: 'isolate',
      backgroundColor: 'white',
      padding: '6rem 1.5rem',
    }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          insetInlineStart: 0,
          insetInlineEnd: 0,
          top: '-10rem',
          zIndex: -10,
          transform: 'translateZ(0)',
          overflow: 'hidden',
          filter: 'blur(3rem)',
        }}
      >
        <div
          style={{
            position: 'relative',
            left: '50%',
            zIndex: -10,
            aspectRatio: '1155/678',
            width: '36.125rem',
            maxWidth: 'none',
            transform: 'translateX(-50%) rotate(30deg)',
            background: 'linear-gradient(to top right, rgba(255, 128, 181, 0.3), rgba(144, 137, 252, 0.3))',
            opacity: 0.3,
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div style={{
        maxWidth: '42rem',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 600,
          letterSpacing: '-0.025em',
          color: '#00C2FF',
        }}>Contact Us</h2>
        <p style={{
          marginTop: '0.5rem',
          fontSize: '1.125rem',
          lineHeight: '2rem',
          color: '#4B5563',
          fontWeight:'bold'
        }}>Send us a Message</p>
      </div>
      <form style={{
        maxWidth: '36rem',
        margin: '4rem auto 0',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
          gap: '1.5rem',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '2rem',
          }}>
            <div>
              <label 
                htmlFor="first-name" 
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  lineHeight: '1.5rem',
                  fontWeight: 600,
                  color: '#111827',
                }}
              >
                First name
              </label>
              <div style={{ marginTop: '0.625rem' }}>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  style={{
                    display: 'block',
                    width: '100%',
                    borderRadius: '0.375rem',
                    backgroundColor: 'white',
                    padding: '0.5rem 0.875rem',
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    color: '#111827',
                    outline: '1px solid #D1D5DB',
                    outlineOffset: '-1px',
                  }}
                />
              </div>
            </div>
            <div>
              <label 
                htmlFor="last-name" 
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  lineHeight: '1.5rem',
                  fontWeight: 600,
                  color: '#111827',
                }}
              >
                Last name
              </label>
              <div style={{ marginTop: '0.625rem' }}>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  style={{
                    display: 'block',
                    width: '100%',
                    borderRadius: '0.375rem',
                    backgroundColor: 'white',
                    padding: '0.5rem 0.875rem',
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    color: '#111827',
                    outline: '1px solid #D1D5DB',
                    outlineOffset: '-1px',
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <label 
              htmlFor="company" 
              style={{
                display: 'block',
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
                fontWeight: 600,
                color: '#111827',
              }}
            >
              Company
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white',
                  padding: '0.5rem 0.875rem',
                  fontSize: '1rem',
                  lineHeight: '1.5rem',
                  color: '#111827',
                  outline: '1px solid #D1D5DB',
                  outlineOffset: '-1px',
                }}
              />
            </div>
          </div>
          <div>
            <label 
              htmlFor="email" 
              style={{
                display: 'block',
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
                fontWeight: 600,
                color: '#111827',
              }}
            >
              Email
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white',
                  padding: '0.5rem 0.875rem',
                  fontSize: '1rem',
                  lineHeight: '1.5rem',
                  color: '#111827',
                  outline: '1px solid #D1D5DB',
                  outlineOffset: '-1px',
                }}
              />
            </div>
          </div>
          <div>
            <label 
              htmlFor="phone-number" 
              style={{
                display: 'block',
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
                fontWeight: 600,
                color: '#111827',
              }}
            >
              Phone number
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <div style={{
                display: 'flex',
                borderRadius: '0.375rem',
                backgroundColor: 'white',
                outline: '1px solid #D1D5DB',
                outlineOffset: '-1px',
              }}>
                <div style={{
                  position: 'relative',
                  display: 'inline-block',
                }}>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    style={{
                      appearance: 'none',
                      borderRadius: '0.375rem',
                      padding: '0.5rem 1.75rem 0.5rem 0.875rem',
                      fontSize: '1rem',
                      lineHeight: '1.5rem',
                      color: '#6B7280',
                      border: 'none',
                      background: 'transparent',
                    }}
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                    <option>NG</option>
                  </select>
                  <div style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{ color: '#6B7280' }}
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </div>
                </div>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  placeholder="08154723456"
                  style={{
                    display: 'block',
                    minWidth: 0,
                    flexGrow: 1,
                    padding: '0.375rem 0.75rem 0.375rem 0.25rem',
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    color: '#111827',
                    border: 'none',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <label 
              htmlFor="message" 
              style={{
                display: 'block',
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
                fontWeight: 600,
                color: '#111827',
              }}
            >
              Message
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <textarea
                id="message"
                name="message"
                rows={4}
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white',
                  padding: '0.5rem 0.875rem',
                  fontSize: '1rem',
                  lineHeight: '1.5rem',
                  color: '#111827',
                  outline: '1px solid #D1D5DB',
                  outlineOffset: '-1px',
                }}
              />
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '1rem',
          }}>
            <div style={{
              display: 'flex',
              height: '1.5rem',
              alignItems: 'center',
            }}>
              <button
                type="button"
                role="switch"
                aria-checked={agreed}
                onClick={() => setAgreed(!agreed)}
                style={{
                  width: '6rem',
                  alignContent:'center',
                  cursor: 'pointer',
                  borderRadius: '9999px',
                  backgroundColor: agreed ? '#00C2FF' : '#E5E7EB',
                  padding: '1px',
                  border: 'none',
                  boxShadow: 'inset 0 0 0 1px rgba(17, 24, 39, 0.05)',
                  transition: 'background-color 200ms ease-in-out',
                  fontWeight:'bold'
                }}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  style={{
                    display: 'block',
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '9999px',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(17, 24, 39, 0.05)',
                    transform: agreed ? 'translateX(0.875rem)' : 'translateX(0)',
                    transition: 'transform 200ms ease-in-out',
                  }}
                />
              </button>
            </div>
            <div style={{
              fontSize: '0.875rem',
              lineHeight: '1.5rem',
              color: '#4B5563',
            }}>
              By selecting this, you agree to our{' '}
              <a 
                href="#" 
                style={{
                  fontWeight: 600,
                  color: '#00C2FF',
                  textDecoration: 'none',
                }}
              >
                privacy&nbsp;policy
              </a>
              .
            </div>
          </div>
        </div>
        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <BackButton />
        </div>
      </form>
    </div>
  );
};

export default Contact;
