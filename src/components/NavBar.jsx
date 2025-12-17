import React from 'react'
import logo from '../assets/newwlogo.png'

const NavBar = ({ user, handleLogout, theme, toggleTheme, setView }) => {
    return (
        <nav style={styles.nav}>
            <div style={styles.left} onClick={() => setView('home')}>
                <img src={logo} alt="Tea Logo" style={styles.logoImg} />
            </div>

            <div style={styles.middle}>
                <h1 style={styles.title} onClick={() => setView('home')}>Tea</h1>
            </div>

            <div style={styles.right}>
                {user && (
                    <div style={styles.profile} onClick={() => setView('profile')} title="Profile">
                        <div style={styles.avatar}>{(user.name || user.username || 'U')[0].toUpperCase()}</div>
                    </div>
                )}
                {user && (
                    <button onClick={handleLogout} style={{ ...styles.iconBtn, marginLeft: '10px', fontSize: '0.8rem' }}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    )
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'var(--nav-height)',
        padding: '0 2rem',
        backgroundColor: 'var(--card-bg)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)',
    },
    left: {
        flex: 1,
        cursor: 'pointer',
    },
    middle: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '1rem',
    },
    logoImg: {
        height: '40px',
        objectFit: 'contain',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--primary-color)',
        cursor: 'pointer',
    },
    iconBtn: {
        background: 'transparent',
        fontSize: '1.2rem',
        padding: '0.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s',
    },
    profile: {
        cursor: 'pointer',
    },
    avatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    }
}

export default NavBar
