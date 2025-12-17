import React, { useState } from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
// Import assets
// Import assets
import logo from '../assets/newwlogo.png'

const LandingPage = ({ handleLogin }) => {
    const [mode, setMode] = useState('landing') // landing, login, signup

    console.log('LandingPage rendering. Current mode:', mode)

    if (mode === 'login') {
        return (
            <div className="container">
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button onClick={() => setMode('landing')} style={styles.backBtn}>← Back</button>
                </div>
                <LoginForm handleLogin={handleLogin} />
            </div>
        )
    }

    if (mode === 'signup') {
        return (
            <div className="container">
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button onClick={() => setMode('landing')} style={styles.backBtn}>← Back</button>
                </div>
                <SignupForm />
            </div>
        )
    }

    return (
        <div>
            {/* Landing Navbar */}
            <nav style={styles.nav}>
                <div style={styles.navContent}>
                    <div style={styles.logoContainer}>
                        <img src={logo} alt="Tea Logo" style={styles.logoImg} />
                        <span style={styles.logoText}>Tea</span>
                    </div>
                    <div>
                        <button onClick={() => { console.log('Clicked Login'); setMode('login'); }} style={{ ...styles.btn, marginRight: '1rem' }}>Login</button>
                        <button onClick={() => { console.log('Clicked Signup'); setMode('signup'); }} style={styles.btnPrimary}>Sign Up</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header style={styles.hero}>
                <h1 style={styles.heroTitle}>Know the latest tea of your college</h1>
                <p style={styles.heroSubtitle}>Spill it, sip it, share it. Anonymous or loud.</p>
                <button onClick={() => { console.log('Clicked Hero Start'); setMode('signup'); }} style={styles.heroBtn}>Start Brewing</button>
            </header>

            {/* Bottom CTA */}
            <section style={styles.bottomCta}>
                <h2>Ready to spill?</h2>
                <button onClick={() => { console.log('Clicked Bottom Signup'); setMode('signup'); }} style={styles.heroBtn}>Sign Up Now</button>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <p>Created by Ayush Anjay</p>
            </footer>
        </div>
    )
}

const styles = {
    nav: {
        backgroundColor: 'var(--card-bg)',
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 0',
    },
    navContent: {
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logoImg: {
        height: '40px',
        width: '40px',
        objectFit: 'contain',
    },
    logoText: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
    },
    btn: {
        padding: '0.5rem 1rem',
        border: 'none',
        background: 'transparent',
        fontSize: '1rem',
        color: 'var(--text-color)',
        color: 'var(--text-color)',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 10,
    },
    btnPrimary: {
        padding: '0.5rem 1.5rem',
        border: 'none',
        borderRadius: '20px',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: '600',
    },
    hero: {
        textAlign: 'center',
        padding: '4rem 1rem',
        backgroundColor: 'var(--bg-color)',
    },
    heroTitle: {
        fontSize: '3rem',
        marginBottom: '1rem',
        color: 'var(--text-color)',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    heroSubtitle: {
        fontSize: '1.2rem',
        color: 'var(--secondary-color)',
        marginBottom: '2rem',
    },
    heroBtn: {
        padding: '1rem 2rem',
        fontSize: '1.2rem',
        borderRadius: '30px',
        border: 'none',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(156, 39, 176, 0.4)',
        transition: 'transform 0.2s',
    },
    middleSection: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2rem 1rem',
        textAlign: 'center',
    },
    heroImage: {
        maxWidth: '100%',
        borderRadius: '20px',
        boxShadow: 'var(--shadow)',
        marginBottom: '2rem',
        maxHeight: '500px',
        objectFit: 'cover',
    },
    caption: {
        marginBottom: '4rem',
    },
    bottomCta: {
        textAlign: 'center',
        padding: '4rem 1rem',
        backgroundColor: 'var(--card-bg)',
        marginBottom: '2rem',
    },
    footer: {
        textAlign: 'center',
        padding: '2rem',
        color: 'var(--secondary-color)',
        borderTop: '1px solid var(--border-color)',
    },
    backBtn: {
        background: 'transparent',
        border: 'none',
        color: 'var(--text-color)',
        fontSize: '1rem',
        cursor: 'pointer',
    }
}

export default LandingPage
