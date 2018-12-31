# [repo.now.sh](https://repo.now.sh)

> A service to help you find the repository for an npm package

[![repo.now.sh homepage screenshot](https://file-assxoaewwi.now.sh/)](https://repo.now.sh)

## Develop

- `yarn` - install dependencies
- `yarn dev` - start the dev server

Here is an overview of the file structure.

### `server.js`

This is a development server used to mimic how the `/` and `/:pkg` routes will be served on [now](https://zeit.co/now). Since now will deploy `index.html` and `pkg.js` as serverless lamdbas, this Node server is only used for local development.

### `index.html`

The home page (`/`) for repo.now.sh. It's a static HTML file that includes [Tachyons](http://tachyons.io/) for CSS styles and [GitHub Corners](https://github.com/tholman/github-corners) for the cool ribbon in the top-right hand corner of the page. :slightly_smiling_face:

### `pkg.js`

This is a serverless function that handles requests to the `/:pkg` route. The primary flows:

- If `:pkg` is found in the npm registry and it has a valid repository URL, then repo.now.sh will redirect you to the repository page.
- If there is an error (package not found, repository URL missing), then repo.now.sh will show you an error page with ways you can help. :heartpulse:

### `lib/`

Most of the business logic for the `/:pkg` route lives in this directory and is required by `pkg.js`.

## Deploy

Push/merge to master. Deploys happen thanks to [Now + GitHub](https://zeit.co/github). See `now.json` for the [Now configuration](https://zeit.co/docs/v2/deployments/configuration/).
