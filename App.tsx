/**
 * Root component of the Expo application.
 * 
 * Responsibilities:
 * - Load required Nunito font families before rendering the UI
 * - Configure the status bar appearance
 * - Wrap the entire app with ActionSheetProvider so screens can use ActionSheets
 * - Render the navigation stack once fonts are ready
 */
import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import {
    useFonts,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';

import AppStack from './src/routes/AppStack';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    /**
     * Load font assets before the application renders.
     * If fonts are not loaded, return null temporarily to avoid UI inconsistencies.
     */
    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_800ExtraBold,
    });

    if (!fontsLoaded) {
        return null;
    } else {
        /**
         * Once fonts are loaded, render the application:
         * - StatusBar for system UI styling
         * - ActionSheetProvider wraps the component tree
         * - AppStack handles navigation between screens
         */
        return (
            <>
                <StatusBar animated translucent style="dark" />
                <ActionSheetProvider>
                    <AppStack />
                </ActionSheetProvider>
            </>
        );
    }
}
