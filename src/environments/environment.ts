// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
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
  production: false,
  firebaseConfig : {
    apiKey: env.hidden.apiKey,
    authDomain: env.hidden.authDomain,
    projectId: env.hidden.projectId,
    storageBucket: env.hidden.storageBucket,
    messagingSenderId: env.hidden.messagingSenderId
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
