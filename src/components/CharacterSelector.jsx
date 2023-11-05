import { useState, useEffect } from "react";
import axios from "axios";

const CharacterSelector = () => {
    const [personaje, setPersonaje] = useState(null);
    const [rival, setRival] = useState(null);
    const [victoria, setVictoria] = useState(null);
    const [peleas, setPeleas] = useState(() => {
        // usar tambien para historial
        if (!localStorage.getItem("peleas")) {
            localStorage.setItem("peleas", JSON.stringify([]));
            return [];
        }
        return JSON.parse(localStorage.getItem("peleas"));
    });

    const [character, setCharacter] = useState([]);
    useEffect(() => {
        axios("https://back-dragon-ballzs-mwfw-dev.fl0.io/api")
            .then((res) => {
                setCharacter(res.data.characters);
            })
            .catch((error) => {
                console.error("Error al cargar los datos de propiedades", error);
            });
    }, []);

    const pelear = () => {
        let pHealth = parseInt(personaje.health);
        let rHealth = parseInt(rival.health);
        while (pHealth > 0 && rHealth > 0) {
            pHealth = pHealth - parseInt(rival.attack);
            rHealth = rHealth - parseInt(personaje.attack);
        }
        setVictoria(pHealth > rHealth ? personaje.name : rival.name);
    };

    const guardar = () => {
        setPeleas([...peleas, { personaje, rival, victoria }]);
        window.location.replace("/historial");
    };

    useEffect(() => {
        localStorage.setItem("peleas", JSON.stringify(peleas));
    }, [peleas]);

    return (
        <>
            <h1>Simulador de Batalla</h1>
            {personaje && (
                <section>
                    <div id="charName">
                        <h2>{personaje.name}</h2>
                        <h2>Race: {personaje.race}</h2>
                    </div>
                    <ul className="card">
                        <img src={personaje.img} alt={personaje.name} />
                        <li>Health: {personaje.health}</li>
                        <li>Attack: {personaje.attack}</li>
                        <li>Defense: {personaje.defense}</li>
                    </ul>
                </section>
            )}

            <select name="char" id="char" onChange={({ target }) => setPersonaje(character.find(({ id }) => id == target.value))}>
                <option selected disabled>
                    Seleccionar personaje:
                </option>

                {character.map((char) => (
                    <option key={char.id} value={char.id}>
                        {char.name}
                    </option>
                ))}
            </select>

            {rival && (
                <section>
                    <div id="charName">
                        <h2>{rival.name}</h2>
                        <h2>Race: {rival.race}</h2>
                    </div>
                    <ul className="card">
                        <img src={rival.img} alt={rival.name} />
                        <li>Health: {rival.health}</li>
                        <li>Attack: {rival.attack}</li>
                        <li>Defense: {rival.defense}</li>
                    </ul>
                </section>
            )}

            <select name="char" id="char" onChange={({ target }) => setRival(character.find(({ id }) => id == target.value))}>
                <option selected disabled>
                    Seleccionar personaje:
                </option>

                {character.map((char) => (
                    <option key={char.id} value={char.id}>
                        {char.name}
                    </option>
                ))}
            </select>

            {personaje && rival && (
                <>
                    <button type="button" onClick={pelear}>
                        Pelear
                    </button>

                    {victoria && (
                        <>
                            <p>El ganador es {victoria}</p>

                            <button type="button" onClick={guardar}>
                                Guardar
                            </button>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default CharacterSelector;
