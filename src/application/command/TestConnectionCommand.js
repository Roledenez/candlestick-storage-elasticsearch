/* @flow */
import type {CommandInterface} from "solfegejs-cli/interface"
import type StorageBuilder from "../../domain/StorageBuilder"
import type ElasticsearchStorage from "../../domain/ElasticsearchStorage"

/**
 * Test connection
 */
export default class TestConnectionCommand implements CommandInterface
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
        return "kryptopus:candlestick:storage:elasticsearch:test_connection";
    }

    /**
     * Get command description
     *
     * @return  {string}    Command description
     */
    getDescription():string
    {
        return "Test Elasticsearch connection";
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
        const host:string = parameters.shift();

        const storage:ElasticsearchStorage = this.builder.buildFromSerializedConfiguration({
            host: host
        });

        const infos = await storage.getClusterInformations();
        console.log(infos);
    }
}
