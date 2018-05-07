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