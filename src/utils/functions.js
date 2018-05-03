export const handleTextFieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
}

export const validateEmail = email =>  {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validatePassword = password => {
  var re = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
  return re.test(password);
}

export const validateCode = code => {
  var re = /^[0-9]{4,8}$/;
  return re.test(code);
}