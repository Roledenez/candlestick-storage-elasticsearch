/* @flow */
import {bind} from "decko"
import type {StorageBuilderInterface} from "kryptopus-candlestick-storage/src/domain/StorageBuilderInterface"
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
    @bind
    build(config?:StorageConfiguration):ElasticsearchStorage
    {
        if (!config) {
            throw new Error("Unable to build ElasticsearchStorage, no configuration provided");
        }


        let storage = new ElasticsearchStorage(config);

        return storage;
    }

    /**
     * Build a storage instance from serialized configuration
     *
     * @param   {*}                 serializedConfig    Serialized configuration
     * @return  {StorageInterface}                      Storage instance
     */
    @bind
    buildFromSerializedConfiguration(serializedConfig:any):ElasticsearchStorage
    {
        let config:StorageConfiguration = new StorageConfiguration();

        if (serializedConfig.hasOwnProperty("host")) {
            config.host = serializedConfig.host;
        }

        return this.build(config);
    }
}
