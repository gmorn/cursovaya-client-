export const getDate = (array) => {

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ]
  
  array.forEach(element => {
    
    const date = new Date(element.date)
    const day = date.getDate()
    const month = months[date.getMonth()]
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
  
    element.date = `${day} ${month} ${hours}:${minutes}`
  });
 
  
  
}