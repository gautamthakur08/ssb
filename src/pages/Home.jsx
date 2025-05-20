import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>SSB psychology tests</h1>
        <p>Select a test to begin your assessment</p>
      </header>

      <div className="test-grid">
        <Link to="/ppdt" className="test-card">
          <div className="card-content">
            <h2>PPDT</h2>
            <p>Picture Perception and Description Test</p>
          </div>
        </Link>


        <Link to="/wat" className="test-card">
          <div className="card-content">
            <h2>WAT</h2>
            <p>Word Association Test</p>
          </div>
        </Link>

        {/* <Link to="/tat" className="test-card">
          <div className="card-content">
            <h2>TAT</h2>
            <p>Thematic Apperception Test</p>
          </div>
        </Link>

        <Link to="/srt" className="test-card">
          <div className="card-content">
            <h2>SRT</h2>
            <p>Situation Reaction Test</p>
          </div>
        </Link> */}
      </div>

      <footer className="footer">
        <p>Aaj fauji practice karega, Tabhi Dushman Girayega</p>
      </footer>
    </div>
  );
};

export default Home;