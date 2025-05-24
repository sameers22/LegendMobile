import { GraphQLClient, gql } from 'graphql-request';

// ✅ Use .myshopify.com — not custom domain
const SHOPIFY_STORE_URL = 'https://legendchefsauce.com/api/2023-10/graphql.json';
const STOREFRONT_ACCESS_TOKEN = '329a32e185d95561475a2678fab48e44';

const client = new GraphQLClient(SHOPIFY_STORE_URL, {
  headers: {
    'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
});

// ✅ Fetch products
export const fetchProducts = async () => {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(SHOPIFY_STORE_URL, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  return result.data.products.edges.map(edge => edge.node);
};

// ✅ Create checkout with multiple items
export const createCheckout = async (cartItems) => {
  if (!cartItems || cartItems.length === 0) {
    throw new Error('No items in cart');
  }

  const lineItems = cartItems.map(item => `
    {
      variantId: "${item.variant.id}",
      quantity: ${item.quantity || 1}
    }
  `).join(',');

  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [${lineItems}]
      }) {
        checkout {
          id
          webUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await fetch(SHOPIFY_STORE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  console.log("Shopify Response:", JSON.stringify(result, null, 2));

  const checkoutData = result?.data?.checkoutCreate;

  if (!checkoutData?.checkout) {
    const errors = checkoutData?.userErrors;
    if (errors?.length > 0) {
      throw new Error(errors[0].message || 'Unknown Shopify error');
    }
    throw new Error('Checkout creation failed – no data returned from Shopify.');
  }

  return checkoutData.checkout;
};
