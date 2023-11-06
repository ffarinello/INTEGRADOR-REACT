import CharacterSelector from "./components/CharacterSelector";
import Historial from "./components/Historial";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
    return (
        // <>
        //     <CharacterSelector />
        // </>

        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element ={<CharacterSelector />} />
                    <Route path="/historial" element ={<Historial />} />
                    <Route path="/*" element={<h1>Page not found</h1>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;