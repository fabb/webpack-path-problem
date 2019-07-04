# Webpack **webpack_public_path** Bug Reproduction Repo

This repo allows to reproduce [this bug](https://github.com/webpack/webpack/issues/9319).

## Reproduction

1. `npm install`
2. `npm run build`
3. `npm run start`
4. Open http://localhost:3000/index

### Expected Outcome

The website should show this:

```
__webpack_public_path__ in index.js: https://cache-local.myserver.net/web/_next/

__webpack_public_path__ in _app.js: https://cache-local.myserver.net/web/_next/

__webpack_public_path__ in _document.js: https://cache-local.myserver.net/web/_next/
```

### Actual Outcome

The website shows this:

```
__webpack_public_path__ in index.js: https://cache-local.myserver.net/web/_next/

__webpack_public_path__ in _app.js:

__webpack_public_path__ in _document.js:
```

## A bit of investigation

After `npm run build`, inspect the contents of the build output at `.next/server/static/<BUILD_ID>/pages/index.js` and `/_document.js` and `/_app.js`. All contain the injected code of `public-path.js`:

```
__webpack_require__.p = "".concat(assetPrefix.assetPrefixForNamespace(namespace), "/_next/");
```

When placing `console.log`s above all these lines in the compiled code, and running the app with `npm run start`, only the one from `index.js` is logged. The other ones are not executed because they are cached in the `installedModules`.

At the top of each compiled file, the webpack public path is reset to an empty string:

```
__webpack_require__.p = "";
```

This reset in combination with the module being cached causes the webpack path not staying correctly assigned as wished for.
