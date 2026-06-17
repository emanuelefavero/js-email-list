// DOM ELEMENTS
const output = document.getElementById('output');

// CONSTANTS
const API_URL = 'https://flynn.boolean.careers/exercises/api/random/mail';
const MAX_EMAILS = 10;

// API
const getRandomEmail = () => {
  return axios.get(API_URL).then((res) => {
    const { success, response: email } = res.data;
    if (!success) throw new Error('Email request failed');
    return email;
  });
};

const getRandomEmails = (total) => {
  const requests = [];

  for (let i = 0; i < total; i++) {
    requests.push(getRandomEmail());
  }

  return Promise.all(requests);
};

// TEMPLATES
const getEmailTemplate = (email) => /*html*/ `<li>${email}</li>`;

const getEmailListTemplate = (emails) => {
  return emails.map(getEmailTemplate).join('');
};

// RENDER
const renderEmailList = (element, emails) => {
  element.innerHTML = getEmailListTemplate(emails);
};

// INIT
getRandomEmails(MAX_EMAILS)
  .then((emails) => {
    renderEmailList(output, emails);
  })
  .catch((error) => {
    console.error(error);
    output.innerHTML = /*html*/ `<li>Unable to load emails</li>`;
  });
