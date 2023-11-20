import { useState, useEffect } from "react";
import axios from "axios";
import vs from "../img/vs-show.png";
import "/src/App.css";

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
        axios("src/data/data.json")
            .then((res) => {
                setCharacter(res.data);
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
        <main>
            <header>
                <h1>Simulador de Batalla</h1>
            </header>
            <section className="fighterz">
                <article className="fighterz character-card">
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

                    <section>
                        {personaje && (
                            <>
                                <div>
                                    <h2>{personaje.name}</h2>
                                    <h5>Race: {personaje.race}</h5>
                                </div>
                                <ul>
                                    <img src={personaje.img} alt={personaje.name} />
                                    <div className="stats">
                                        <li>Health {parseInt(personaje.health)}</li>
                                        <li>Attack {parseInt(personaje.attack)}</li>
                                        <li>Defense {parseInt(personaje.defense)}</li>
                                    </div>
                                </ul>
                            </>
                        )}
                    </section>
                </article>

                <div id="importImage">
                    <img src={vs} alt="vs" />
                </div>

                <article className="fighterz rival-Card">
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

                    <section>
                        {rival && (
                            <>
                                <div>
                                    <h2>{rival.name}</h2>
                                    <h5>Race: {rival.race}</h5>
                                </div>
                                <ul>
                                    <img src={rival.img} alt={rival.name} />
                                    <div className="stats">
                                        <li>Health {parseInt(rival.health)}</li>
                                        <li>Attack {parseInt(rival.attack)}</li>
                                        <li>Defense {parseInt(rival.defense)}</li>
                                    </div>
                                </ul>
                            </>
                        )}
                    </section>
                </article>
            </section>

            <section>
                {personaje && rival && (
                    <footer>
                        <button type="button" onClick={pelear}>
                            Pelear
                        </button>

                        {victoria && (
                            <>
                                <span>El ganador es {victoria}</span>

                                <button type="button" onClick={guardar}>
                                    Guardar
                                </button>
                            </>
                        )}
                    </footer>
                )}
            </section>
        </main>
    );
};

export default CharacterSelector;
