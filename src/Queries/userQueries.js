import { gql } from '@apollo/client'

const GET_USERS = gql`
query users {
 users{
        id 
        username
        email
        password
}
        

}
`

export { GET_USERS }