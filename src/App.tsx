import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./components/Navbar";
import { MdVerifiedUser, MdGroup, MdCarCrash, MdList, MdLineAxis, MdAddChart } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-row h-full w-full relative font-sans">
      <NavBar componentLink={Link}>
        <NavBar.Header>
          <img src={viteLogo} className="w-6 h-6" alt="Vite logo" />
        </NavBar.Header>
        <NavBar.Content>
          <NavBar.Item href="/layout" label="Layout" icon={MdVerifiedUser}>
            <NavBar.Group>
              <NavBar.SubGroup link href="/layout/lists" label="Lists" />
            </NavBar.Group>
            <NavBar.Group>
              <NavBar.SubGroup href="/layout/charts" label="Chart examples">
                <NavBar.SubGroupItem link href="/layout/charts/chart1" icon={MdLineAxis} label="chart 1" />
                <NavBar.SubGroupItem link href="/layout/charts/chart2" icon={MdLineAxis} label="chart 2" />
                <NavBar.SubGroupItem link href="/layout/charts/chart3" icon={MdLineAxis} label="chart 3" />
              </NavBar.SubGroup>
            </NavBar.Group>
            <NavBar.Group>
              <NavBar.SubGroup href="/layout/examples" label="Examples">
                <NavBar.SubGroupItem link href="/layout/examples/teste1" icon={MdAddChart} label="teste 1" />
                <NavBar.SubGroupItem link href="/layout/examples/teste2" icon={MdAddChart} label="teste 2" />
                <NavBar.SubGroupItem link href="/layout/examples/teste3" icon={MdAddChart} label="teste 3" />
              </NavBar.SubGroup>
            </NavBar.Group>
          </NavBar.Item>
          <NavBar.Item href="/usuarios" label="Usuários" icon={MdGroup}>
            <NavBar.Group>
              <NavBar.SubGroup link href="/usuarios/adicionar" label="Adicionar" />
            </NavBar.Group>
            <NavBar.Group>
              <NavBar.SubGroup link href="/usuarios/remover" label="Remover" />
            </NavBar.Group>
            <NavBar.Group>
              <NavBar.SubGroup href="/usuarios/lista" label="Listar">
                <NavBar.SubGroupItem link href="/usuarios/lista1" icon={MdList} label="Lista 1" />
                <NavBar.SubGroupItem link href="/usuarios/lista2" icon={MdList} label="Lista 2" />
                <NavBar.SubGroupItem link href="/usuarios/lista3" icon={MdList} label="Lista 3" />
              </NavBar.SubGroup>
            </NavBar.Group>
          </NavBar.Item>
          <NavBar.Item link href="/veiculos" label="Carros" icon={MdCarCrash} />
        </NavBar.Content>
        <NavBar.Footer>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </NavBar.Footer>
      </NavBar>
      <div className="flex flex-col justify-center items-center w-full">
        <Outlet />
        <h1>Vite + React</h1>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  );
}

export default App;
