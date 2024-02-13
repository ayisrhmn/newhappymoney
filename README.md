# (New) HappyMoney - Income & Expense Tracker

Repo backend API [newhappymoney-api](https://github.com/ayisrhmn/newhappymoney-api)

---

## About

HappyMoney makes easy to track your financial income and expenses.

## Screenshot App

<div align="center">

<img src="/src/docs/01_splash.jpg" width="200" padding="100"/>
<img src="/src/docs/02_home.jpg" width="200" padding="100"/>
<img src="/src/docs/03_categorylist.jpg" width="200" padding="100"/>
<img src="/src/docs/04_transactionlist.jpg" width="200" padding="100"/>

</div>

## Download (New) HappyMoney APK (v1.0.3)
###### Last update: 27 May 2023 01:20

<a href="https://drive.google.com/file/d/1NuRK8YsmATUAg_QeQnSwr1I1xBBqDNnM/view?usp=drive_link">
  <img src="https://img.shields.io/badge/Download%20on-Google%20Drive-gold.svg?style=popout&logo=google-drive"/>
</a>

___

## Setup Project

- clone the repository `git clone https://github.com/ayisrhmn/newhappymoney.git`
- open the clonned folder `cd newhappymoney`
- install the dependencies `yarn install`
- duplicate `.env.example` to `.env`, and set your own variable configuration

## Run to Device or Emulator

- run the Metro Service `yarn start --reset-cache`
- run into android device or emulator `yarn android`

## State Management Debugging

- install [Overmind Devtools](https://marketplace.visualstudio.com/items?itemName=christianalfoni.overmind-devtools-vscode) on your Visual Studio Code, please use stable mode (not insiders)
- once you run the app into device/emulator, you can open the via `Command+Shift+P` and then type `Overmind Devtools: Start`
- you can read more [right here](https://overmindjs.org/core/devtools)

## Upgrade The Version

- run `yarn postversion`
- open `package.json`, and then change the version
- update version in `/screen/Profile`
- don't forget to commit and push

## Generatin APK

- run `yarn apkgen`
- open the generated folder for apks `yarn apkfolder`

## General Info for Development

- Node version 12 LTS
- Yarn version 1 (classic)
- React Native UI kit library, React Native Paper
- State Management, Overmind.js
- Date hack, moment.js
- Async library, Axios.js

## Author

Muhammad Fariz Rahman
