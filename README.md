For using this you should have node.js (v6+ lts), npm.

After clone run: `npm run install:all` to install deps.


# npm commands

### Build

To build frontend server or get static files use:
```
npm run build
```
It will build production server with minified js and css.


**Warn!** On Production env (`NODE_ENV=production`) React does not check propTypes.


### Start development server
To start development server (it rebuild project faster on changes) - run 
```
npm run dev:server
```
Dev-server run `lint` and `test` steps on every project rebuild



### Lint

To start lint - run:
```
npm run lint
```
If everything is ok, it just exit. 
If something wrong, it errors every trouble to console. 

There can be come troubles, that eslint can fix by itself.
To use this feature run lint by:
```
npm run lint:fix
```
