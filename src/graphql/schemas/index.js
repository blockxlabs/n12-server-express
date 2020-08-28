const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    uuid: String!
    email: String!
  }
  type DApp {
    uuid: String!
    name: String!
    description: String!
    logoUrl: String!
    Notifications: [Notification!]
  }
  type Notification {
    uuid: String!
    dAppUuid: String!
    name: String!
    shortDescription: String!
    longDescription: String!
    DApp: DApp!
  }
  type UserNotification {
    uuid: String
    userUuid: String
    dAppUuid: String
    notificationsUuid: String,
    Notification: Notification!
    DApp: DApp!
    User: User!
  }
  type NotificationSearchResult {
    notifications: [Notification]!
    totalCount: Int!
    dApp: DApp!
  }
  type Query {
    user(id: Int!): User
    allDApps: [DApp!]!
    searchDApps(searchLike: String!): [DApp!]!
    dApp(uuid: String!): DApp
    allNotifications: [Notification!]!
    notification(uuid: String!): Notification
    notificationsByDApp(dAppUuid: String!, searchQuery: String, offset: Int, limit: Int): NotificationSearchResult!
    UserSubscriptions(userUuid: String!): [UserNotification]
  }
  type Mutation {
    subscribeNotifications(email : String!,dAppUuid: String!,selectedNotifications:[String!]): [UserNotification]
    unsubscribeNotifications(userNotifications:[String!]): Boolean
    testEmail(to: String, apiKey: String, domain: String): Boolean!
  }
`

module.exports = typeDefs