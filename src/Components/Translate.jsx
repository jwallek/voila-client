import React, {useEffect} from 'react'
const axios = require("axios");

function Translate(props) {

let result

async function translate(data){
    // await axios.request(data).then(function (response) {
    //     result = response.data.data.translations.translatedText
    //     console.log("Sent")
    //     if(result.length > 0) props.sendResult(result)
    //      else <h3>Loading...</h3>
        
    // }).catch(function (error) {
    //     console.error(error);
    // });
}

useEffect(() => {
    const options = {
        method: 'POST',
        url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': `${process.env.REACT_APP_X_RAPID_API_KEY_TRANSLATE}`,
          'X-RapidAPI-Host': `${process.env.REACT_APP_X_RAPID_API_HOST_TRANSLATE}`
        },
        data: `{"q":"${props.q}","source":"${props.source}","target":"${props.target}"}`
      };
      translate(options)
      
}, [props])


  return (
    result
  )
}

export default Translate