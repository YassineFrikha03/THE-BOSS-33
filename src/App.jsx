import Footer from './components/Footer';
import Menu from './pages/Menu';
import './index.css';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
