import React, {useState, useEffect, Fragment} from 'react'
import "./Home.css"
import Target from '../Target/Target'
import { FaArrowRight } from 'react-icons/fa'
import Spinner from 'react-bootstrap/Spinner'



function Home(props) {

    const[source, setSource] = useState('')
    const[target, setTarget] = useState('')
    const[text, setText] = useState('')
    const[targetData, setTargetData] = useState([])
  
   
    useEffect(()=>{
            if(props.data.length > 0){
                let s  = props.data[0].language
                let t = props.data[1].language
                setSource(s)
                setTarget(t)
            }else{
                <Spinner />
            }

    },[props])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(target === ''){
            alert('Please select a language to translate to.')
        } 
        else if(text === ''){
            alert('Please enter text before translating.')
        }
        else{
            setTargetData([text, source, target])
        }
    }

  

    const setSourceData = (e) => {
        setSource(e.target.value)
        setTarget('')

    }
    


    
  return (
      <>
    <div className='container home-container'>
    <form className='input-form' onSubmit={handleSubmit}>
        <div className="input-area">
            <div className="mb-3 input-group input-group-lg input-text">
                <input type="text" className='form-control' id="input" placeholder='Enter some text...' autoFocus onChange={e => setText(e.target.value)}/>
            </div>
            </div> 
            <div className="select-area">
                <select className='source' onChange={setSourceData} value={source}>
                    {props.data.map((language) => <option value={language.language}>{language.name}</option>)}
                </select>
                <FaArrowRight className='arrow'/>
                <select className='target' onChange={e => setTarget(e.target.value)} value={target}>
                    <option value="default" >Select a language</option>
                    {props.data.filter(language => {return language.language !== source}).map(language => <option value={language.language}>{language.name}</option>)}
                </select>
            </div>
            <div className="submit-area">
            <button type="submit" className='btn submit-btn'>Voila!</button>
            </div>
              
        </form>
    </div>
    <hr className='hr' />
    <Target data={targetData} id={props.id}/>
    </>
  )
}

export default Home