function getRandomNumber(begin, end){
  if(begin >= 0 && end >= begin){
    return Math.round(Math.random() * (end - begin) + begin);
  }
  return new Error('Error. Change input values');
}
getRandomNumber(1,4);

function chekMessageLength(message, maxLength){
  return (message.length <= maxLength);
}
chekMessageLength('Hello, world!',100);


