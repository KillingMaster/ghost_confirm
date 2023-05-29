import React, {useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const confirmInput = useRef<HTMLInputElement>(null);
  const wrapper = useRef<HTMLInputElement>(null);
  const [canEscape, setCanEscape] = useState(false);
  const [escaped, setEscaped] = useState(false);
  function  setErrorStyle() {
    confirmInput.current?.classList.add('border-red-500');
    confirmInput.current?.classList.add('hover:bg-red-100');
    nextBtn.current?.classList.add('bg-red-500');
    nextBtn.current?.classList.add('hover:bg-red-600');
    wrapper.current?.classList.add('border-red-500');
    wrapper.current?.classList.add('shadow-red-500');
  }
  function removeErrorStyle() {
    confirmInput.current?.classList.remove('border-red-500');
    confirmInput.current?.classList.remove('hover:bg-red-100');
    nextBtn.current?.classList.remove('bg-red-500');
    nextBtn.current?.classList.remove('hover:bg-red-600');
    wrapper.current?.classList.remove('border-red-500');
    wrapper.current?.classList.remove('shadow-red-500');
  }
  function escapingNextBtn(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      if (canEscape){
          const escapeOrientation = escaped ? 100 : -100;
          if(nextBtn.current) {
              nextBtn.current.style.transform = `translate(${escapeOrientation}px, 0px)`;
              nextBtn.current.style.transition = `transform 1s`;
              setEscaped(!escaped);
          }
      }
      else {
          if(nextBtn.current) {
                nextBtn.current.style.transform = `translate(0px, 0px)`;
                nextBtn.current.style.transition = `transform 1s`;
          }
      }
  }
  useEffect(() => {
    if (password !== confirmPassword) {
      setIsPasswordValid(false);
      setErrorStyle();
      setCanEscape(true);
    } else {
      setIsPasswordValid(true);
      removeErrorStyle();
      setCanEscape(false);
    }
  }
    , [password, confirmPassword])

  useEffect(() => {
    if (isPasswordValid && pseudo.length > 0 && nextBtn.current) {
      nextBtn.current?.removeAttribute('disabled');
      nextBtn.current.style.transform = `translate(0px, 0px)`;
    } else {
      nextBtn.current?.setAttribute('disabled', 'true');
    }
  }
    , [isPasswordValid, pseudo])
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        switch (name) {
            case 'pseudo':
            setPseudo(value)
            break
            case 'password':
            setPassword(value)
            break
            case 'confirmPassword':
            setConfirmPassword(value)
            break
        }
    }

  return (
    <div className="App">
        <div className="flex flex-col items-center justify-center mx-auto w-1/2 p-3 h-screen">
            <div className="flex flex-col items-center justify-center border-4 border-green-300 rounded-bl-3xl rounded-tr-3xl px-12 py-8 shadow-green-500 shadow-2xl" ref={wrapper}>
                <h1 className = "text-center text-3xl font-bold text-green-900 mb-1">Inscription</h1>
                <p className = "text-center text-md font-bold text-green-500 mb-2">Veuillez vous inscrire pour continuer</p>
                <input className = "border-2 border-green-500 rounded-md p-2 m-2 hover:bg-green-100 hover:text-black focus:outline-none"
                       type="text"
                       placeholder="Pseudo"
                       name="pseudo"
                       value={pseudo}
                       onChange={handleInputChange}
                />
                <input className = "border-2 border-green-500 rounded-md p-2 m-2 hover:bg-green-100 hover:text-black focus:outline-none"
                       type="password"
                       placeholder="Mot de passe"
                       name="password"
                       value={password}
                       onChange={handleInputChange}
                />
                <input className = "border-2 border-green-500 rounded-md p-2 m-2 hover:bg-green-100 hover:text-black focus:outline-none"
                       type="password"
                       placeholder="Confirmer le mot de passe"
                       name="confirmPassword"
                       value={confirmPassword}
                       onChange={handleInputChange}
                       ref={confirmInput}
                />
                <button className = "border-2 bg-green-500 border-white text-white rounded-bl-2xl rounded-tr-2xl p-2 mt-3 hover:bg-green-600 hover:text-white focus:outline-none visited:bg-green-600"
                        type="button" ref={nextBtn} id="next"
                        onMouseEnter={escapingNextBtn}
                >
                    <span className = "flex items-center justify-between">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2"><path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" /></svg>
                    Continuer
                    </span>
                </button>
            </div>
        </div>
    </div>
  );
}

export default App;
