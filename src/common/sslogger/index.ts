const LOGGER_EDGE_WIDTH = 80

/**
 * 我自己封装的一个服务端logger
 */
function sslogger(...args: [title: string, content: any]|[content: any])
{
    if(arguments.length === 1)
    {
        const content = arguments[0]

        console.log('>'.repeat(LOGGER_EDGE_WIDTH));
        console.log(content);
        console.log('<'.repeat(LOGGER_EDGE_WIDTH)+'\n');
    }
    else
    {
        const title = arguments[0]
        const content = arguments[1]

        console.log(`${title} ${'>'.repeat(LOGGER_EDGE_WIDTH - title.length - 1)}`);
        console.log(content);
        console.log('<'.repeat(LOGGER_EDGE_WIDTH)+'\n');
    }
}

export type Sslogger = typeof sslogger

export default sslogger
