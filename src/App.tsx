import React, { useEffect, useState } from 'react';
import './App.css';
import {getQuizDetails} from './services/quiz_service'; 
import QuestionCard from './Components/QuestionCard';
import {QuestionType, QuizType} from './Types/quiz_types';

function App() {

  let [quiz, setQuiz] = useState<QuestionType[]>([])
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchData(){
      const questions:QuestionType[] = await getQuizDetails(5, 'easy');
      console.log(questions);
      setQuiz(questions)
    }
    fetchData();
  }, []);

  const handleSubmit = (e:React.FormEvent<EventTarget>, userAns:string) => {
    e.preventDefault();

    const currentQuestion:QuizType= quiz[currentStep];

    console.log('correct And: ' + currentQuestion.correct_answer+ '---user Selection: ' + userAns);
    
    if(userAns === currentQuestion.correct_answer){
      setScore(++score);
    }

    if(currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep);
      else {
        alert('You final score is: ' + score + 'out of: ' + quiz.length);
        setCurrentStep(0);
        setScore(0);
      }
  }

  if(!quiz.length)
    return <h3>Loading...</h3>
  return (
    <div className="App">
      <QuestionCard 
        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
