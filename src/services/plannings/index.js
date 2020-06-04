import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import connectMongoose from '../../config/mongoose'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import Planning from './models/planning'
import PlanningsDataSource from './planningsDataSource'

const PORT = process.env.PLANNINGS_SERVICE_PORT
const nameDB = process.env.PLANNINGS_MONGODB_NAME

connectMongoose(nameDB)

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    planningsAPI: new PlanningsDataSource(Planning),
  }),
})

server.applyMiddleware({ app })

app.listen({ port: PORT }, () => {
  console.log(`Plannings service 🚀 ready at ${PORT} `)
})
