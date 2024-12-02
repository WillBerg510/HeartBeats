import logo from './logo.svg';
import {useState, useEffect} from 'react';
import './App.css';

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const codeVerifier  = generateRandomString(64);

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed);

const clientId = '9da39ee411dc40c1b069995782a00621';
const redirectUri = 'https://dsaproject3heartbeats.netlify.app/';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

//authUrl.search = new URLSearchParams(params).toString();
//window.location.href = authUrl.toString();

const FetchGetRequest = () => {
  const [data, setData] = useState(null);

  const API_URL = 'https://api.getsongbpm.com/search/?api_key=YOUR_API_KEY_HERE&type=artist&lookup=green+day';

  useEffect(() => {
    const fetchItems = async function() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const apiData = await response.json();
        setData(apiData);
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
          <b>{data?.bpm}</b>
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
