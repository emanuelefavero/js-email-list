// DOM ELEMENTS
const output = document.getElementById('output');

// CONSTANTS
const API_URL = 'https://flynn.boolean.careers/exercises/api/random/mail';
const MAX_EMAILS = 10;

// TEMPLATES
const getEmailTemplate = (email) => /*html*/ `<li>${email}</li>`;

const getEmailListTemplate = (emailList) => {
  return emailList.map(getEmailTemplate).join('');
};

const emailList = [];

for (let i = 0; i < MAX_EMAILS; i++) {
  axios
    .get(API_URL)
    .then((response) => {
      const { success, response: email } = response.data;

      if (success) emailList.push(email);

      if (emailList.length === MAX_EMAILS || i >= MAX_EMAILS - 1) {
        output.innerHTML = getEmailListTemplate(emailList);
      }
    })
    .catch((error) => console.error(`Request failed: ${error.message}`));
}
