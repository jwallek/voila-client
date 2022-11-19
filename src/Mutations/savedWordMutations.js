import { gql } from '@apollo/client'

const ADD_WORD = gql`
    mutation addWord(
        $result: String!,
        $q: String!,
        $source: String!,
        $target: String!,
        $user_id: ID!,
    ) {
        addWord(
            result: $result,
            q: $q,
            source: $source,
            target: $target,
            user_id: $user_id
        ){
            result
        }
    }

`

const DELETE_WORD = gql `
    mutation deleteWord($id: ID!){
        deleteWord(id: $id){
            id
        }
    }

`

export { ADD_WORD, DELETE_WORD }