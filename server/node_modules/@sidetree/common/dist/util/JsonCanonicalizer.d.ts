/// <reference types="node" />
/**
 * Class containing reusable JSON canonicalization operations using JSON Canonicalization Scheme (JCS).
 */
export default class JsonCanonicalizer {
    /**
     * Canonicalizes the given content as a UTF8 buffer.
     */
    static canonicalizeAsBuffer(content: object): Buffer;
}
