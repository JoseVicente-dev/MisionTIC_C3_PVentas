import { MenuLateralNg } from './components/MenuLateralNg.jsx';
import fotoUsuario from './images/user2.png'

function App() {

  return (
    <div className="App">

      <MenuLateralNg usuario='nombre de Usuario' tipo='Administrador_Prueba' foto={fotoUsuario}/>

    </div>
  );
}

export default App;
