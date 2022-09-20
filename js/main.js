function getRandomNumber (begin, end){
  if(begin >= 0 && end >= begin){
    return Math.round(Math.random() * (end - begin) + begin);
  }
  return new Error('Error. Change input values');
}
getRandomNumber();

function calculateMessage(message, maxLength){
  return(message.Length <= maxLength);
}
calculateMessage();


