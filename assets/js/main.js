// DOM ELEMENTS
const output = document.getElementById('output');
const reloadButton = document.getElementById('reload-button');

// CONSTANTS
const API_URL = 'https://flynn.boolean.careers/exercises/api/random/mail';
const MAX_EMAILS = 10;
const SKELETON_WIDTHS = [18, 20, 22, 24, 26, 28, 30];

// STATE
let isFirstLoad = true;

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
const getRandomSkeletonWidth = () => {
  const randomIndex = Math.floor(Math.random() * SKELETON_WIDTHS.length);
  return SKELETON_WIDTHS[randomIndex];
};

const getSkeletonTemplate = () => {
  const width = getRandomSkeletonWidth();
  return /*html*/ `<li class="skeleton" style="--size: ${width}ch"></li>`;
};

const getErrorTemplate = () => /*html*/ `<li>Unable to load emails</li>`;

const getEmailListTemplate = (emails) => {
  return emails.map(getEmailTemplate).join('');
};

const getSkeletonListTemplate = (total) => {
  return Array.from({ length: total }, () => getSkeletonTemplate()).join('');
};

// RENDER
const renderEmailList = (element, emails) => {
  element.innerHTML = getEmailListTemplate(emails);
};

const renderSkeletonList = (element, total) => {
  element.innerHTML = getSkeletonListTemplate(total);
};

const renderError = (element) => {
  element.innerHTML = getErrorTemplate();
};

const showReloadButton = () => reloadButton.classList.remove('hidden');
const hideReloadButton = () => reloadButton.classList.add('hidden');
const enableReloadButton = () => (reloadButton.disabled = false);
const disableReloadButton = () => (reloadButton.disabled = true);

// APP (Controller)
const loadEmails = () => {
  renderSkeletonList(output, MAX_EMAILS);
  disableReloadButton();

  if (isFirstLoad) hideReloadButton();

  getRandomEmails(MAX_EMAILS)
    .then((emails) => {
      renderEmailList(output, emails);
    })
    .catch((error) => {
      console.error(error);
      renderError(output);
    })
    .finally(() => {
      isFirstLoad = false;
      enableReloadButton();
      showReloadButton();
    });
};

// INIT
loadEmails();
reloadButton.addEventListener('click', loadEmails);
