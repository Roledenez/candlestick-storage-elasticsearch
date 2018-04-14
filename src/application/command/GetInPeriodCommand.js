/* @flow */
import type {CommandInterface} from "solfegejs-cli/interface"
import type StorageBuilder from "../../domain/StorageBuilder"
import type ElasticsearchStorage from "../../domain/ElasticsearchStorage"

/**
 * Get candles in period
 */
export default class GetInPeriodCommand implements CommandInterface
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
        return "kryptopus:candlestick:storage:elasticsearch:get_in_period";
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
        const startDateString:string = parameters.shift();
        const endDateString:string = parameters.shift();

        // Get candles
        const startDate:Date = new Date(startDateString);
        const endDate:Date = new Date(endDateString);
        const startTime:number = startDate.valueOf();
        const endTime:number = endDate.valueOf();
        const response = await storage.getInPeriod(exchangeName, baseAsset, quoteAsset, interval, startTime, endTime);
        console.log(response);
    }
}
