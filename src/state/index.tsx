import {
    PropsWithChildren,
    createContext,
    useContext,
    useReducer,
} from 'react';

interface User {
    id: string;          // Unique identifier for the user
    username: string;    // Username of the user
    email: string;       // Email address of the user
    createdAt: Date;     // Date when the user was created
    updatedAt: Date;     // Date when the user was last updated
}

interface AppState {
    loading: boolean;
    error: string | null;
    user: User | null;
}

type SetLoadingAction = { type: 'SET_LOADING'; payload: boolean };
type SetErrorAction = { type: 'SET_ERROR'; payload: string | null };
type SetUserAction = { type: 'SET_USER'; payload: User | null };


type Action =
    | SetLoadingAction
    | SetErrorAction
    | SetUserAction

const initialState: AppState = {
    loading: false,
    error: null,
    user: null,
};

function reducer(state = initialState, action: Action): AppState {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_USER':
            return { ...state, user: action.payload };

        default:
            return state;
    }
}

// action creators
export const setLoading = (isLoading: boolean): SetLoadingAction => ({
    type: 'SET_LOADING',
    payload: isLoading,
});
export const setError = (error: string | null): SetErrorAction => ({
    type: 'SET_ERROR',
    payload: error,
});
export const setUser = (user: User | null): SetUserAction => ({
    type: 'SET_USER',
    payload: user,
});



const AppContext = createContext<{
    dispatch: React.Dispatch<Action>;
    state: AppState;
}>({ state: initialState, dispatch: (_value) => ({}) });

export const AppStateProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppState = () => useContext(AppContext);
