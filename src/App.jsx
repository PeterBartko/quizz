import Quiz from './components/Quiz'
import Result from './components/Result'
import { useState } from 'react'

function App() {
  const [showQuiz, setShowQuiz] = useState(true)
  const [score, setScore] = useState(0)
  const [intro, setIntro] = useState(false)

  return (
    <div className="bg-blue-600 h-screen grid place-items-center">
      {(showQuiz && !intro) && <button onClick={() => setIntro(true)} className="bg-white animate-appear rounded px-5 py-2 font-medium text-blue-500 shadow-md" >Start Quiz</button>}
      {(showQuiz && intro) && <Quiz show={setShowQuiz} setScore={setScore} />}
      {(!showQuiz) && <Result score={score} setIntro={setIntro} setShowQuiz={setShowQuiz} setScore={setScore}/>}
    </div>
  )
}

export default App