import React from 'react'
import { FaPlay, FaVolumeUp } from 'react-icons/fa'
import "./tts.css"
import { useSpeechSynthesis } from 'react-speech-kit'

function TTS({ value, lang }) {
  const { speak, voices, speaking} = useSpeechSynthesis()
  const languages = new Map()


  voices.map((language, key)=> languages.set(key, language.lang.substr(0,2)))


    const getLanguages = () => {
      for(let [key, language] of languages){
        if (lang === language){
          return voices[key]
        } 
      }
      return null
    }

  
 
  async function handleSpeak() { 
    speak({ text: value, voice: await getLanguages() })
      
  }



  

  
  return (
    <button className='play-btn' onClick={() => handleSpeak()}>{!speaking ? <FaPlay className='play-icon'/> : <FaVolumeUp className="play-icon" />}</button>
  )
}

export default TTS