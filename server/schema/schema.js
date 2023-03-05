// Mongoose Models
const Products = require('../models/products')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql')



const productMongooseSchemaArgs = (args) => ({
    manufacturer: args.manufacturer,
    model: args.model,
    specifications: args.specifications,
    category: args.category,
    observations: args.observations,
    createBy: args.createBy,
    createionDate: args.createionDate,
})

const productGraphQLArgs = {
    manufacturer: { type: new GraphQLNonNull(GraphQLString) },
    model: { type: new GraphQLNonNull(GraphQLString) },
    specifications: { type: GraphQLString },
    category: { type: GraphQLString },
    observations: { type: GraphQLString },
    createBy: { type: GraphQLString },
    createionDate: { type: GraphQLString },
}

// Client Type
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type:  new GraphQLNonNull(GraphQLID) },
        manufacturer: { type: GraphQLString },
        model: { type: GraphQLString },
        specifications: { type: GraphQLString },
        category: { type: GraphQLString },
        observations: { type: GraphQLString },
        createBy: { 
            type:  GraphQLString 
        },
        createionDate: { 
            type: GraphQLString
        },
    })
});

// Stock Type
const StockType = new GraphQLObjectType({
    name: 'Stock',
    fields: () => ({
        id: { type: GraphQLID },
        productId: { type: GraphQLID },
        quantity: { type: GraphQLInt },
        serialNumber: { type: GraphQLString },
        location: { type: Location }
    })
});

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        role: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

const productsObject = {
    type: new GraphQLList(ProductType),
    resolve: (parent, args) => {
        return Products.find()
    }
}

const productObject = {
    type: ProductType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID)},
    },
    resolve: (parent, args) => {
        return Products.findById(args.id)
    }
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        products: productsObject,
        product: productObject,
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: productGraphQLArgs,
            resolve(parent, args){
                const product = new Products(productMongooseSchemaArgs(args))

                return product.save();
            }
        }, 

        // Delete a Product
        deleteProduct: {
            type: ProductType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                return Products.findByIdAndRemove(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation

})