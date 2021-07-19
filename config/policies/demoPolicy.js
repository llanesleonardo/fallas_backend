module.exports = async (ctx,next) =>{
    
    if (ctx.state.user) {
    return await next();
    }
    ctx.unauthorized('You are not logged in - motherfucker!');
}