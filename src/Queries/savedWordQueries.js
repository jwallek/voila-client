import { gql } from '@apollo/client'

const GET_SAVED_WORDS = gql `
    query savedwords($id: ID!){ 
        savedwords(user_id: $id){
            id
            result
            q
            source
            target
            user{
                id
            }
        }
    }
`

export { GET_SAVED_WORDS }