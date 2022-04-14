import { Action } from "@ngrx/store"

export interface AuthState {
    isAuthenticated: boolean
}

const initialState: AuthState = {
    isAuthenticated: false
}

export const getIsAuthenticated = (state: AuthState) => state.isAuthenticated
