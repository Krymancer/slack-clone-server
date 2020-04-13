export default {
    Mutation: {
        createChannel: async (parent, args, context) => {
            try{
                await context.models.Channel.create(args);
                return true;
            }catch (error){
                return false;
            }
        },
    }
};