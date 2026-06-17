# JS Email List

Minimal JavaScript exercise that fetches and renders a list of random emails from the Boolean API.

## How to Run

Open `index.html` in the browser.

## Exercise Instructions

[https://flynn.boolean.careers/exercises/api/random/mail](https://flynn.boolean.careers/exercises/api/random/mail)

Using the Boolean API, generate 10 email addresses and print them on the page inside a list.

### Bonus

- Improve the style with CSS or Bootstrap
- Add a button that fetches 10 new emails on click, replacing the previous ones

## Technical Notes

- Used `Promise.all` to wait for 10 parallel requests.
- Kept API logic, templates, rendering, and controller logic separated in small functions.
- Avoided a global email array: the list is rendered from the resolved promises.
- Added a reload button that is hidden on first load and disabled during later reloads.
- Used minimal custom CSS with a dark monospace style, stable skeleton loading layout, and no Bootstrap.
