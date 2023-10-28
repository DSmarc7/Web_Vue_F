import * as msal from '@azure/msal-browser'

/**
 * List the requested scopes (aka. the requested permissions)
 */
const requestedScopes = {
  scopes: ["User.Read"]
}

const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: process.env.VUE_APP_OAUTH_CLIENT_ID
  },
  cache: {
    cacheLocation: "sessionStorage"
  }
})
msalInstance.initialize()

let isInteractionInProgress = false;

export async function signInAndGetUser () {
  if (isInteractionInProgress) return;
  isInteractionInProgress = true;

  try {
    const authResult = await msalInstance.loginPopup(requestedScopes);
    msalInstance.setActiveAccount(authResult.account);
    isInteractionInProgress = false;
    return authResult.account;
  } catch (error) {
    isInteractionInProgress = false;
    throw error;
  }
}

export function signOutUser() {
  if (isInteractionInProgress) return;
  isInteractionInProgress = true;

  try {
    msalInstance.logout(); // This will sign the user out and clear the session data
  } finally {
    isInteractionInProgress = false;
  }
}
