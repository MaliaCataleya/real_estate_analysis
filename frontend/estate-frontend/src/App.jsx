import Map from './components/Map'

function App() {
  return (
    <div className="main">
      <div className="content">

        <header className="app-header">
          <div>
            <span className="eyebrow">REAL ESTATE ANALYTICS</span>
            <h1>Taipei District Explorer</h1>
            <p className='textual'>Explore housing prices and property statistics across New Taipei City.</p>
          </div>
        </header>

        <Map />

      </div>
    </div>
  );
}

export default App;
