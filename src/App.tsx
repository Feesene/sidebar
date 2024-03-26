import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./components/Navbar";
import { MdList, MdLineAxis, MdAddChart } from "react-icons/md";
import { PiCircuitry, PiCircuitryFill, PiUsers, PiUsersFill, PiCar, PiCarFill, PiHouse, PiHouseFill } from "react-icons/pi";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-row h-full w-full relative font-sans">
      <NavBar componentLink={Link}>
        <NavBar.Header>
          <img src={viteLogo} className="w-6 h-6" alt="Vite logo" />
        </NavBar.Header>
        <NavBar.Content>
          <NavBar.Item label="Home" href="/" icon={PiHouse} activeIcon={PiHouseFill} />
          <NavBar.Item label="Layout" icon={PiCircuitry} activeIcon={PiCircuitryFill}>
            <NavBar.Group href="/layout/lists" label="Lists" />
            <NavBar.Group label="Chart examples">
              <NavBar.GroupItem href="/chart1" icon={MdLineAxis} label="chart 1" />
              <NavBar.GroupItem href="/layout/charts/chart2" icon={MdLineAxis} label="chart 2" />
              <NavBar.GroupItem href="/layout/charts/chart3" icon={MdLineAxis} label="chart 3" />
            </NavBar.Group>
            <NavBar.Group label="Examples">
              <NavBar.GroupItem href="/layout/examples/teste1" icon={MdAddChart} label="teste 1" />
              <NavBar.GroupItem href="/layout/examples/teste2" icon={MdAddChart} label="teste 2" />
              <NavBar.GroupItem href="/layout/examples/teste3" icon={MdAddChart} label="teste 3" />
            </NavBar.Group>
          </NavBar.Item>
          <NavBar.Item label="Usuários" icon={PiUsers} activeIcon={PiUsersFill}>
            <NavBar.Group href="/usuarios/adicionar" label="Adicionar" />
            <NavBar.Group href="/usuarios/remover" label="Remover" />
            <NavBar.Group label="Listar">
              <NavBar.GroupItem href="/usuarios/lista1" icon={MdList} label="Lista 1" />
              <NavBar.GroupItem href="/usuarios/lista2" icon={MdList} label="Lista 2" />
              <NavBar.GroupItem href="/usuarios/lista3" icon={MdList} label="Lista 3" />
            </NavBar.Group>
          </NavBar.Item>
          <NavBar.Item href="/veiculos" label="Carros" icon={PiCar} activeIcon={PiCarFill} />
        </NavBar.Content>
        <NavBar.Footer>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </NavBar.Footer>
      </NavBar>
      <div className="flex flex-col justify-center items-center w-full">
        <h1>Vite + React</h1>
        <h1>Pagina: </h1>
        <div className="font-semibold text-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
