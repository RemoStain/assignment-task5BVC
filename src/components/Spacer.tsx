/**
 * Layout utility component.
 *
 * Provides vertical space by default, or horizontal space when `horizontal = true`.
 * Intended to eliminate repetitive `<View style={{ margin... }} />` patterns.
 */
import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
    size?: number;
    horizontal?: boolean;
}

export default function Spacer({ size = 8, horizontal = false }: SpacerProps) {
    /**
     * Render empty space using width or height depending on direction.
     */
    return (
        <View
            style={{
                width: horizontal ? size : 'auto',
                height: !horizontal ? size : 'auto',
            }}
        />
    );
}
