import * as env from './hide-environment';

export const environment = {
  firebase: {
    projectId: env.hidden.projectId,
    appId: env.hidden.appId,
    storageBucket: env.hidden.storageBucket,
    locationId: env.hidden.locationId,
    apiKey: env.hidden.apiKey,
    authDomain: env.hidden.authDomain,
    messagingSenderId: env.hidden.messagingSenderId,
    measurementId: env.hidden.measurementId
  },
  production: true
};
