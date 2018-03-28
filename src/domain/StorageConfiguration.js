/* @flow */

/**
 * Storage configuration
 */
export default class StorageConfiguration
{
    /**
     * Server host
     */
    host:string;

    /**
     * Normalize configuration
     */
    normalize()
    {
        let data = {};

        if (this.host) {
            data.host = this.host;
        }

        return data;
    }
}
