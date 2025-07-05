import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [ip, setIp] = useState(null);
    const [geo, setGeo] = useState(null);

    useEffect(() => {
        // Fetch IP from your backend (update if using port-forwarded URL)
        fetch('http://localhost:3001/get-ip')
            .then(res => res.json())
            .then(data => setIp(data.ip));

        // Get browser geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setGeo({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude
                    });
                },
                (err) => {
                    console.error('Geolocation error:', err);
                }
            );
        }
    }, []);

    return (
        <main className="app">
            <h1>🎯 We Know Where You Are!</h1>
            <section className="info">
                <p><strong>IP Address:</strong> {ip || 'Loading...'}</p>
                <p><strong>Location:</strong> {geo ? `${geo.lat}, ${geo.lon}` : 'Waiting for permission...'}</p>
            </section>

            <div className="commercial">
                <h2>🛡️ Protect Your Privacy Now!</h2>
                <p>Use our top-rated VPN to stay hidden online. Don’t let websites prank you like this one!</p>
                <button onClick={() => alert('Fake ad clicked!')}>Try Free VPN</button>
            </div>

            <footer>
                <small>This site is a harmless prank and does not store any personal data.</small>
            </footer>
        </main>
    );
}

export default App;
