# gfa-gungame

# 🔑 License

    MIT License

Copyright (c) 2022 Guilherme Dutra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 💬 About aplication
This application was developed for the fullstack challenge on server SVRP 3.0

The purpose of this challenge was to demonstrate my knowledge in TypeScript.

Challenge delivered on commit [feat(frontend): add CharacterVehicles page](https://github.com/guizafa/gfa-gungame/tree/***)

## ✅ Work on FiveM GameBuild
- **1604** Arena War
- **2060** Los Santos Summer Special
- **2189** Cayo Perico Heist
- **2372** Los Santos Tuners

## 🧰 Dependencies
- [yarn](https://github.com/bndzor/fivem.fun/tree/master/resources/%5Bsystem%5D/%5Bbuilders%5D/yarn)
- [node.js](https://nodejs.org/en/download/)

## 📷 Screenshots
![PlayerList](https://imgur.com/J2VyWZQ.png)
![Kill Feed](https://i.imgur.com/68HJbku.png)
![DeathTimer](https://imgur.com/0rgV9hU.png)
![Winner](https://i.imgur.com/N3R1s3s.png)

## 📖 Features
- Kill Feed (Shows who was the murderer, who was the victim and what weapon was used)
- Player List (With Points and Name)
- Champion Winner Show on the Screen for all players
- DeathTimer (When you die, a countdown begins)
- 10 random locations of spawn 
- 9 types of weapon
- 10 points for each kill (after each kill your weapon is upgraded)
- Every time you die, your weapon and points are reseted

## 📝 Installation
### Manual
- Download the script and put it in the `[resources]` directory.
- Import Event on `server.ts` => `JoinServer` in `spawnmanager.lua` in function `[spawnPlayer()]`
- Install `npm install` on root folder `[gfa-gungame]`
- Build `npm run build` on root folder `[gfa-gungame]`
- Add the following code to your server.cfg
```
ensure gfa-gungame
```
## 👤 Contacts
- Discord **guizafa#6064**
- E-mail : **guizafandroid@gmail.com**

