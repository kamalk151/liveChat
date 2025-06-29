const fs = require('fs');

try {
  fs.writeFileSync('example.txt', 'Hello from Node.js!');
  console.log('File created successfully!');

  // fs.writeFile('example.txt', 'Hello from Node.js!', (err) => {
  //   if (err) throw err;
  //   console.log('File created successfully!');
  // });


} catch (err) {
  console.error(err);
}
