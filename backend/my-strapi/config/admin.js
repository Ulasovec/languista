module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '115bdbc7995107e0ed268a5583cb48e9'),
  },
});
