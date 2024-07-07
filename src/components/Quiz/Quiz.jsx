import React, { useState, useRef } from 'react';
import './quiz.css';
import { data, translations } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [language, setLanguage] = useState(null);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setQuestion(data[lang][0]);
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (index === data[language].length - 1) {
      setResult(true);
      return;
    }
    if (lock) {
      setIndex(index + 1);
      setQuestion(data[language][index + 1]);
      setLock(false);
      option_array.forEach(option => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(null);
    setScore(0);
    setLock(false);
    setResult(false);
    setLanguage(null);
  };

  if (!language) {
    return (
      <div className='container language-container'>
        <h1 className='language-title'>{translations.ENG.selectLanguage}</h1>
        <h4 className="creator-title align">{translations.ENG.beforeCreator} {translations.ENG.creator}</h4>
        <button onClick={() => selectLanguage('HUN')}>{translations.HUN.hungarian}</button>
        <button onClick={() => selectLanguage('ENG')}>{translations.ENG.english}</button>
        <button onClick={() => selectLanguage('GER')}>{translations.GER.german}</button>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>{translations[language].quizTitle}</h1>
      <h4 className="creator-title">{translations[language].beforeCreator} {translations[language].creator}</h4>
      <hr />
      {result ? 
        <>
          <h2>{translations[language].score} {score}{translations[language].outOf} {data[language].length}</h2>
          <button onClick={reset}>{translations[language].reset}</button>
        </> :
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>{translations[language].next}</button>
          <div className="index">{index + 1} of {data[language].length} questions</div>
        </>
      }
    </div>
  );
}

export default Quiz;
