import { LoginComponent } from './components/LoginComponent';
import { FooterComponent } from './components/FooterComponent';
import { HeaderNg } from './components/HeaderNg';
import { MenuLateralNg } from './components/MenuLateralNg.jsx';
import { AdminVentas } from './components/AdminVentas';
import { AdminUsuarios } from './components/AdminUsuarios';
import { AdminProductos } from './components/AdminProductos';


function App() {

  return (
    <div className="App">

      {/* <HeaderNg/> */}
      
      {/* <LoginComponent/> */}

      {/* <FooterComponent/> */}

      <MenuLateralNg usuario='nombre de Usuario' tipo='Administrador_Prueba' foto='foto url'/>

    </div>
  );
}

export default App;
