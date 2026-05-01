import { createStore } from '@/shared/lib/create-store';
import { fetchRandomUser } from '../lib/generate-user';

const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const SELECT_USER = 'SELECT_USER';
const CLOSE_DIALOG = 'CLOSE_DIALOG';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

const initialState = {
    users: [],
    selectedUser: null,
}

function reducer(state, action) {
    switch (action.type) {
        case ADD_USER:
        return {
            ...state,
            users: [...state.users, action.payload],
        };
        case DELETE_USER:
        return {
            ...state,
            users: state.users.filter((u) => u.id !== action.payload),
        };
        case SELECT_USER:
        return {
            ...state,
            selectedUser: state.users.find((u) => u.id === action.payload) || null,
        };
        case CLOSE_DIALOG:
        return {
            ...state,
            selectedUser: null,
        };
        case UPDATE_ADDRESS:
        return {
            ...state,
            selectedUser: null,
            users: state.users.map((u) =>
            u.id === action.payload.id
                ? { ...u, address: action.payload.address }
                : u
            ),
        };
        default:
            return state;
    }
}

export const userStore = createStore(reducer, initialState);

export async function addUser() {
    const user = await fetchRandomUser();
    userStore.dispatch({ type: ADD_USER, payload: user });
}

export function deleteUser(id) {
    userStore.dispatch({ type: DELETE_USER, payload: id });
}
export function selectUser(id) {
    userStore.dispatch({ type: SELECT_USER, payload: id });
}
export function closeDialog() {
    userStore.dispatch({ type: CLOSE_DIALOG });
}
export function updateAddress(id, address) {
    userStore.dispatch({ type: UPDATE_ADDRESS, payload: { id, address } });
}