/* @flow */
import type {CommandInterface} from "solfegejs-cli/interface"

/**
 * Test connection
 */
export default class TestConnectionCommand implements CommandInterface
{
    /**
     * Constructor
     */
    constructor()
    {
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
    }
}
