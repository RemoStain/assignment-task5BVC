/**
 * Babel configuration for the Expo project.
 * 
 * This enables Expo's preset, allowing the build system to understand
 * the project's React Native and TypeScript syntax during compilation.
 * The configuration is cached to improve build performance.
 */
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
    };
};
