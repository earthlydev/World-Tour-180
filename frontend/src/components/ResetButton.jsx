import { useState } from 'react';

function ResetButton({ backendURL, onResetComplete }) {
    const [isResetting, setIsResetting] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleReset = async () => {
        // Confirm with the user before proceeding
        if (!window.confirm('Are you sure you want to reset the database? This will delete all current data and restore the initial sample data.')) {
            return;
        }

        setIsResetting(true);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch(`${backendURL}/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to reset database');
            }

            setMessage('Database reset successfully! Refreshing data...');
            
            // If a callback was provided, call it to refresh data
            if (onResetComplete && typeof onResetComplete === 'function') {
                setTimeout(() => {
                    onResetComplete();
                    setMessage(null);
                }, 1500);
            }
        } catch (err) {
            console.error('Error resetting database:', err);
            setError(`Error: ${err.message}`);
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <div className="reset-button-container">
            <button 
                onClick={handleReset} 
                disabled={isResetting}
                className="reset-button"
                style={{
                    backgroundColor: '#ff3b30',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isResetting ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    marginBottom: '16px'
                }}
            >
                {isResetting ? 'Resetting...' : 'RESET DATABASE'}
            </button>
            
            {message && (
                <div style={{ color: 'green', marginTop: '8px' }}>
                    {message}
                </div>
            )}
            
            {error && (
                <div style={{ color: 'red', marginTop: '8px' }}>
                    {error}
                </div>
            )}
        </div>
    );
}

export default ResetButton;