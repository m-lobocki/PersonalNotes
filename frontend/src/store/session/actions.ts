import {Action} from "redux";

export const TOGGLE_NAVIGATION_BAR = 'TOGGLE_NAVIGATION_BAR';

interface ToggleNavigationBarAction extends Action<typeof TOGGLE_NAVIGATION_BAR> {
    isVisible: boolean;
}

export function toggleNavigationBar(isVisible: boolean) {
    return {type: TOGGLE_NAVIGATION_BAR, isVisible};
}

export type SessionActionsTypes = ToggleNavigationBarAction;
