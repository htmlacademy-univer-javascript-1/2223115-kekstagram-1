function  getRandomPositiveInteger(begin, end){
  const lower = Math.ceil(Math.min(Math.abs(begin), Math.abs(end)));
  const upper = Math.floor(Math.max(Math.abs(begin), Math.abs(end)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
getRandomPositiveInteger(1,4);

function checkStringLength(message, maxLength){
  return message.length <= maxLength;
}
checkStringLength('Hello, world!',100);

