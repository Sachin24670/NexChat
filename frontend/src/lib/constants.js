export const HOST = `${import.meta.env.VITE_SERVER_URL}`

export const AUTH_ROUTE ="/api/auth"
export const SIGN_UP_ROUTE = `${AUTH_ROUTE}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`
export const GET_USER_INFO = `${AUTH_ROUTE}/user-info`

export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTE}/update-profile`
export const UPDATE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTE}/update-profile-image`
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTE}/remove-profile-image`
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`