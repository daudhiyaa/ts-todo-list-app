# TODO-List App

## How to Run

> Click this [link](https://ts-todo-list-app.vercel.app/) to see the deployed version

1. Clone the Repo

   ```git
   git clone https://github.com/daudhiyaa/ts-todo-list-app.git
   ```

2. Install Nodejs

3. Install Dependencies :

   - Typescript (`-g` means globally)

   ```npm
   npm i -g typescript
   ```

   - uuid module

   ```npm
   npm i -g uuid
   npm i --save-dev @types/uuid
   ```

4. Run the App

   ```npm
   npm start
   ```

_reference : [youtube](https://www.youtube.com/watch?v=jBmrduvKl5w)_

## Available Scripts

> ✨ Bootstrapped with Create Snowpack App (CSA).

### npm start

Runs the app in the development mode.
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.mjs` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.
