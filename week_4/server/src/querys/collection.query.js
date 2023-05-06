
const queryCollections = `
  {
    shop {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  }
`;

module.exports = queryCollections;