/* @flow */
import type {BundleInterface} from "solfegejs-application/src/BundleInterface"

/**
 * Elasticsearch storage for candlesticks
 */
export default class Bundle implements BundleInterface
{
    /**
     * Get bundle path
     *
     * @return  {String}        The bundle path
     */
    getPath():string
    {
        return __dirname;
    }
}
