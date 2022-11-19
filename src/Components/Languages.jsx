import React, {useEffect, useState} from 'react'
import axios from 'axios'



function Languages() {
    const [languageList, setLanguageList] = useState([])
  
const options = {
    method: 'GET',
    url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2/languages',
    headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_X_RAPID_API_KEY_GET_LANG}`,
      'X-RapidAPI-Host': `${process.env.REACT_APP_X_RAPID_API_HOST_GET_LANG}`
    }
  };
  
   useEffect(() => {
      axios.request(options).then(function (response) {
        let data = response.data.languages.filter(language => language.language.length === 2)
        setLanguageList(data);
        console.log('Request Sent')

    }).catch(function (error) {
    console.error(error);
 });
  }, [])

 

  
  return (
    languageList
  )
}

export default Languages