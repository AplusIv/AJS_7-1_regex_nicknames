import Validator from '../classValidator';

// ??? Не пойму, почему линтер ругается на test и expect. Что не так?

test.each([
  ['Andrei'],
  ['Andr_ei'],
  ['And-rei'],
  ['A_n-drei'],
  ['A___n----drei'],
  ['Andrei12df'],
  ['Andrei125hjfu'],
  ['Andrei125hj12fu'],
])('should validate successfully name of user', (name) => {
  const result = Validator.validateUsername(name);
  expect(result).toBeTruthy();
});

test.each([
  ['!Andrei', 'Invalid name'],
  ['.Andrei', 'Invalid name'],
  ['1Andrei', 'Invalid name'],
  ['-Andrei', 'Invalid name'],
  ['_Andrei', 'Invalid name'],
  ['Andrei9', 'Invalid name'],
  ['Andrei;', 'Invalid name'],
  ['Andrei-', 'Invalid name'],
  ['Andrei_', 'Invalid name'],
  ['Andrei.', 'Invalid name'],
  ['And8690rei', 'Invalid name'],
])('should throw Error with this users name', (name, error) => {
  function validateIncorrectName() {
    Validator.validateUsername(name);
  }
  // Оборачиваю Validator.validateUsername() в функцию, чтобы поймать ошибку
  expect(validateIncorrectName).toThrowError(new Error(error));
});
