import Header from "./Components/Header/Header"
import React from 'react'
import { useState, useEffect } from 'react'
import Home from "./Components/Home/Home"
import Languages from "./Components/Languages"
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import About from './Components/About/About'
import Spinner from 'react-bootstrap/Spinner'
import "./App.css"
import Practice from "./Components/Practice/Practice"
import Quiz from "./Components/Quiz/Quiz"





const cache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        users: {
          merge(existing, incoming){
            return incoming
          }
        },
        savedwords:{
          merge(existing, incoming){
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'https://voila-server.onrender.com/graphql',
  cache
})

function App() {
  const [languages, setLanguages] = useState('')
  const [userID, setUserID] = useState('')
  const [words, setWords] = useState([])
  const language = Languages()
  // setLanguages(language)




  return (
    <>
      <ApolloProvider client={client}>
      <Header setId={setUserID} userId={userID}/>
      <Routes>
        <Route path="/" element={language.length > 0 ? (<Home data={language} id={userID}/>) : (<Spinner animation="border" role="status" className="loading"><span className="visually-hidden">Loading...</span></Spinner>)}/>
        <Route path="/about" element={<About />}/>
        <Route path="/practice" element={<Practice id={userID} setwords={setWords}/>}/>
        <Route path="/quiz" element={<Quiz  words={words}/>} />
       </Routes>
      </ApolloProvider>
    </>
  )
}

export default App