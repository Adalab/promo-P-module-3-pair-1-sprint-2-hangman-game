import '../styles/components/App.scss';
import '../styles/core/Reset.scss';
import blackboard from '../images/blackboard.jpg';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import getWord from '../services/callToApi';
import Header from './Header';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import Footer from './Footer';
import Instructions from './Instructions';
import Options from './Options';

function App() {
  //FETCH
  useEffect(() => {
    getWord().then((data) => {
      setWord(data[0]); //Ponemos [0], ya que la api solo nos devuelve un único elemento, y no tenemos id, name...
      console.log(data[0]);
    });
  }, []);

  //constantes de estado
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');

  // events

  const handleKeyDown = (ev) => {
    // Sabrías decir para qué es esta línea
    ev.target.setSelectionRange(0, 1);
  };

  const handleChange = (ev) => {
    let re = /[a-zA-Z]/; //add regular pattern - lesson 3.3 exercise 2
    if (re.test(ev.target.value)) {
      handleLastLetter(ev.target.value);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const renderErrorLetters = () => {
    const errorLetters = userLetters.filter(
      (letter) =>
        word.toLocaleLowerCase().includes(letter.toLocaleLowerCase()) === false
    );
    return errorLetters.map((letter, index) => {
      return (
        <li key={index} className="letter">
          {letter}
        </li>
      );
    });
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  return (
    <div className="page">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className="main">
              <section>
                <SolutionLetters word={word} userLetters={userLetters} />
                <div className="error">
                  <h2 className="title">Letras falladas:</h2>
                  <ul className="letters">{renderErrorLetters()}</ul>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                  <label className="title" htmlFor="last-letter">
                    Escribe una letra:
                  </label>
                  <input
                    autoFocus
                    autoComplete="off"
                    className="form__input"
                    maxLength="1"
                    type="text"
                    name="last-letter"
                    id="last-letter"
                    value={lastLetter}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                  />
                </form>
              </section>
              <Dummy numberOfErrors={getNumberOfErrors()} />
            </main>
          }
        />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/options" element={<Options />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
