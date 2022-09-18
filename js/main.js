function GetRandomNumber (begin, end){
  if(begin >= 0 && end >= begin){
    return Math.round(Math.random() * (end - begin) + begin);
  } else {return -1;}
}
GetRandomNumber();

function CalculateMessage(message){
  return message.lenght;
}
CalculateMessage();
