const { ApolloServer } = require("@apollo/server");
const db = require("./db.config")
const mongoose = require('mongoose');

// const booksData = [
//   {
//     title: "Book 1",
//     author: "Author 1",
//     publishedYear: 2000,
//   },
//   {
//     title: "Book 2",
//     author: "Author 2",
//     publishedYear: 2010,
//   },
// ];

// // The GraphQL schema
// // const typeDefs = `
// //   type Query {
// //     hello: String,
// //     say(name : String) : String
// //   },
// // `;

// const typeDefs = `
//     type Book {
//         title: String
//         author: String
//         publishedYear: Int
//       },

//       type Query {
//         books: [Book],
//         book(title : String) : Book
//       }

//       type Mutation {
//         createBook(title : String, author : String, publishedYear : String) : Book
//         updateBook(title : String, author : String, publishedYear : String) : Book
//         deleteBook(title : String) : Book
//       }
// `;

// const resolvers = {
//   Query: {
//     books: () => {
//       return booksData;
//     },

//     book: (_, { title }) => {
//       return booksData.find((book) => book.title === title);
//     },
//   },

//   Mutation: {
//     createBook: (_, { title, author, publishedYear }) => {
//       const newBook = { title, author, publishedYear };
//       booksData.push(newBook);
//       return newBook;
//     },

//     updateBook: (_, { title, author, publishedYear }) => {
//       const bookToUpdate = booksData.find((book) => book.title === title);
//       if (title) {
//         bookToUpdate.title = title;
//       }
//       if (author) {
//         bookToUpdate.author = author;
//       }
//       if (publishedYear) {
//         bookToUpdate.publishedYear = publishedYear;
//       }
//       return bookToUpdate;
//     },

//     deleteBook: (_, { title }) => {
//       const index = booksData.findIndex((book) => book.title === title);
//       booksData.splice(index, 1);
//       return booksData[index];
//     },
//   },
// };

// hello: () => 'Ravindra Singh Dabi',
// say : (_, {name}) => `How can i help you ${name}`

const typeDefs = `

type User {
  _id: ID
  username: String
  first_name: String
  last_name: String
  email: String
  phone: String
}

type Query {
  users: [User]
  user(_id : ID) : User
}

type Mutation {
  createUser( username: String
    first_name: String
    last_name: String
    email: String
    phone: String) : User
}
`

const resolvers = {
  Query : {
      users : async () => {
        const users =  await db.collection('users').find().toArray();
        return users;
      },

      user : async (_, {_id}) => {
            const user = await db.collection('users').findOne({_id : new mongoose.Types.ObjectId(_id)});
            return user;
      }
  },

  Mutation : {
    createUser : async (_,{username,first_name,last_name,email,phone}) => {
      const body = {username,first_name,last_name,email,phone}
        const createUser = await db.collection('users').insertOne(body);
        return body;
    }
  }
}

const createApolloServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
};

module.exports = createApolloServer;
