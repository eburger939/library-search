const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { Book } = require('../models/Book')
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('No user found with this email address');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
    
          return { token };
        },
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token };
        },
        saveBook: async (parent, { array, description, title, bookId, image, link }, context) => {
          if (context.user) {
            const book = await Book.create({
              array,
              description,
              title,
              bookId,
              image,
              link,
            });
    
            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { books: book._id } }
            );
    
            return user;
          }
          throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, { bookId }, context) => {
          if (context.user) {
            const book = await Book.findOneAndDelete({
              _id: bookId,
            });
    
            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { books: book._id } }
            );
    
            return book;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
    
      },
    };
    
    module.exports = resolvers;
    