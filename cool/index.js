const randomQuote = require('random-quote');
const server = require("apollo-server-azure-functions");


const typeDefs = `
  type Random {
    id: Int!
    rand: String
  }

  type Query {
    rands: [Random]
    rand(id: Int!): Random
  }
`;

const rands = [{ id: 1, rand: "random" }, { id: 2, rand: "modnar" }];

const resolvers = {
  Query: {
    rands: () => rands,
    rand: (_, { id }) => rands.find(rand => rand.id === id)
  }
};

const schema = graphqlTools.makeExecutableSchema({
  typeDefs,
  resolvers
});


module.exports = function (context, req) {
  if (req.method === 'POST') {
    server.graphqlAzureFunctions({
      endpointURL: '/api/graphql',
      schema: schema
    })(context, req);
  } else if (req.method === 'GET') {
    return server.graphiqlAzureFunctions({
      endpointURL: '/api/graphql',
      schema: schema
    })(context, req);
  }

/*    context.log('JavaScript HTTP trigger function processed a request.');
    
    randomQuote()
    .then(quote => {
		context.log(quote);
		context.res = {
			body: "hello " + quote[0].content		
		};
		
		context.done();
	})
    .catch(err => console.error(err));
*/
/*
    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }	
    context.done();
   */
};
