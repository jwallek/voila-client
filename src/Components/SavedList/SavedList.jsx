import React from 'react'
import "./SavedList.css"
import {FaStar, FaTrash, FaArrowRight, FaPlay, FaBootstrap} from 'react-icons/fa'
import { GET_SAVED_WORDS } from '../../Queries/savedWordQueries'
import { DELETE_WORD } from '../../Mutations/savedWordMutations'
import { useQuery, useMutation } from '@apollo/client'
import TTS from '../Tts/tts'
import Spinner from 'react-bootstrap/Spinner'

function SavedList( {id} ) {

const [deleteWord] = useMutation(DELETE_WORD)
  
const { loading, error, data } = useQuery(GET_SAVED_WORDS, {
    variables: {id}
  })

  if(loading) return <span>Loading...</span>
  // if(error) return "error"


  return (
  <>
  {id !== '' ?(
    <div className='list-container'> 
    <button className="fastar-btn"type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <FaStar className='fastar'/>
    </button>
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Saved Translations</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul className="list-group list-group-flush" >
              {data.savedwords.map((word,i) => 
                <li key={word.id} className='saved-word' 
                  >
                    <div className="left">
                      <div className="top">{word.result}</div>
                      <div className="middle">{`(${word.q})`}</div>
                      <div className="bottom">{word.source} <FaArrowRight /> {word.target}</div>
                      </div>
                      <div className="right">
                        <TTS value={word.result} lang={word.target}/>
                        <button className='trash-btn' onClick={() => deleteWord({ variables: {id: word.id}, refetchQueries: [{query: GET_SAVED_WORDS, variables: {id: word.user.id}}] })}><FaTrash className='trash'/></button>
                        </div>
                        </li>)}
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
        </div>
  ) :(
    <button className="fastar-btn notLoggedIn" type="button">
    <FaStar className='fastar na'/>
    </button>
  )}
  
    </>
  )
}

export default SavedList