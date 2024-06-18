const Joi = require('joi')


// validations of the book 
function validateBook(book) {
    const bookSchema = Joi.object({
      name: Joi.string().required(),
      author: Joi.string().required(),
      publisher: Joi.string().required(),
      publicationYear: Joi.string().required(),
      subject: Joi.string().required().max(50)
     
    });
    return bookSchema.validate(book)
}

module.exports.validate = validateBook