'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

 module.exports = {
   /**
    * Create a record.
    *
    * @return {Object}
    */
 
   async create(ctx) {
     let entity;

    const {user} = ctx.state;
    const {post} = ctx.request.body;

    if(typeof post !== 'number'){
        ctx.throw(400,"Porfavor solamente incluir el ID del post")
    }

    const realPost = await strapi.services.posts.findOne({
        id:post
    })

    if (!realPost) {
        ctx.throw(400," Este post no existe");
    }

    const found = await strapi.services.likes.findOne({
        user:user.id,
        post
    })

    if (found) {
        ctx.throw(400,"Ya diste like a este post")
    }

     if (ctx.is('multipart')) {
      ctx.throw(400,"Solamente realizar JSON request");

     } else {
       entity = await strapi.services.likes.create({post,user});
     }

     //UPDATE likes

     const {likes} = realPost;
     const updatePost = await strapi.services.posts.update({
         id:post
     },{
         likes:likes + 1
     })

     return sanitizeEntity(entity, { model: strapi.models.likes });
   },

   async delete(ctx) {
    const { id } = ctx.params;
    const {user} = ctx.state;
    const {postId} = ctx.params;
    
    const post = parseInt(postId);

    if(typeof post !== 'number'){
        ctx.throw(400,"Porfavor solamente incluir el ID del post")
    }


    const entity = await strapi.services.likes.delete({ 
        post,
        user:user.id 
    });
    
    if (entity.length) {
        const {likes} = entity[0].post;
        const updatePost = await strapi.services.posts.update({
            id: post
        },{
            likes:likes - 1
        });
        return sanitizeEntity(entity[0], { model: strapi.models.likes });
    }

  },

 };
