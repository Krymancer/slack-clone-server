export default {
    Mutation: {
        createMessage: async (parent, args, context) => {
            try{
                await context.models.Message.create({...args, userId: context.user.id});
                return true;
            }catch (error){
                return false;
            }
        },
    }
};