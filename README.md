# MTG-card-collection

[![Netlify Status](https://api.netlify.com/api/v1/badges/aee04681-609c-4aae-810e-5b6d00734f84/deploy-status)](https://app.netlify.com/sites/mtg-magical/deploys)

---

## Netlify front end

[Netlify](https://mtg-magical.netlify.com)

## Heroku back end

[Herkoku](https://mtg-magical-backend.herokuapp.com)

### I stand on the shoulders of giants, please check out some of the tools that made this possible

[Keyrune and this fantastic keyrune react wrapper](https://github.com/Saeris/react-keyrune)

[React-icons for always being awesome](https://react-icons.netlify.com/#/)

[MTG Card API](https://docs.magicthegathering.io/)

[MTG SDK](https://github.com/MagicTheGathering/mtg-sdk-javascript)

## Notes

Had a problem with the keyrune and react-keyrune modules. What's weird is that everything was working fine then I shut down the server, brought it back up, all of a sudden react-keyrune was looking for a variable in keyrune that wasn't there. Had to go in and change mtg_setlist to keyrune_set, or something like that. 

## Typescript installation

```bash
npm install --save-dev @types/react @types/react-dom typescript ts-loader source-map-loader
```
