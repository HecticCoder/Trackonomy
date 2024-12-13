import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String
    updatedAt: String
  }

  type Expense {
    id: ID!
    name: String!
    amount: Float!
    category: Category!
    user: User!
    date: String!
    createdAt: String
    updatedAt: String
  }

  type Budget {
    id: ID!
    user: User!
    amount: Float!
    duration: String!
    startDate: String!
    endDate: String!
    categories: [CategoryBudget!]!
    totalSavings: Float!
    createdAt: String
    updatedAt: String
  }

  type Category {
    id: ID!
    name: String!
    user: User!
    createdAt: String
    updatedAt: String
  }

  type CategoryBudget {
    category: Category!
    amount: Float!
    savings: Float!
  }

  type Query {
    getUser(id: ID!): User
    getExpenses(userId: ID!): [Expense!]!
    getBudgets(userId: ID!): [Budget!]!
    getCategories(userId: ID!): [Category!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createExpense(
      name: String!
      amount: Float!
      categoryId: ID!
      userId: ID!
      date: String!
    ): Expense!
    createBudget(
      userId: ID!
      amount: Float!
      duration: String!
      startDate: String!
      endDate: String!
      categories: [CategoryBudgetInput!]!
    ): Budget!
    createCategory(name: String!, userId: ID!): Category!
  }

  input CategoryBudgetInput {
    categoryId: ID!
    amount: Float!
  }
`;
