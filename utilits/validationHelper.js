var passwordValidator = require('password-validator');
var passwordChecker = new passwordValidator();
var bcrypt = require('bcryptjs');

exports.isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
  };

exports.isValidatePassword = (password) => {
    if (password.length < 8 || password === '') {
      return false;
    }
    return true;
  };

exports.comparePassword = (password , hashedPassword) =>{
  return bcrypt.compareSync(password , hashedPassword);
}


exports.isValidPassword = (password)=>{
    passwordChecker
    .is().min(8)                                 
    .is().max(15)                                  
    .has().uppercase()                              
    .has().lowercase()                              
    .has().digits(2)                                
    .has().not().spaces()                           
    .is().not().oneOf(['Passw0rd', 'Password123']); 

    return passwordChecker.validate(password);
}