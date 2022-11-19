import { gql } from "@apollo/client"

const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            id
            username
            email
            password
        }
    }

`

export { ADD_USER }