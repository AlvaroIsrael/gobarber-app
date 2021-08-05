<h1 align="center">
  <a href="https://gobarberapp.net">
    <img  alt="GoBarberApp"  src="/gobarber-frontend/src/assets/gobarberdarklogo.png"/>
  </a>
  <br>
</h1>

<div align="center">
  
[![CodeQLCI](https://github.com/AlvaroIsrael/gobarber-app/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/AlvaroIsrael/gobarber-app/actions/workflows/codeql-analysis.yml)

> A concept (yet fully-functional) barber shop app!

<p>
  <a href="#-technologies-used">Technologies Used</a> •
  <a href="#-how-to-use">How To Use</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>
  
<br/>

<p>Made with ❤️ by Alvaro Israel 👏🏻 <a href="https://www.linkedin.com/in/alvaroisraeldesenvolvedor/">Get in Touch!</a></p>
<p>Hit the ⭐️ button if you like this project!</p>

</div>

<br/>

## Preview

![Go Barber App](/gobarber-frontend/src/assets/gobarber-tutorial.gif)

## 🏆 Technologies Used

- [Node.js](https://nodejs.org/en/) and [NPM](http://npmjs.com)
- [React](https://github.com/facebook/react/)
- [ReactNative](https://github.com/facebook/react-native/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)

## 💻 How to Use

### **Install system dependencies**

- Install [Git](https://git-scm.com).
- Install [Node.js](https://nodejs.org/en/download/).

### **Clone**

In your command line:

```bash
$ git clone https://github.com/AlvaroIsrael/gobarber-app.git
$ cd gobarber-app
```

### **Frontend**

```bash
# Go into frontend folder
$ cd gobarber-frontend

# Install dependencies
$ yarn install

# Run the app
$ yarn start
```

### **Backend**

See [How to Run](/gobarber-backend/README.md#-how-to-run) inside the `gobarber-backend` project folder for more details.

```bash
# Go into backend folder
$ cd gobarber-backend

# Install dependencies
$ yarn install

# Install the 3 databases needed to run this program. See 'How to Run' above for more details.

# Run the migrations
$ yarn typeorm migration:run

# Run the app
$ yarn dev:server
```

### **Mobile**

```bash
# Go into mobile folder
$ cd gobarber-mobile

# Install dependencies
$ yarn install

# Run the app
$ yarn start
```

## 🤝 Contributing

Fork this repository - click [fork][].

```bash
# Create your feature branch:
$ git checkout -b feature/myAwesomeFeature

# Commit your changes:
$ git commit -m 'feat: Added some new awesomeFeature'

# Push to the branch:
$ git push -u origin feature/myAwesomeFeature
```

Then go to [Pull Requests][] and make a new one.

Resources:

- Read more about commits in [conventional commits][].
- Read more about how to open a Pull Request from [GitHub official documentation][].
  
[fork]: https://github.com/AlvaroIsrael/gobarber-app/fork
[Pull Requests]: https://github.com/AlvaroIsrael/gobarber-app/pulls
[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/
[GitHub official documentation]: https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request

## 📝 License

This software is under MIT license. See [LICENSE](LICENSE.md) for more details.
