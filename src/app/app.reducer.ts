export interface IState {
    isLoading: boolean
}

const initialState: IState = {
    isLoading: false
}

export function appReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'START_LOADING':
            return {
                isLoading: true
            }
        case 'STOP_LOADING': 
            return {
                isLoading: false
            }    
        default:
            return state;
    }

}