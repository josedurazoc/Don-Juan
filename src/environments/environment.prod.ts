const url1 = 'https://tienda.cloudns.cl/wp-json/wc/v3/';
const authUrl1 = 'https://tienda.cloudns.cl/wp-json/jwt-auth/v1/token';
const tokenVerifyUrl1 = 'https://tienda.cloudns.cl/wp-json/jwt-auth/v1/token/validate';

export const environment = {
  production: true,
  backend_api_url: url1,
  auth_url: authUrl1,
  token_verify_url: tokenVerifyUrl1,
  readOnlyKeys: {
    consumer_key: 'ck_1c28954d33710b370b2fa1737889650588b91a0c',
    consumer_secret: 'cs_5aa46cc41679e5324236bc4d3676ccea32c1f43c'
  },

  writablesKeys: {
    consumer_key: 'ck_4c74154b31f9bce2e0e968abbe7afe2ce04913a0',
    consumer_secret: 'cs_bb0aace08206012663bd3483cfcdd42c271f78cc'
  }

};
