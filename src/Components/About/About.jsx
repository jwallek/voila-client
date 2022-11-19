import React from 'react'
import "./About.css"


function About() {
  return (
    <div className='about-container'>
      <div className="title-container">
        <h1>Welcome to Voila,</h1> <h5><em>the translation and quiz app.</em></h5>
      </div>
      <div className="background-container">
        <img src="images/logo/languages.webp" className='languages-img' alt="..." />
      </div>
      <div className="documentation-container">
      <nav id="navbar-example2" class="navbar bg-light px-3 mb-3 doc-navbar">
  <ul class="nav nav-pills">
    <li class="nav-item">
      <a class="nav-link" href="#general_use">General Use</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#translation">Translation</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#practice">Practice {"&"} Quiz</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#terms_of_use">Terms of Use</a>
    </li>
    
  </ul>
</nav>
<div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example p-5 text-align-center rounded-2 " tabindex="0">
  <h4 id="general_use">1. General Use</h4>
  <h5>1.1 Creating an account</h5>
  <p>An account can be made by clicking "Sign-in" and then clicking "Register" in the pop-up menu. 
    Once on the page to register, create a username, enter your email, and create a password. Note, 
    for the purposes of this website, a real email address is not needed, however, it is required to enter
    one with the proper format, e.g. myemail@email.com. Once you create an account, you can then save any
    translations and use them for your own purposes.
  </p>
  <h5>1.2 Account data</h5>
  <p>When creating an account, the following data will be saved in the database: username, email, password
    and saved translations. It is up to you, the user, to decide which information you provide to this
    application. You are not required and are recommended against entering any sensitive information such as 
    your real email address, actual passwords, etc. Account data can be and will be deleted after a certain 
    period of time from the administrative side without the consent of the user. The intended purpose of this 
    application is for educational purposes only. 
  </p>
  <h4 id="translation">2. Translation</h4>
  <h5>2.1 Using the translator</h5>
  <p>Users can translate a word or a pair of words from one language to another. Users are required first to 
    set the language of source before selecting a language of target. For supported languages, users can 
    can enable text to speech of the result by clicking on the play button next to the output. Note, not
    all languages have TTS support. Do not rely on this translator for quality and correct translations
    as it depends on a third party API.
  </p>
  <h5>2.2 Saving and deleting words</h5>
  <p>
    In the output section of the translator, users can save their result by selecting the star located at
    the top right corner and likewise delete it by unselecting the star. Once saved, users can select the star 
    located in the header to see the complete list where they can from there delete words and play the TTS 
    playback for supported words. The saved translations can also be found under "practice". Note, users 
    must be signed-in in order to save, delete, and access their saved translations.
  </p>
  <h4 id="practice">3. Practice {"&"} Quiz</h4>
  <h5>3.1 Selecting and Searching</h5>
  <p>
    In the practice section of this application, users can find all saved translations. Users can select translations
    by selecting the plus symbol and can search for search certain translations in the search bar.
  </p>
  <h5>3.2 Study</h5>
  <p>
    Once the user selects certain translation(s), they can select "Study" and can filter the saved translations
    to only portray the saved results. The selected saved translation(s) turn in to cards that can be flipped
    back and forth as a way to study, with one side containing one translation and vice versa. From the study section,
    users can then proceed to the quiz section, with the saved translation(s), or return to the main practice page.
   </p>
  <h5>3.3 Quiz</h5>
  <p>
    Users can access the quiz section either from the main practice page or from the study section. Once on the 
    main page of the quiz section, users can choose to enable a timer and choose the length of time. Once 
    the quiz begins, the user is required to finish it prior to closing the window. The quiz allows the user 
    to test various translations by having to input the correct translation of the provided word/words. The 
    input is not case sensitive. Once selecting "submit", users are provided with instant feedback that shows
    whether their input was correct or not. If the user provides an incorrect answer, they are then shown the correct
    answer. On top of the quiz pop-up, users can see their progress with the progress bar as well as the remaining
    time if they enabled the timer before starting the quiz. At the end of the quiz, users can see their overall result and exit.
  </p>
  <h4 id="terms_of_use">4. Terms of Use</h4>
  <h5>4.1 User responsibility</h5>
  <p>
    This application, as mentioned before, is for educational purposes only and provides users with the ability
    to test it. The users are asked to refrain from blank by running numerous calls on the translator, saving 
    large amounts of data, and provided inappropiate data to application. This application relies on an API to 
    provide translations and limits calls by number of characters per month. Users are asked to translate a single or 
    a few words at a time and refrain from translating large amounts of text. 

  </p>
</div>
      </div>
    </div>
  )
}

export default About