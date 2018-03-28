/* @flow */
import {bind} from "decko"
import {Client} from "elasticsearch"
import type Candlestick from "kryptopus-candlestick"
import type {StorageInterface} from "kryptopus-candlestick-storage/src/domain/StorageInterface"
import type StorageConfiguration from "./StorageConfiguration"

/**
 * Elasticsearch storage
 */
export default class ElasticsearchStorage implements StorageInterface
{
    /**
     * Configuration
     */
    config:StorageConfiguration;

    /**
     * Elasticsearch client
     */
    client:Client;

    /**
     * Constructor
     *
     * @param   {StorageConfiguration}  config  Configuration
     */
    constructor(config:StorageConfiguration)
    {
        this.config = config;

        // Create client instance
        this.client = new Client(config.normalize());
    }

    /**
     * Get cluster informations
     *
     * @return  {*}     Cluster informations
     */
    async getClusterInformations():any
    {
        const response = await this.client.info();
        return response;
    }

    /**
     * Save a candlestick
     *
     * @param   {Candlestick}   candle      Candle
     */
    @bind
    save(candle:Candlestick):void
    {
    }

    /**
     * Get candles by interval
     *
     * @param   {number}        startTimestamp  Start timestamp
     * @param   {number}        endTimestamp    End timestamp
     * @return  {Candlestick[]}                 Candles
     */
    @bind
    getByInterval(startTimestamp:number, endTimestamp:number):Array<Candlestick>
    {
        return [];
    }
}
