const fs = require('fs');
const Superagent = require('Superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😢');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file 😢');
      resolve('success');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`).then(data => {
    console.log(`Breed: ${data}`);
    return Superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);

    fs.writeFile('dog-img.txt', res.body.message, err => {
      if (err) return console.log(err.message);
    })
    .then(res=>{
       console.log('Random dog image saved to file!');
      //console.log('Random dog image saved to file!');
  }).catch(err =>{
    console.log(err.message)
  })
});

