// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const url = 'https://www.autorefaccionesonline.com/';
const url1 = url + 'wp-json/wc/v3/';
const authUrl1 = url + 'wp-json/jwt-auth/v1/token';
const tokenVerifyUrl1 = url + 'wp-json/jwt-auth/v1/token/validate';

export const environment = {
  production: false,
  backend_api_url: url1,
  auth_url: authUrl1,
  token_verify_url: tokenVerifyUrl1,
  readOnlyKeys: {
    consumer_key: 'ck_51286bf27ce01c3fbf0cae4e35bb7456d789448d',
    consumer_secret: 'cs_72382185337abe4f3f1f9d727deb9c5fd21f23a5'
  },

  writablesKeys: {
    consumer_key: 'ck_51286bf27ce01c3fbf0cae4e35bb7456d789448d',
    consumer_secret: 'cs_72382185337abe4f3f1f9d727deb9c5fd21f23a5'
  }

};

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const url1 = 'https://tienda.cloudns.cl/wp-json/wc/v3/';
// const authUrl1 = 'https://tienda.cloudns.cl/wp-json/jwt-auth/v1/token';
// const tokenVerifyUrl1 = 'https://tienda.cloudns.cl/wp-json/jwt-auth/v1/token/validate';

// export const environment = {
//   production: false,
//   backend_api_url: url1,
//   auth_url: authUrl1,
//   token_verify_url: tokenVerifyUrl1,
//   readOnlyKeys: {
//     consumer_key: 'ck_1c28954d33710b370b2fa1737889650588b91a0c',
//     consumer_secret: 'cs_5aa46cc41679e5324236bc4d3676ccea32c1f43c'
//   },

//   writablesKeys: {
//     consumer_key: 'ck_4c74154b31f9bce2e0e968abbe7afe2ce04913a0',
//     consumer_secret: 'cs_bb0aace08206012663bd3483cfcdd42c271f78cc'
//   }

// };
// ///////////////////////////////////////////7/////////////////////////////////////////////////////////////
// const url = 'https://tienda.cloudns.cl/';
// const url1 = url + 'wp-json/wc/v3/';
// const authUrl1 = url + 'wp-json/jwt-auth/v1/token';
// const tokenVerifyUrl1 = url + 'wp-json/jwt-auth/v1/token/validate';

// export const environment = {
//   production: false,
//   backend_api_url: url1,
//   auth_url: authUrl1,
//   token_verify_url: tokenVerifyUrl1,
//   readOnlyKeys: {
//     consumer_key: 'ck_1c28954d33710b370b2fa1737889650588b91a0c',
//     consumer_secret: 'cs_5aa46cc41679e5324236bc4d3676ccea32c1f43c'
//   },

//   writablesKeys: {
//     consumer_key: 'ck_4c74154b31f9bce2e0e968abbe7afe2ce04913a0',
//     consumer_secret: 'cs_bb0aace08206012663bd3483cfcdd42c271f78cc'
//   },
//   states: [
//     { value: 'AGS', name: 'AGUASCALIENTES' },
//     { value: 'BC', name: 'BAJA CALIFORNIA' },
//     { value: 'BCS', name: 'BAJA CALIFORNIA SUR' },
//     { value: 'CHI', name: 'CHIHUAHUA' },
//     { value: 'CHS', name: 'CHIAPAS' },
//     { value: 'CMP', name: 'CAMPECHE' },
//     { value: 'CMX', name: 'CIUDAD DE MEXICO' },
//     { value: 'COA', name: 'COAHUILA' },
//     { value: 'COL', name: 'COLIMA' },
//     { value: 'DGO', name: 'DURANGO' },
//     { value: 'GRO', name: 'GUERRERO' },
//     { value: 'GTO', name: 'GUANAJUATO' },
//     { value: 'HGO', name: 'HIDALGO' },
//     { value: 'JAL', name: 'JALISCO' },
//     { value: 'MCH', name: 'MICHOACAN' },
//     { value: 'MEX', name: 'ESTADO DE MEXICO' },
//     { value: 'MOR', name: 'MORELOS' },
//     { value: 'NAY', name: 'NAYARIT' },
//     { value: 'NL', name: 'NUEVO LEON' },
//     { value: 'OAX', name: 'OAXACA' },
//     { value: 'PUE', name: 'PUEBLA' },
//     { value: 'QR', name: 'QUINTANA ROO' },
//     { value: 'QRO', name: 'QUERETARO' },
//     { value: 'SIN', name: 'SINALOA' },
//     { value: 'SLP', name: 'SAN LUIS POTOSI' },
//     { value: 'SON', name: 'SONORA' },
//     { value: 'TAB', name: 'TABASCO' },
//     { value: 'TLX', name: 'TLAXCALA' },
//     { value: 'TMS', name: 'TAMAULIPAS' },
//     { value: 'VER', name: 'VERACRUZ' },
//     { value: 'YUC', name: 'YUCATAN' },
//     { value: 'ZAC', name: 'ZACATECAS' }
//   ]

// };
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
