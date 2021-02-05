module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "components",
        path: "../src/",
      },
    },
    "gatsby-transformer-react-docgen",
  ],
}