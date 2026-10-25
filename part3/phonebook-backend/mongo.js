const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://timilehinsunday144_db_user:${password}@cluster0.hdxp3dq.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

const person = new Person({
  name: 'Anna',
  number: '040-1234556',
})

person.save().then(() => {
  console.log('person saved!')
  mongoose.connection.close()
})

// Person.find({}).then((persons) => {
//   console.log("phonebook:");
//   persons.forEach((person) => {
//     console.log(person.name, person.number);
//   });
//   mongoose.connection.close();
// });

// timilehinsunday144_db_user cn9Aa5N1JOkf7Ekt
// node mongo.js cn9Aa5N1JOkf7Ekt Anna 040-1234556
