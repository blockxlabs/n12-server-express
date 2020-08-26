const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    uuid: String!
    email: String!
  }
  type DApps {
    uuid: String!
    name: String!
    description: String!
    logoUrl: String!
    Notifications: [Notifications!]
  }
  type Notifications {
    uuid: String!
    dAppUuid: String!
    name: String!
    shortDescription: String!
    longDescription: String!
    DApps: DApps!
  }
  type UserNotifications {
    uuid: String
    userUuid: String
    dAppUuid: String
    notificationsUuid: String,
    Notification: Notifications!
    DApp: DApps!
    User: User!
  }
  type NotificationSearchResult {
    notifications: [Notifications]!
    totalCount: Int!
    dApp: DApps!
  }
  type Query {
    user(id: Int!): User
    allDApps: [DApps!]!
    searchDApps(searchLike: String!): [DApps!]!
    dApps(uuid: String!): DApps
    allNotifications: [Notifications!]!
    notifications(uuid: String!): Notifications
    notificationsByDApp(dAppUuid: String!, searchQuery: String, offset: Int, limit: Int): NotificationSearchResult!
    UserSubscriptions(userUuid: String!): [UserNotifications]
  }
  type Mutation {
    subscribeNotifications(email : String!,dAppUuid: String!,selectedNotifications:[String!]): [UserNotifications]
    unsubscribeNotifications(userNotifications:[String!]): Boolean
    testEmail(to: String, apiKey: String, domain: String): Boolean!
  }
`

module.exports = typeDefs