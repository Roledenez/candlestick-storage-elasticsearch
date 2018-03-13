/* @flow */
import {bind} from "decko"
import type Candlestick from "kryptopus-candlestick"
import type {StorageInterface} from "kryptopus-candlestick-storage/src/domain/StorageInterface"


/**
 * Elasticsearch storage
 */
export default class ElasticsearchStorage implements StorageInterface
{
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
