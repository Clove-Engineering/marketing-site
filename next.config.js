
const plasmic = require('@plasmicapp/loader/next');
const withPlasmic = plasmic({
  projects: ['mNGdBvLwyR9yfjiYi6Hdz2'] // An array of project ids.
});
module.exports = withPlasmic({
  trailingSlash: true,
  // Your NextJS config.
});
  