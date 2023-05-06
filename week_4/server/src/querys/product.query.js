
const queryAllProduct = `
  {
    products(first: 10) {
      edges {
        node {
            id
          title
          images(first: 1) {
            edges {
              node {
                originalSrc
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price
              }
            }
          }
        }
      }
    }
  }
`;

const getProductByCollectionsQuery = (collectionHandles) => {
    return `
      query {
        ${collectionHandles.map((handle, index) => {
        return `collection_${index}: collectionByHandle(handle: "${handle}") {
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  images(first: 1) {
                    edges {
                      node {
                        originalSrc
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        price
                      }
                    }
                  }
                }
              }
            }
          }`;
    }).join('\n')}
      }
    `;
};

const getProductByTagQuery = (tags) => {
    return `
    {
      products(first: 10, query: "${tags}") {
        edges {
          node {
            title
            id
            images(first: 1) {
              edges {
                node {
                  originalSrc
                }
              }
            }
            variants(first: 1) {
                edges {
                  node {
                    price
                  }
                }
            }
          }
        }
      }
    }
  `;
}

module.exports = {
  queryAllProduct,
  getProductByCollectionsQuery,
  getProductByTagQuery
};