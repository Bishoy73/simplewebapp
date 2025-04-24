import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Replace with your EC2 public IP
    fetch('http://56.228.19.62:3000/api/hello') 
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error:', error));
  }, []);

 return (
    <div className="App">
      <h1>Vite + React</h1>
      <div>
        <button onClick={() => setCount(count + 3)}>
          count is {count}
        </button>
      </div>
      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>

      {/* Display the message from the backend */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
