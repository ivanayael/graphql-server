import { ApolloServer, gql } from 'apollo-server'

const persons = [
    { 
        name: 'John', 
        phone: '123456789',
        street: 'Johnstreet 1',
        city: 'Johnscity',
        id: 1
    },
    { 
        name: 'Jane', 
        phone: '987654321',
        street: 'Janestreet',
        city: 'Janescity',
        id: 2
    },
    { 
        name: 'Jim', 
        street: 'Jimstreet',
        city: 'Jimcity',
        id: 3
    }
]

const typeDefinitions = gql`
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person!]!
        findPerson(name: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const { name } = args
            return persons.find(person => person.name === args.name)
        }
    },

    Person: {
        phone: (root) => root.phone ? root.phone : 'No phone number',
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs:typeDefinitions,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})  // http://localhost:4000/
