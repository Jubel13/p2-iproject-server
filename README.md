# p2-iproject-server
Individual Project - Server

## Individual project on Hacktiv8

### Project Description

This is server app for DiagnosTool application. Click [client](https://github.com/Jubel13/p2-iproject-client) to view the client.

*Note: API and packages are similar, they are used to use some functions, ref: [api](https://rapidapi.com/blog/api-vs-library/)*

This app use these APIs:
- [API - Medic](https://apimedic.com/)
- [Mapbox](https://docs.mapbox.com/)
- [Geopify](https://www.geoapify.com/)

Some of those APIs needs token or API-key, so you need to register an account.

Create `.env` file to store your API-key and/or Token, refer to `.env.example` to see file structure on `.env` file

Packages/library that is used in this app:
- [axios](https://github.com/axios/axios)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Socket-io](https://socket.io/docs/v4/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [pg](https://www.npmjs.com/package/pg)
- [sequelize](https://sequelize.org/)
- [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)

To install those packages, run `npm install` on terminal

To preview this app, go to: https://individual-project-hacktiv8.web.app/

Detail of the endpoint used in this app can be found in `api-doc.md` file.

*Note: You need to switch the code in `app.js` to use dummy data from api-medic, if diagnose feature not working on the [client](https://github.com/Jubel13/p2-iproject-client). API calls from api-medic is limited to 100 calls / month for free user.*
