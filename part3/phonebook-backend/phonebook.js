const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose
  .connect(url, { family: 4 })

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    validate: {
      validator: function (number) {
        return /^\d{2,3}-\d+$/.test(number) && number.length >= 8
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: true,
  },
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', phonebookSchema)
