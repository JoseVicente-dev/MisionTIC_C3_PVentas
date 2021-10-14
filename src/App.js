import { LoginComponent } from './components/LoginComponent';
import { FooterComponent } from './components/FooterComponent';
import { HeaderNg } from './components/HeaderNg';
import { MenuLateralNg } from './components/MenuLateralNg.jsx';

function App() {

  return (
    <div className="App">

      <HeaderNg/>
      
      <MenuLateralNg/>

      <LoginComponent/>

      <FooterComponent/>

    </div>
  );
}

export default App;
