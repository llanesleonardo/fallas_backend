module.exports = async (ctx, next) =>{

    if (!ctx.request.query["post.author"]) {
        return ctx.unauthorized("Especifica el author de esta manera author={id}");
    }

    const targetUser = String(ctx.request.query["post.author"])
    const loggedInUser = String(ctx.state.user.id)
    
    if (targetUser === loggedInUser) {
        return next();
    }else{
        return ctx.unauthorized("El usuario es diferente que el logueado")
    }
}

