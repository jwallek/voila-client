import React, {useState, useEffect} from 'react'
import "./Target.css"
import Languages from '../Languages'
import { FaPlay, FaStar } from 'react-icons/fa'
import { ADD_WORD } from '../../Mutations/savedWordMutations'
import { GET_SAVED_WORDS } from '../../Queries/savedWordQueries'
import { useQuery, useMutation, gql } from '@apollo/client'
import TTS from '../Tts/tts'
import Translate from '../Translate'
import Spinner from 'react-bootstrap/Spinner'


function Target(props) {
    const[result, setResult] = useState('')
    const[q, setQ] = useState('')
    const[source, setSource] = useState('')
    const[target, setTarget] = useState('')
    const[save, setSave] = useState('not-saved')
    const[user_id, setUserId] = useState('')

    useEffect(() =>{
      setQ(props.data[0])
      setSource(props.data[1])
      setTarget(props.data[2])
      setSave('not-saved')
      
  
    }, [props])

    useEffect(()=> {
      setUserId(props.id)
    })


    const[addWord] = useMutation(ADD_WORD, {
      variables: {result, q, source, target, user_id},
      update(cache, { data: {addWord} }){
        const { savedwords }= cache.readQuery({ query: GET_SAVED_WORDS, variables:{id: user_id} })
        cache.writeQuery({
          query: GET_SAVED_WORDS,
          variables: {id: user_id},
          data: {savedwords: savedwords.concat([addWord])}
        })
      }
    })
      

    const handleSave = (e) => {
      e.preventDefault()
      if(save === "saved"){
        setSave("not-saved")
      }else{
        setSave("saved")
        if(q === '' || source === '' || target === '' || user_id === ''){
          return alert('Error')
        }
      addWord(result, q, source, target, user_id)
  }
}


  

  return (
    <div className='container output-area'>
      {props.data.length === 0 ? (<img src="images/svg/Translate-Application.svg" width="100%" height="100%"/>) : (
        <>
        <Translate q={q} source={source} target={target} sendResult={setResult}/>
      <div className="response-container">
        {result === ''  || result === 'undefined' || result.length < 1 ? (<Spinner animation="border" role="status" className="loading"><span className="visually-hidden">Loading...</span></Spinner>) : (result)}
       <TTS value={result} lang={target} className="play-btn"/>

      </div>
      <div className="q-container">
        <span>({source} {" -> "} {target} {" - "}{q})</span>
      </div>
      <button className={save === "saved" ? "saved-btn" : "save-btn"} onClick={handleSave} disabled={user_id !== '' ? false : true}>
        {<FaStar className='star'/>}
      </button>
      </>

      )}
      
    </div>
  )
}

export default Target