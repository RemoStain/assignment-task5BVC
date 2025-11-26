/**
 * Map screen displaying event locations.
 *
 * Responsibilities:
 * - Render Google-powered map with custom map styling
 * - Display event markers loaded from static list
 * - Adjust map viewport to fit events via `fitToCoordinates`
 * - Provide quick actions: create event + logout
 */
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import customMapStyle from '../../map-style.json';
import * as MapSettings from '../constants/MapSettings';
import { AuthenticationContext } from '../context/AuthenticationContext';
import mapMarkerImg from '../images/map-marker.png';

export default function EventsMap(props: StackScreenProps<any>) {
    const { navigation } = props;
    const authenticationContext = useContext(AuthenticationContext);
    const mapViewRef = useRef<MapView>(null);

    /**
     * Navigation handlers (currently stubs)
     */
    const handleNavigateToCreateEvent = () => { };
    const handleNavigateToEventDetails = () => { };

    /**
     * Logout:
     * - Remove cached auth details
     * - Clear AuthenticationContext
     * - Redirect to Login screen
     */
    const handleLogout = async () => {
        AsyncStorage.multiRemove(['userInfo', 'accessToken']).then(() => {
            authenticationContext?.setValue(undefined);
            navigation.navigate('Login');
        });
    };

    /**
     * UI Rendering:
     * - `MapView` covers full screen
     * - Markers generated from static `events` list
     * - Footer shows number of events + Create button
     * - Floating logout button in upper right
     */
    return (
        <View style={styles.container}>
            <MapView
                ref={mapViewRef}
                provider={PROVIDER_GOOGLE}
                initialRegion={MapSettings.DEFAULT_REGION}
                style={styles.mapStyle}
                customMapStyle={customMapStyle}
                showsMyLocationButton={false}
                showsUserLocation={true}
                rotateEnabled={false}
                toolbarEnabled={false}
                moveOnMarkerPress={false}
                mapPadding={MapSettings.EDGE_PADDING}
                onLayout={() =>
                    mapViewRef.current?.fitToCoordinates(
                        events.map(({ position }) => ({
                            latitude: position.latitude,
                            longitude: position.longitude,
                        })),
                        { edgePadding: MapSettings.EDGE_PADDING }
                    )
                }
            >
                {events.map((event) => (
                    <Marker
                        key={event.id}
                        coordinate={{
                            latitude: event.position.latitude,
                            longitude: event.position.longitude,
                        }}
                        onPress={handleNavigateToEventDetails}
                    >
                        <Image resizeMode="contain" style={{ width: 48, height: 54 }} source={mapMarkerImg} />
                    </Marker>
                ))}
            </MapView>

            {/* Footer summary + Create event button */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>X event(s) found</Text>
                <RectButton
                    style={[styles.smallButton, { backgroundColor: '#00A3FF' }]}
                    onPress={handleNavigateToCreateEvent}
                >
                    <Feather name="plus" size={20} color="#FFF" />
                </RectButton>
            </View>

            {/* Logout button */}
            <RectButton
                style={[styles.logoutButton, styles.smallButton, { backgroundColor: '#4D6F80' }]}
                onPress={handleLogout}
            >
                <Feather name="log-out" size={20} color="#FFF" />
            </RectButton>
        </View>
    );
}

/**
 * Static mock event coordinates.
 * Eventually expected to be replaced with API-driven event data.
 */
interface event {
    id: string;
    position: {
        latitude: number;
        longitude: number;
    };
}

const events: event[] = [
    {
        id: 'e3c95682-870f-4080-a0d7-ae8e23e2534f',
        position: { latitude: 51.105761, longitude: -114.106943 },
    },
    {
        id: '98301b22-2b76-44f1-a8da-8c86c56b0367',
        position: { latitude: 51.04112, longitude: -114.069325 },
    },
    {
        id: 'd7b8ea73-ba2c-4fc3-9348-9814076124bd',
        position: { latitude: 51.01222958257112, longitude: -114.11677222698927 },
    },
    {
        id: 'd1a6b9ea-877d-4711-b8d7-af8f1bce4d29',
        position: { latitude: 51.010801915407036, longitude: -114.07823592424393 },
    },
];
