import logo from './logo.svg';
import {useState, useEffect} from 'react';
import './App.css';

const FetchGetRequest = () => {
  const [data, setData] = useState(null);

  const API_URL = 'https://dev.pulsoid.net/api/v1/data/heart_rate/latest';

  useEffect(() => {
    const fetchItems = async function() {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "Authorization": "Bearer a051ca5c-1be4-4c94-91d1-c23937388f5c",
          }
        });
        if (!response.ok) throw Error('Did not receive expected data');
        const apiData = await response.json();
        setData(apiData.data.heart_rate);
        console.log(apiData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchItems();
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <b>{data}</b>
        </p>
      </header>
    </div>
  )
}

function App() {
  
  return (
    <FetchGetRequest></FetchGetRequest>
  );
}

export default App;
