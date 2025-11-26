/**  
 * - Format a byte count into a human-readable unit  
 * - Converts raw bytes into KB, MB, GB,..., selecting the appropriate scale.  
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};


/**  
 * - Convert a Date object into a 12-hour time string  
 * - Handles am/pm formatting and zero-padding for minutes.  
 */
export const formatAMPM = (date: Date): string => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const newHours = hours % 12 ? hours : 12;
    const newMinutes = minutes < 10 ? '0' + minutes : minutes;
    return newHours + ':' + newMinutes + ' ' + ampm;
};


/**  
 * - Add a number of hours to a given Date  
 * - Returns a new Date object without modifying the original instance.  
 */
export const addHours = (dateTime: Date, hoursToAdd: number) => {
    const milisecondsToAdd = hoursToAdd * 60 * 60 * 1000;
    const newDate = new Date(dateTime);
    return new Date(newDate.setTime(newDate.getTime() + milisecondsToAdd));
};


/**  
 * - Replace the time portion of a date with the time from another date  
 * - Keeps the original day, month, and year while adopting the new hours/minutes.  
 */
export const updateDateWithNewTime = (existingDate: Date, newTime: Date): Date => {
    const newDate = new Date(new Date(existingDate).setHours(newTime.getHours(), newTime.getMinutes(), 0, 0));
    return newDate;
};


/**  
 * - Normalize an email address  
 * - Strips whitespace and forces lowercase.  
 */
export const sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
};


/**  
 * - Validate basic email structure  
 * - Cleans input and checks against a simple regular expression.  
 */
export const validateEmail = (email: string): boolean => {
    if (!email) return false;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
    const sanitizedEmail = email.trim().toLowerCase();
    const result = sanitizedEmail.match(regex);
    return !!result?.[0];
};


/**  
 * - Convert a date field in each object of an array into a Date instance  
 * - Useful for parsing API responses that contain ISO date strings.  
 */
export const parseDateFieldFromJSONResponse = (array: [], fieldName: string): any[] => {
    return array.map((x: any) => {
        x[fieldName] = new Date(x[fieldName]);
        return x;
    });
};


/**  
 * - Convert a string to a numeric value  
 * - Wrapper for Number() for consistency with other utility functions.  
 */
export const castToNumber = (text: string) => {
    return Number(text);
};


/**  
 * - Retrieve an environment variable from Expo configuration  
 * - Provides error handling with a warning if the variable is missing.  
 */
export const getEnvironentVariable = (variableName: string) => {
    try {
        const value = Constants.expoConfig?.extra?.[variableName];
        if (value != null) {
            return value;
        } else {
            throw new Error(`${variableName} not found.`);
        }
    } catch (e) {
        console.warn(e);
    }
};


/**  
 * - Build a URL for launching a maps application  
 * - Returns a platform-appropriate link targeting the given coordinates.  
 */
export const getMapsUrl = (coordinates: LatLng): string => {
    const { latitude, longitude } = coordinates;
    const latLng = `${latitude},${longitude}`;
    const label = 'Custom Label';
    return Platform.OS === 'ios'
        ? `maps:0,0?q=${label}@${latLng}`
        : `geo:0,0?q=${latLng}(${label})`;
};


/**  
 * - Determine whether a JWT token is expired  
 * - Decodes the token payload and compares expiration to the current time.  
 */
export const isTokenExpired = (token: string) => {
    const decodedToken = jwtDecode(token) as JwtPayload;
    const currentDate = Date.now();
    return (decodedToken.exp as number) * 1000 < currentDate;
};
