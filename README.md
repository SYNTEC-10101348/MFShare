# MFShare
MinimalReproduce Project

vite2test created by vite with vue2.7  
my-project created by vue cli with vue2.7

--

# How to Use

1. build webpack project 

```
cd .\webpack\my-project  
npm insall
npm run build
```

2. host the  webpack website in any where 

3. test MF with vite 
```
cd .\vite\vite2test
npm install
```

4. change the MF remote URL in vite.config.js
```
//example: const myWebpackService = 'http://localhost:8080/';
const myWebpackService = 'http://localhost:8081/';

//example: const externalChildPath = `webpackTest/remoteEntry.js`;
const externalChildPath = `remoteEntry.js`;
```
5. npm run dev then change the MF shared setting, see what will happened
