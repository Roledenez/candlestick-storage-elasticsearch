/* @flow */
import type {CommandInterface} from "solfegejs-cli/interface"
import type StorageBuilder from "../../domain/StorageBuilder"
import type ElasticsearchStorage from "../../domain/ElasticsearchStorage"
import Candlestick from "kryptopus-candlestick"

/**
 * Save a candle
 */
export default class SaveCandleCommand implements CommandInterface
{
    /**
     * Storage builder
     */
    builder:StorageBuilder;

    /**
     * Constructor
     *
     * @param   {StorageBuilder}    builder     Storage builder
     */
    constructor(builder:StorageBuilder)
    {
        this.builder = builder;
    }

    /**
     * Get command name
     *
     * @return  {string}    Command name
     */
    getName():string
    {
        return "kryptopus:candlestick:storage:elasticsearch:save_candle";
    }

    /**
     * Get command description
     *
     * @return  {string}    Command description
     */
    getDescription():string
    {
        return "Save candle";
    }

    /**
     * Configure the command
     */
    async configure()
    {
    }

    /**
     * Execute the command
     *
     * @param   {Array}     parameters  Command parameters
     */
    async execute(parameters:Array<string>)
    {

        // Build storage instance
        const host:string = parameters.shift();
        const storage:ElasticsearchStorage = this.builder.buildFromSerializedConfiguration({
            host: host
        });

        // Get candle informations
        const exchangeName:string = parameters.shift();
        const baseAsset:string = parameters.shift();
        const quoteAsset:string = parameters.shift();
        const interval:string = parameters.shift();
        const candleJson:string = parameters.shift();

        // Build candle instance
        let candle:Candlestick = new Candlestick();
        const normalizedCandle = JSON.parse(candleJson);
        if (normalizedCandle.hasOwnProperty("openTime")) {
            candle.openTime = normalizedCandle.openTime;
        }
        if (normalizedCandle.hasOwnProperty("closeTime")) {
            candle.closeTime = normalizedCandle.closeTime;
        }
        if (normalizedCandle.hasOwnProperty("open")) {
            candle.open = normalizedCandle.open;
        }
        if (normalizedCandle.hasOwnProperty("close")) {
            candle.close = normalizedCandle.close;
        }
        if (normalizedCandle.hasOwnProperty("low")) {
            candle.low = normalizedCandle.low;
        }
        if (normalizedCandle.hasOwnProperty("high")) {
            candle.high = normalizedCandle.high;
        }
        if (normalizedCandle.hasOwnProperty("volume")) {
            candle.volume = normalizedCandle.volume;
        }
        if (normalizedCandle.hasOwnProperty("tradeCount")) {
            candle.tradeCount = normalizedCandle.tradeCount;
        }

        // Save
        await storage.save(exchangeName, baseAsset, quoteAsset, interval, candle);
    }
}
