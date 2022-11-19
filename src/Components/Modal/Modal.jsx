import React, {useState, useEffect} from 'react'
import "./Modal.css"
import SavedList from '../SavedList/SavedList'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS } from '../../Queries/userQueries'
import { ADD_USER } from '../../Mutations/userMutations'
import Spinner from 'react-bootstrap/Spinner'

function Modal(props) {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[loggedIn, setLoggedIn] = useState('false')
    const[user, setUser] = useState('')
    const[usersList, setUsersList] = useState([])
    const[userId, setUserId] = useState('')
    const[email, setEmail] = useState('')
    const[newId, setNewId] = useState('')


    const { loading, error, data } = useQuery(GET_USERS)
    const [addUser] = useMutation(ADD_USER, {
      variables: {username, email, password},
      update(cache, {data: { addUser }}){
        const { users } = cache.readQuery({ query: GET_USERS})
        setNewId(addUser.id)
        cache.writeQuery({
          query: GET_USERS,
          data: {users: [...users, addUser]}
        })
        setLoggedIn('true')
        setUser('username')
        setUserId(addUser.id)
        props.setId.setId(addUser.id)
      }
    })



    useEffect(() =>{
      if(!loading && !error && data){
        setUsersList(data)
        
    }
    },[loading, error, data])

    if(loading) return <Spinner animation="border" role="status" className="loading"><span className="visually-hidden">Loading...</span></Spinner>
    if(error) return <p>Something went wrong...</p>
    

    const signIn = (e) => {
      e.preventDefault()
      
        if(username !== '' && password !== '' && data !== '' && !loading && !error && loggedIn === 'false' && userId === ''){
          for(let i = 0; i < usersList.users.length; i++){
            if(usersList.users[i].username === username && usersList.users[i].password === password){
              
                setLoggedIn('true')
                setUserId(usersList.users[i].id)
                setUser(username)
                setUsername(usersList.users[i].username)
                props.setId.setId(usersList.users[i].id)
                  return
              
              
              
            }
            
          }
          
        }  
        if(loggedIn === 'false'){
          alert('Wrong username and password combination. Please try again')
          setUsername('')
          setPassword('')
        } 
    }

    const signOut = (e) => {
      e.preventDefault()
      setLoggedIn('false')
      setUser('')
      setUsername('')
      props.setId.setId('')
      setUserId('')
      setPassword('')
      alert("Successfully logged out.")
    }


    const register = (e) => {
      e.preventDefault()
      if(email !== '' && username !== '' && password !== '' && confirmPassword !== ''){
        if(password === confirmPassword){
            addUser(email, username, password)
            if(user !== '') {
            // signIn()
            
            
            } 
        } else {
          alert("Passwords do not match")
        }
      }

    }
    
  return (
    <>
    <SavedList id={userId}/>
    {user === '' ? (
      <div className="ml-5">
      <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel">Sign in</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <form className='form-sign-in' onSubmit={signIn}>
        <div className="form-floating mb-3">
            <input type="text" className='form-control' id="floatingInput" placeholder='Username' required onChange={e => setUsername(e.target.value)} value={username}/>
            <label for="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
            <input type="password" className='form-control' id="floatingPassword" placeholder='Password' required onChange={e => setPassword(e.target.value)} value={password}/>
            <label for="floatingPassword">Password</label>
        </div>
        <div className="btn-container">
        <button type="submit" className='btn btn-sign-in' data-bs-dismiss={loggedIn ? "modal": ""}>Sign in</button>
        <button class="btn register-btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Register</button>
        </div>
        </form>
        </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel2">Register</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form onSubmit={register}>
        <div className="form-floating mb-3">
            <input type="text" className='form-control' id="floatingName" placeholder='Username' required onChange={e => setUsername(e.target.value)}/>
            <label for="floatingName">Username</label>
        </div>
        <div className="form-floating mb-3">
            <input type="email" className='form-control' id="floatingInput" placeholder='Email address' required onChange={e => setEmail(e.target.value)}/>
            <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
            <input type="password" className='form-control' id="floatingPassword" placeholder='Password' required onChange={e => setPassword(e.target.value)}/>
            <label for="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
            <input type="password" className='form-control' id="floatingPasswordConfirm" placeholder='Password' required onChange={e => setConfirmPassword(e.target.value)}/>
            <label for="floatingPasswordConfirm">Confirm password</label>
        </div>
        <div className="btn-container">
        <button class="btn return-btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Return</button>
        <button type="submit" className='btn register-submit' data-bs-dismiss="modal" data-bs-target="exampleModalToggle2">Register</button>
        
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
<a class="btn btn-sign-in" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Sign-in</a>
  </div>
    ) : (
      <>
        <button className='btn' onClick={user !== '' ? signOut : "#"}>Sign out</button>
      </>
    )}
  </>
  )
}

export default Modal