// Text-Processing API Url
const API_URL = 'https://japerk-text-processing.p.rapidapi.com/sentiment/';

// RapidAPI request headers
const REQUEST_HEADERS = {
  'X-RapidAPI-Host': 'japerk-text-processing.p.rapidapi.com'
  , 'X-RapidAPI-Key': 'c32f2aa3a9msh0327e15d1c65142p18045ejsn05c8fdd5bdcb'
  , 'Content-Type': 'application/x-www-form-urlencoded'
};

const analyzeComment = (comment, callback) => {
    //Creating an object to send to the server
    const data = {
        text: comment,
        language: 'english'
    }

    // Encoding data for application/x-www-form-urlencoded content type
    const formattedData = Qs.stringify(data);

    //POST request to the server

    axios.post(API_URL, formattedData, {header: REQUEST_HEADERS} )
    .then(response => {
        const data = response.data;
        //Calling a callback function with data from the server
        callback(data)
    })
    .catch(error => console.log(error))
};

//creating a function we pass as a call back to the previous one..that is a function that does something with the result and displays it to the user

const displayResult = result => {
    //Remove  invisible class for main-result-block
    const resultBlockElement = document.getElementById('main-result-block');
    resultBlockElement.classList.remove('invisible');

    // Setting the color of the result text depending on the response label
    const label = result.label;
    const resultElement = document.getElementById('result');
    resultElement.setAttribute('class', label);
    let resultText = '';

    switch(label){
        case 'pos':
            resultText = 'Wow! Your comment is very positive!';
            break;
        
        case 'neg':
            resultText = 'Negative comment =(';
            break;

        case 'neutral':
            resultText = 'Simple comment =)';
            break;
        
        default:
        resultText = 'Hmmm, can\'t understand your comment';
    }
    // Setting the result text
    resultElement.textContent = resultText;
}

//incase someone has not entered any comment and clicked the button

const handleEmptyComment = () => {
    const resultBlockElement = document.getElementById('main-result-block');
    resultBlockElement.classList.add('invisible');
    return alert('You didn\'t put anything in the comment section')
}
// Button click handler
const onAnalyzeButtonClick = () => {
    // Getting a textarea element with a comment
    const commentElement = document.getElementById('comment');
    // Getting comment text
    const commentText = commentElement.value.trim();

    if(commentText){
        return analyzeComment(commentText, displayResult)
    }
    else{
       return handleEmptyComment();
    }
}