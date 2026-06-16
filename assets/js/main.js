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
axios.get(API_URL).then((response) => console.log(response.data));
