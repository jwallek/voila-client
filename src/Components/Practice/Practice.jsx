import React, {useState, useEffect} from 'react'
import "./Practice.css"
import { useQuery } from '@apollo/client'
import { GET_SAVED_WORDS } from '../../Queries/savedWordQueries'
import { FaPlus, FaCheck, FaArrowRight, FaSync } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ReactCardFlip from 'react-card-flip'
import TTS from '../Tts/tts'


function Practice({id, setwords}) {
  const [searchedTerm, setSearchedTerm] = useState('')
  const [selected, setSelected] = useState('false')
  const [selectedWords, setSelectedWords] = useState([])
  const [study, setStudy] = useState(false)
  const [flippedCards, setFlippedCards] = useState(new Map())
  
  useEffect(() =>{ 
    selectedWords.map(word => setFlippedCards(map => new Map(map.set(word.id, false))))
  }, [selectedWords])

  const { loading, error, data } = useQuery(GET_SAVED_WORDS, {
    variables: {id}
  })
  if(loading) return <span>Loading...</span>
  if(error) return window.location.href = "/"

  const words = data
  

  const handleSelect = (id) => {
      let savedWord = (data.savedwords.filter((word)=> { if(word.id === id) return word}))

        setSelectedWords([...selectedWords, savedWord[0]])

        selectedWords.map(word => {
          if(word.id === savedWord[0].id){
            setSelectedWords(words => words.filter(word => {
              return word.id !== savedWord[0].id
            }))
          } 
        })
  }

  const handleFlip = (id) => {
    let currentPosition = flippedCards.get(id)
    setFlippedCards(map => new Map(map.set(id, !currentPosition)))
  }

  return (
    <>
    <div className="container-options">
      <input className='search-bar' type="text" placeholder="Search..." onChange={e => setSearchedTerm(e.target.value)} />
      <button className="options-btn study-btn" onClick={() => setStudy(!study)} disabled={selectedWords.length > 0 ? false : true}>{selectedWords.length > 0 && !study ? <span>Study ({selectedWords.length})</span> : (selectedWords.length===0 ? <span>Study</span> : <span>Back</span>)}</button>
      <Link to="/quiz"><button className="options-btn" onClick={() => setwords(selectedWords)} disabled={selectedWords.length > 0 ? false : true}>Quiz</button></Link>
    </div>
    <div className="container-practice"> 
        {study && selectedWords.length > 0 ? 
        selectedWords.filter((word) => {
          if (searchedTerm === '') return word
          else if(word.result.toLowerCase().includes(searchedTerm.toLowerCase())){
            return word
          }
        }).map((word,i) => 
        
        <ReactCardFlip isFlipped={flippedCards.get(word.id)} flipDirection="vertical" containerClassName='flip-container'>
          <div className="card">
              <span className='indicator'>({word.source})</span>
              <h3>{word.q}</h3>
              <TTS value={word.q} lang={word.source}/>
              <button className='flip-btn' onClick={() => handleFlip(word.id)}><FaSync /></button>
          </div>
          <div className="card">
          <span className='indicator'>({word.target})</span>
              <h3>{word.result}</h3>
              <TTS value={word.result} lang={word.target}/>
              <button className='flip-btn' onClick={() => handleFlip(word.id)}><FaSync /></button>
          </div>
        </ReactCardFlip>
      
          ) 
        : 
          words.savedwords.filter((word) => {
            if (searchedTerm === '') return word
            else if(word.result.toLowerCase().includes(searchedTerm.toLowerCase())){
              return word
            }
          }).map((word,i) => 
              <div className="card">
                <button className='plus-btn' id={word.id} onClick={() => handleSelect(word.id)}>{!selectedWords.includes(word) ? <FaPlus /> : <FaCheck className='check'/>}</button>
                <h4 className='result'>{word.result}</h4> 
                <hr className="hr-card"/> 
                <h5 className='q'>{word.q}</h5><h6><em>{`(${word.source}`} <FaArrowRight /> {`${word.target})`}</em></h6>
                </div>
            )}
    </div>
    </>
  )
}

export default Practice