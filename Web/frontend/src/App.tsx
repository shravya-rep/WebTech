
import './App.css'
import Inputpage from './pages/Inputpage.tsx';
import { ThemeProvider } from 'react-bootstrap';



function App() {
  const breakpoints = {
    xs:0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  };
  return (
  <div>
        <ThemeProvider
      breakpoints={Object.keys(breakpoints)}
    >
    <Inputpage />
    </ThemeProvider>

  </div>
  )
}

export default App