/*
URL: https://flynn.boolean.careers/exercises/api/random/mail
EXPECTED RESPONSE (random email address):
{
  "success": true,
  "response": "bogan.zakary@hotmail.com"
}
*/

// TODO Generate 10 random email addresses and print them in the page inside a list

const API_URL = 'https://flynn.boolean.careers/exercises/api/random/mail';
const MAX_EMAILS = 10;

const emailList = [];

for (let i = 0; i < MAX_EMAILS; i++) {
  axios
    .get(API_URL)
    .then((response) => {
      const { success, response: email } = response.data;

      if (success) emailList.push(email);

      if (emailList.length === MAX_EMAILS || i >= MAX_EMAILS - 1) {
        console.log(emailList);
      }
    })
    .catch((error) => console.error(`Request failed: ${error.message}`));
}
