module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron:{
    enabled:true
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '083b1b65e5ff25f32ae031b07301b452'),
    },
  },
});
