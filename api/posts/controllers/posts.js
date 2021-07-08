'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);

          if(!data || !data.descripcion){
            ctx.throw(400,"Agrega contenido al post");
          }

          const {user} = ctx.state;

          entity = await strapi.services.posts.create({...data,...{likes:0,author:user}}, { files });
        } else {
       //   entity = await strapi.services.posts.create({...ctx.request.body,likes:0});
          ctx.throw(400,"Debes enviar un post 'multipart' con Archivos");
        }
        return sanitizeEntity(entity, { model: strapi.models.posts });
      },
        /**
         * Update a record.
         *
         * @return {Object}
         */

        async update(ctx) {
          const { id } = ctx.params;
          const { user } = ctx.state;

          let entity;
          if (ctx.is('multipart')) {
            ctx.throw(400,"Porfavor solamente realizar JSON request con una actualización en la descripción");

          } else {
            delete ctx.request.body.likes;
            entity = await strapi.services.posts.update({ id, author:user.id }, ctx.request.body);
          }

          return sanitizeEntity(entity, { model: strapi.models.posts });
        },
          /**
           * Delete a record.
           *
           * @return {Object}
           */

          async delete(ctx) {
            const { id } = ctx.params;
            const { user } = ctx.state;
            
            const entity = await strapi.services.posts.delete({ id,author: user.id });
            return sanitizeEntity(entity, { model: strapi.models.posts });
          },

    };
