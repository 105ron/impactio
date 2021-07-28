const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const jsonfile = require('jsonfile');

const inputFile = './server/data/members.json';

let users = null;
jsonfile.readFile(inputFile, (err, body) => {
  users = body.map(({ dateJoined, ...fields }) => (
    {
      ...fields,
      dateJoined: new Date(dateJoined),
    }
  )).sort(({ dateJoined: dateA }, { dateJoined: dateB }) => (
    dateA - dateB
  ));
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    dateJoined: { type: GraphQLString },
    skills: { type: new GraphQLList(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    role: { type: GraphQLString },
    avatarImage: { type: GraphQLString },
    bio: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    status: {
      type: GraphQLString,
      resolve() {
        return 'Welcome to GraphQL, Server Responding OK';
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return users;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id: argsId }) {
        // eslint-disable-next-line eqeqeq
        return users.find(({ id }) => id == argsId);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
