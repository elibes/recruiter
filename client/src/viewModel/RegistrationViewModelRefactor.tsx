import {useState} from 'react';
import {registrationModel} from '../model/RegistrationModel';
import {isPersonNumberValid} from '../util/PersonNumberValidator';

const RegistrationViewModel = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [personalNumber, setPersonalNumber] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [resultMsg, setResultMsg] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // Consolidate change handlers into one function, if possible, for cleaner code
  const handleInputChange = setter => e => setter(e.target.value);

  const validateForm = () => {
    // Example validation logic
    const fields = [
      firstName,
      lastName,
      userName,
      password,
      personalNumber,
      email,
      passwordConfirm,
    ];
    const allFieldsFilled = fields.every(field => field.trim() !== '');
    const passwordsMatch = password === passwordConfirm;
    const validPersonNumber = isPersonNumberValid(personalNumber).isValid;

    if (!allFieldsFilled) {
      setResultMsg('All fields are required.');
    } else if (!passwordsMatch) {
      setResultMsg('Passwords do not match.');
    } else if (!validPersonNumber) {
      setResultMsg('Invalid personal number.');
    } else {
      setResultMsg('');
    }

    setIsSubmitDisabled(
      !(allFieldsFilled && passwordsMatch && validPersonNumber)
    );
  };

  const onClickRegister = async e => {
    e.preventDefault();
    validateForm();
    if (!isSubmitDisabled) {
      try {
        const response = await registrationModel(
          firstName,
          lastName,
          userName,
          password,
          personalNumber,
          email
        );
        if ('error' in response) {
          console.error(response.error);
          setResultMsg('Registration failed: ' + response.error);
        } else {
          setResultMsg('Registration successful');
          console.log(response.message);
        }
      } catch (ex) {
        console.log(ex);
        setResultMsg('Registration failed');
      }
    }
  };

  return {
    firstName,
    lastName,
    userName,
    password,
    personalNumber,
    email,
    passwordConfirm,
    resultMsg,
    isSubmitDisabled,
    setFirstName,
    setLastName,
    setUserName,
    setPassword,
    setPersonalNumber,
    setEmail,
    setPasswordConfirm,
    onClickRegister,
    handleInputChange,
  };
};

export default RegistrationViewModel;
