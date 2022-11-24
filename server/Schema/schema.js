const SavedWord = require('../models/SavedWords')
const User = require('../models/Users')



const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

//Saved Word Type


const SavedWordType = new GraphQLObjectType({
    name: 'SavedWord',
    fields: () => ({
        id: {type: GraphQLID},
        result: {type: GraphQLString},
        q: {type: GraphQLString},
        source: {type: GraphQLString},
        target: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.user_id)
            }
        },
        date: {type: GraphQLString}

    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () =>({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    })
    
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        savedwords: {
            type: new GraphQLList(SavedWordType),
            args: {user_id: {type: GraphQLID}},
            resolve(parent, args){
                return SavedWord.find({user_id: args.user_id})
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find()
            }
        }
    }
})

//Mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        //add user
        addUser: {
            type: UserType,
            args: {
                username: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                const user = new User({
                    username: args.username,
                    email: args.email,
                    password: args.password
                })
                return user.save()
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                SavedWord.find({ user_id: args.id }).then((words) => {
                    words.forEach((word) => {
                        word.remove()
                    })
                })
                return User.findByIdAndRemove(args.id)
            }
        },
        addWord: {
            type: SavedWordType,
            args: {
                result: {type: new GraphQLNonNull(GraphQLString)},
                q: {type: new GraphQLNonNull(GraphQLString)},
                source: {type: new GraphQLNonNull(GraphQLString)},
                target: {type: new GraphQLNonNull(GraphQLString)},
                user_id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                const word = new SavedWord({
                    result: args.result,
                    q: args.q,
                    source: args.source,
                    target: args.target,
                    user_id: args.user_id
                })
                return word.save()
            }
        },
        deleteWord: {
            type: SavedWordType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                return SavedWord.findByIdAndRemove(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})

