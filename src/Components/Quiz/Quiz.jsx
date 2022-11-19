import React, {useState, useEffect} from 'react'
import './Quiz.css'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import { Link } from 'react-router-dom'
import Countdown from 'react-countdown'
import { FaClock } from 'react-icons/fa'


function Quiz({ words }) {
    const Time = {
        sixty_sec: 60,
        two_min: 120,
        five_min: 300,
        ten_min: 600
    }

    const[selected, setSelected] = useState(false)
    const[time, setTime] = useState(Time.sixty_sec)
    const[question, setQuestion] = useState(0)
    const[score, setScore] = useState(0)
    const[currentTime, setCurrentTime] = useState('')
    const[input, setInput] = useState('')
    const[nextDisabled, setNextDisabled] = useState(true)
    const[timeUp, setTimeUp] = useState(false)
    const[progress, setProgress] = useState(0)

    let numberOfQuestions = words.length    
    const modal = document.getElementById('quiz-modal')
    const userinput = document.getElementById('quiz-input')
    const answer = document.getElementById('correct-answer')
    const feedback = document.getElementById('feedback')


   

    

    
    const handleAnswerSubmit = () => {
        if(input.toLowerCase() === words[question].result.toLowerCase()){
            setScore(score + 1)
            setInput('')
            modal.classList.add('correct')
            feedback.hidden=false
        }
        else{
            setInput('')
            modal.classList.add('incorrect')
            answer.hidden = false
        }
        setNextDisabled(false)
        userinput.disabled = true
    }
    

    const nextQuestion = (e) => {
        e.preventDefault()
        setQuestion(question + 1)
        modal.classList.remove('correct')
        modal.classList.remove('incorrect')
        setInput('')
        userinput.value = ''
        setNextDisabled(true)
        userinput.disabled = false
        answer.hidden=true
        feedback.hidden=true

        
        
    }

    useEffect(() =>{
        setProgress((question/numberOfQuestions) * 100)
    },[question])
    
    console.log(progress)

    const renderer = ({ minutes, seconds, completed }) => {
        if(!completed) return <span>{minutes}:{seconds}</span>
    }


  return (
    <div className='quiz-container'>
        <div className="menu-body">
        <div class="modal fade" id="quizmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="quizmodalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content quiz-modal" id="quiz-modal">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="quizmodalLabel">Quiz</h1>
        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" disabled={question === numberOfQuestions ? false : true}></button>
        
      </div>
      
      <div class="modal-body">
          <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label='Progress' style={{width: progress + "%"}} aria-valuenow={50} aria-valuemax={100}></div>
          </div>
          {question !== numberOfQuestions ? (<>{selected === true ? <Countdown date={(currentTime + time * 1000)} zeroPadTime={2} onComplete={() => setTimeUp(true) } renderer={renderer}/> : ""}
        <div className="card quiz-card">
         {question !== numberOfQuestions && !timeUp? (
         <div className="card-body quiz-card-body">
             <h6>({words[question].source})</h6>
             <h3>{words[question].q}</h3>
             <input type="text" className='quiz-input' id="quiz-input" onChange={(e) => setInput(e.target.value)}></input>
             <h6 className='correct-answer' id="correct-answer" hidden={true}>Correct answer: {words[question].result}</h6>
             <h6 className='feedback' id="feedback" hidden={true}>Correct!</h6>
             <h6>({words[question].target})</h6>
             <button type="button" id="submit-btn" className='quiz-submit' onClick={() => handleAnswerSubmit()}>Submit</button>
         </div>
         ) : 
         (<span>Done!</span>) }
        </div></> ) : (
            <div className="card finished">
                <h3>Done!</h3>
                {score === numberOfQuestions ? <span>{score} / {numberOfQuestions}</span> : <span className='score-output'><span>Correct: {score}</span><span>Incorrect: {numberOfQuestions - score}</span></span>}
            </div>
        )}
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary button exit" style={{border: "none"}} data-bs-dismiss="modal" hidden={question === numberOfQuestions || timeUp ? false : true} onClick={() => setScore(0)}>Close</button>
        <button type="button" class="btn btn-primary button start next" style={{border: "none"}}id="next-btn"onClick={(e) => nextQuestion(e)} disabled={nextDisabled}>Next</button>
      </div>
    </div>
  </div>
</div>
            <h3 className='quiz-title'>Quiz</h3>
            
            <div className="timer-container">
                <div className="toggle-container">
                    <label className='toggle-label'>
                        <Toggle
                            defaultChecked={selected}
                            onChange={() => setSelected(!selected)}
                            className='timer-toggle'
                            
                        />
                        <FaClock className='clock' />
                    </label>
                </div>
                <div className="dropdown-container">
                    <select className='select-time' disabled={selected === true ? false : true} value={time} onChange={e => setTime(e.target.value)}>
                        <option selected value=''>Select a time limit</option>
                        <option value={Time.sixty_sec}>60 seconds</option>
                        <option value={Time.two_min}>2 minutes</option>
                        <option value={Time.five_min}>5 minutes</option>
                        <option value={Time.ten_min}>10 minutes</option>
                    </select>
                </div>
            </div>
            <div className="word-count-container">
                <span>{numberOfQuestions} word(s) </span>
            </div>
        </div>
        <div className="button-container">
            <button className='button btn exit' ><Link className='link-button' to='/practice' style={{textDecoration: "none", color: "white"}}>Exit</Link></button>
            <button className="button link-button btn start" data-bs-toggle="modal" data-bs-target="#quizmodal" onClick={() => {setQuestion(0); setCurrentTime(Date.now())}}>
                Start
            </button>
        </div>
    </div>
  )
}

export default Quiz