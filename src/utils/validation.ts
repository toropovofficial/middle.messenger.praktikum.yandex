const loginQuantitySymbols = /^.{3,20}$/;
const notAllNumbersSymbols = /^(?!\d+$)[\w-]+$/;
const specialSymbols = /^[a-zA-Z0-9_-]+$/;
const passwordCapitalletterOrNumber = /^(?=.*[A-Z])|(?=.*\d).+$/;
const passwordQuantitySymbols = /^.{8,40}$/;
const phoneRegex = /^\+?\d{10,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-ZА-ЯЁ][a-zA-Zа-яёЁ-]*$/;

function checkLogin(value: string) {
  if (!specialSymbols.test(value)) {
    return { status: false, message: 'Не должно быть спецсимволов и пробелов и нужны латинские символы' };
  }

  if (!loginQuantitySymbols.test(value)) {
    return { status: false, message: 'Неностаточно символов' };
  }

  if (!notAllNumbersSymbols.test(value)) {
    return { status: false, message: 'Не должны быть только цифры' };
  }

  return { status: true, message: '' };
}

function checkPassword(value: string) {
  if (!passwordQuantitySymbols.test(value)) {
    return { status: false, message: 'Неностаточно символов' };
  }

  if (!passwordCapitalletterOrNumber.test(value)) {
    return { status: false, message: 'хотя бы одна заглавная буква или цифра' };
  }

  return { status: true, message: '' };
}

function checkPhone(value: string) {
  if (!phoneRegex.test(value)) {
    return { status: false, message: 'Неверный формат' };
  }

  return { status: true, message: '' };
}

function checkEmail(value: string) {
  if (!emailRegex.test(value)) {
    return { status: false, message: 'Неверный формат' };
  }

  return { status: true, message: '' };
}

function checkName(value: string) {
  if (!nameRegex.test(value)) {
    return { status: false, message: 'Первая буква должна быть заглавной без цифр и спецСимволов' };
  }

  return { status: true, message: '' };
}

function validation(value:string, name: string) {
  switch (true) {
    case name === 'login':
      return checkLogin(value);
    case name === 'password':
      return checkPassword(value);
    case name === 'oldPassword':
      return checkPassword(value);
    case name === 'newPassword':
      return checkPassword(value);
    case name === 'repeatPassword':
      return checkPassword(value);
    case name === 'phone':
      return checkPhone(value);
    case name === 'email':
      return checkEmail(value);
    case name === 'first_name':
      return checkName(value);
    case name === 'second_name':
      return checkName(value);
    default:
      return { status: true, message: '' };
  }
}

export default validation;
