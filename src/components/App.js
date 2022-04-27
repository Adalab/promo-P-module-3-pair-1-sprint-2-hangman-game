import '../styles/App.scss';
import blackboard from '../images/blackboard.jpg';
import { useState, useEffect } from 'react';
import getWord from '../services/callToApi';

// Cread la funcionalidad necesaria (un servicio por aquí, un useEffect por allá...) para que al arrancar la página se haga una petición a https://palabras-aleatorias-public-api.herokuapp.com/random y se guarde el resultado en la constante de estado word.
// Si al refrescar la página veis que en DevTools > Componentes hay una palabra aleatoria es que lo habéis hecho bien. Además, los guiones de la solución deben tener la misma longitud que la palabra.

function App() {
  //FETCH
  useEffect(() => {
    getWord().then((data) => {
      setWord(data[0]); //Ponemos [0], ya que la api solo nos devuelve un único elemento, y no tenemos id, name...
      console.log(data[0]);
    });
  }, []);

  //BOTÓN INCREMENTAR
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const handleBtnUp = () => {
    setNumberOfErrors(numberOfErrors + 1);
    console.log(numberOfErrors + 1);
  };

  //FUNCIÓN COMPROBAR ELTRA VÁLIDA
  const checkValueInput = (valueInput) => {
    if (valueInput.match('[a-zA-ZñÑáéíóúÁÉÍÓÚ]') !== null) {
      setLastLetter(valueInput);
      return true;
    } else {
      setLastLetter('');
      console.log('la letra no es válida');
      return false;
    }
  };

  //GUARDAR ÚLTIMA LETRA
  const [lastLetter, setLastLetter] = useState('');
  const handleInput = (ev) => {
    const valueInput = ev.target.value;
    const checkedInput = checkValueInput(valueInput);
    if (valueInput !== '' && checkedInput) {
      // checkedInput === true (es lo mismo)
      setUserLetters([...userLetters, valueInput]);
    }
    console.log(userLetters);
  };

  //PINTAR GUIONES
  const [word, setWord] = useState('');
  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map((letter, index) => {
      return <li key={index} className="letter"></li>;
    });
  };

  //CREAR ARRAY PARA LETRAS INTRODUCIDAS
  const [userLetters, setUserLetters] = useState([]);

  return (
    <div className="page">
      <header>
        <h1 className="header__title">Juego del ahorcado</h1>
      </header>
      <main className="main">
        <section>
          <div className="solution">
            <h2 className="title">Solución:</h2>

            <ul className="letters">
              {renderSolutionLetters()}
              {/*    <li className="letter">k</li>
              <li className="letter">a</li>
              <li className="letter"></li>
              <li className="letter">a</li>
              <li className="letter">k</li>
              <li className="letter">r</li>
              <li className="letter"></li>
              <li className="letter">k</li>
              <li className="letter">e</li>
              <li className="letter">r</li> */}
            </ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">
              <li className="letter">f</li>
              <li className="letter">q</li>
              <li className="letter">h</li>
              <li className="letter">p</li>
              <li className="letter">x</li>
            </ul>
          </div>
          <form className="form">
            <label className="title" htmlFor="last-letter">
              Escribe una letra:
            </label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              onChange={handleInput}
            />
          </form>
        </section>
        <section className={`dummy error-${numberOfErrors}`}>
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
        </section>
      </main>{' '}
      <button type="button" onClick={handleBtnUp}>
        Incrementar
      </button>
    </div>
  );
}

export default App;
