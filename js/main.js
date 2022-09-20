function GetRandomNumber (begin, end){
  if(begin >= 0 && end >= begin){
    return Math.round(Math.random() * (end - begin) + begin);
  }
  return new Error('Error. Change input values');
}
GetRandomNumber();

function CalculateMessage(message, maxLength){
  return(message.Length <= maxLength);
}
CalculateMessage();


