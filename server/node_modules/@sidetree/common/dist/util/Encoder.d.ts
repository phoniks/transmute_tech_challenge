/// <reference types="node" />
/**
 * Class that encodes binary blobs into strings.
 * Note that the encode/decode methods may change underlying encoding scheme.
 */
export default class Encoder {
    /**
     * Encodes given Buffer into a Base64URL string.
     */
    static encode(content: Buffer | string): string;
    /**
     * Decodes the given Base64URL string into a Buffer.
     */
    static decodeAsBuffer(encodedContent: string): Buffer;
    /**
     * Decodes the given input into the original string.
     */
    static decodeAsString(encodedContent: string): string;
    /**
     * Decodes the given Base64URL string into the original string.
     */
    static decodeBase64UrlAsString(input: string): string;
    /**
     * Validates if the given input is a Base64URL string.
     * undefined is considered not a valid Base64URL string.
     * NOTE: input is `any` type to handle cases when caller passes input directly from JSON.parse() as `any`.
     * @throws SidetreeError if input is not a Base64URL string.
     */
    private static validateBase64UrlString;
    /**
     * Tests if the given string is a Base64URL string.
     */
    static isBase64UrlString(input: string): boolean;
}
