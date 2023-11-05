import { useState, useEffect } from "react";
import axios from "axios";

const CharacterSelector = () => {
    const [personaje, setPersonaje] = useState(null);

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

    return (
        <>
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
        </>
    );
};

export default CharacterSelector;
