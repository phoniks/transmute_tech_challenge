/**
 * Standardized error class for throwing generic errors internal to this project.
 * NOTE: Not to be confused with RequestError which is used as a response to external requests.
 */
export default class SidetreeError extends Error {
    code: string;
    constructor(code: string, message?: string);
    /**
     * Returns a new SidetreeError object using the inputs.
     *
     * @param code The error code.
     * @param err The error exception thrown.
     */
    static createFromError(code: string, err: Error): SidetreeError;
    /**
     * Converts the given `Error` into a string.
     */
    static stringify(error: Error): string;
}
