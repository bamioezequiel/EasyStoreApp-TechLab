export default function Home() {
  const handleClick = async () => {
    try {
      const response = await fetch('https://easystoreapp-techlab.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      console.log('Login response:', data);
      alert('Login successful!');
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed, check console');
    }
  };

  return (
    <button onClick={handleClick}>Test Login</button>
  );
}
