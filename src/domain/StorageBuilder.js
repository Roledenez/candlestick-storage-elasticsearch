/* @flow */
import type {StorageBuilderInterface} from "kryptopus-candlestick-storage/src/domain/StorageBuilderInterface"
import type {StorageInterface} from "kryptopus-candlestick-storage/src/domain/StorageInterface"
import ElasticsearchStorage from "./ElasticsearchStorage"
import StorageConfiguration from "./StorageConfiguration"

/**
 * Build Elasticsearch storage instances
 */
export default class StorageBuilder implements StorageBuilderInterface
{
    /**
     * Build a storage instance
     *
     * @param   {StorageConfiguration}      config      Storage configuration
     * @return  {StorageInterface}                      Storage instance
     */
    build(config?:StorageConfiguration):StorageInterface
    {
        if (!config) {
            throw new Error("Unable to build FilesystemStorage, no configuration provided");
        }


        let storage = new ElasticsearchStorage();

        return storage;
    }
}
