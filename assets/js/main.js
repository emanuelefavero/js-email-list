// DOM ELEMENTS
const output = document.getElementById('output');
const reloadButton = document.getElementById('reload-button');

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
  const emailPromises = Array.from({ length: total }, () => getRandomEmail());
  return Promise.all(emailPromises);
};

// TEMPLATES
const getEmailTemplate = (email) => /*html*/ `<li>${email}</li>`;
const getLoaderTemplate = () => /*html*/ `<li class="loader"></li>`;
const getErrorTemplate = () => /*html*/ `<li>Unable to load emails</li>`;

const getEmailListTemplate = (emails) => {
  return emails.map(getEmailTemplate).join('');
};

// RENDER
const renderEmailList = (element, emails) => {
  element.innerHTML = getEmailListTemplate(emails);
};

const renderLoader = (element) => {
  element.innerHTML = getLoaderTemplate();
};

const renderError = (element) => {
  element.innerHTML = getErrorTemplate();
};

const showReloadButton = () => reloadButton.classList.remove('hidden');
const hideReloadButton = () => reloadButton.classList.add('hidden');

// APP (Controller)
const loadEmails = () => {
  renderLoader(output);
  hideReloadButton();

  getRandomEmails(MAX_EMAILS)
    .then((emails) => {
      renderEmailList(output, emails);
      showReloadButton();
    })
    .catch((error) => {
      console.error(error);
      renderError(output);
      showReloadButton();
    });
};

// INIT
loadEmails();
reloadButton.addEventListener('click', loadEmails);
