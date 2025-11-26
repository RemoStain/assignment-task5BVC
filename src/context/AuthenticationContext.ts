/**
* Defines the global authentication context.
* Holds the current user and exposes a setter to update
* authentication state across the application.
*/
import { createContext } from 'react';
import { User } from '../types/User';

export type AuthenticationContextObject = {
    value: User;
    setValue: (newValue: User | undefined) => void;
};

export const AuthenticationContext = createContext<AuthenticationContextObject | null>(null);
