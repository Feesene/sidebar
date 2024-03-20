import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./components/Navbar";
import { MdVerifiedUser, MdGroup, MdCarCrash } from "react-icons/md";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-row h-full w-full relative">
      <NavBar>
        <NavBar.Header>
          <img src={viteLogo} className="w-6 h-6" alt="Vite logo" />
        </NavBar.Header>
        <NavBar.Content>
          <NavBar.Item label="Defesa" icon={MdVerifiedUser}>
            <NavBar.SubGroup>1</NavBar.SubGroup>
            <NavBar.SubGroup>2</NavBar.SubGroup>
            <NavBar.SubGroup>3</NavBar.SubGroup>
          </NavBar.Item>
          <NavBar.Item label="Usuários" icon={MdGroup}>
            <NavBar.SubGroup>1</NavBar.SubGroup>
            <NavBar.SubGroup>2</NavBar.SubGroup>
            <NavBar.SubGroup>3</NavBar.SubGroup>
          </NavBar.Item>
          <NavBar.Item label="Carros" icon={MdCarCrash}></NavBar.Item>
        </NavBar.Content>
        <NavBar.Footer>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </NavBar.Footer>
      </NavBar>
      <div className="flex flex-col justify-center items-center w-full">
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  );
}

export default App;
