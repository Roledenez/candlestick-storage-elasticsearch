/* @flow */
import {bind} from "decko"
import {Client} from "elasticsearch"
import Candlestick from "kryptopus-candlestick"
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
     * @param   {string}        exchangeName    Exchange name
     * @param   {string}        baseAsset       Base asset
     * @param   {string}        quoteAsset      Quote asset
     * @param   {string}        interval        Interval
     * @param   {Candlestick}   candle          Candle
     */
    @bind
    async save(
        exchangeName:string,
        baseAsset:string,
        quoteAsset:string,
        interval:string,
        candle:Candlestick
    ):void | Promise<void>
    {
        await this.ensureIndex(exchangeName, baseAsset, quoteAsset, interval);

        const indexName:string = this.getIndexName(exchangeName, baseAsset, quoteAsset, interval);
        const exists = await this.client.exists({
            index: indexName,
            type: "candlestick",
            id: String(candle.openTime)
        });
        if (!exists) {
            const normalizedCandle = this.normalizeCandle(candle);
            await this.client.create({
                index: indexName,
                type: "candlestick",
                id: String(candle.openTime),
                body: normalizedCandle
            });
        }
    }

    /**
     * Get candles in period
     *
     * @param   {string}        exchangeName    Exchange name
     * @param   {string}        baseAsset       Base asset
     * @param   {string}        quoteAsset      Quote asset
     * @param   {string}        interval        Interval
     * @param   {number}        startTime       Start timestamp of the period
     * @param   {number}        endTime         End timestamp of the period
     * @return  {Candlestick[]}                 Candles
     */
    @bind
    async getInPeriod(
        exchangeName:string,
        baseAsset:string,
        quoteAsset:string,
        interval:string,
        startTime:number,
        endTime:number
    ):Array<Candlestick> | Promise<Array<Candlestick>> {
        const indexName:string = this.getIndexName(exchangeName, baseAsset, quoteAsset, interval);

        const response = await this.client.search({
            index: indexName,
            body: {
                query: {
                    range: {
                        openTime: {
                            gte: startTime,
                            lte: endTime
                        }
                    }
                }
            }
        });
        const hits = response.hits.hits;

        let candles:Array<Candlestick> = [];
        for (let hit of hits) {
            let candle = this.denormalizeCandle(hit._source);
            candles.push(candle);
        }

        return candles;
    }

    /**
     * Get index name
     *
     * @param   {string}    exchangeName    Exchange name
     * @param   {string}    baseAsset       Base asset
     * @param   {string}    quoteAsset      Quote asset
     * @param   {string}    interval        Interval
     * @return  {string}                    Index name
     */
    @bind
    getIndexName(exchangeName:string, baseAsset:string, quoteAsset:string, interval:string):string
    {
        return `${exchangeName}_${baseAsset}_${quoteAsset}_${interval}`;
    }

    @bind
    normalizeCandle(candle:Candlestick):any
    {
        let normalized = {
            openTime: candle.openTime,
            closeTime: candle.closeTime,
            open: candle.open,
            close: candle.close,
            low: candle.low,
            high: candle.high,
            tradeCount: candle.tradeCount
        };

        return normalized;
    }

    @bind
    denormalizeCandle(data:any):Candlestick
    {
        let candle = new Candlestick;
        if (data.hasOwnProperty("openTime")) {
            candle.openTime = data.openTime;
        }
        if (data.hasOwnProperty("closeTime")) {
            candle.closeTime = data.closeTime;
        }
        if (data.hasOwnProperty("open")) {
            candle.open = data.open;
        }
        if (data.hasOwnProperty("close")) {
            candle.close = data.close;
        }
        if (data.hasOwnProperty("low")) {
            candle.low = data.low;
        }
        if (data.hasOwnProperty("high")) {
            candle.high = data.high;
        }
        if (data.hasOwnProperty("volume")) {
            candle.volume = data.volume;
        }
        if (data.hasOwnProperty("tradeCount")) {
            candle.tradeCount = data.tradeCount;
        }

        return candle;
    }

    /**
     *
     */
    @bind
    async ensureIndex(exchangeName:string, baseAsset:string, quoteAsset:string, interval:string):Promise<void>
    {
        const indexName:string = this.getIndexName(exchangeName, baseAsset, quoteAsset, interval);

        // Check if the index exists
        const response = await this.client.indices.exists({
            index: indexName
        });

        // Create the index if necessary
        if (!response) {
            await this.client.indices.create({
                index: indexName
            });
        }
    }
}
