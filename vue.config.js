module.exports = {
  css: {
   loaderOptions: {
    sass: {
      additionalData: `@import "~@/assets/scss/_color.scss";`
    }
   }
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/Side-Project_TodoList_V2/'
  : '/'
 }