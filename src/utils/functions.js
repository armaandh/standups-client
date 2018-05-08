export const validateEmail = email =>  {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

export const validatePassword = password => {
  let regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
  return regex.test(password);
}

export const validateCode = code => {
    let regex = /^[0-9]{4,8}$/;
  return regex.test(code);
}

export const getInitialsFromName = name => {
  let splittedName = name.split(' ')
  return splittedName.length >= 2 ? splittedName[0].charAt(0).toUpperCase() + splittedName[1].charAt(0).toUpperCase() : splittedName[0].slice(0, 1).toUpperCase()
}

export const dateFormatForUploadedVideo = (value) => {
  let date = new Date(parseInt(value.replace(/\s+/g, '')))
  let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  let am_pm = date.getHours() >= 12 ? "PM" : "AM";
  hours = hours < 10 ? "0" + hours : hours;
  let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  return `${hours}:${minutes}:${seconds} ${am_pm}`
};

export const formatEmail = email => {
  return email.split('@')[0]
}

export const compareDateByCalendarDay = (firstDate, secondDate) => {
  let d1 = new Date(firstDate)
  let d2 = new Date(secondDate)
  console.log('Compare result, ', d1.getUTCFullYear() === d2.getUTCFullYear() && d1.getUTCMonth() === d2.getUTCMonth() && d1.getUTCDay() === d2.getUTCDay())
  console.log(`Year ${d1.getUTCFullYear()} with ${d2.getUTCFullYear()}`)
  console.log(`Month: ${d1.getUTCMonth()} with ${d2.getUTCMonth()}`)
  console.log(`Day ${d1.getUTCDay()} with ${d2.getUTCDay()}`)
  return d1.getUTCFullYear() === d2.getUTCFullYear() && d1.getUTCMonth() === d2.getUTCMonth() && d1.getUTCDay() === d2.getUTCDay()
}