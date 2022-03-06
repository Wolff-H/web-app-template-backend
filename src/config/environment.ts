// environments //
const ENV_LOCAL =
{
    api_path: 'http://localhost:3000/path/to/project-name/v0/local',
} as const

const ENV_DEV =
{
    api_path: 'http://www.myserver.com/path/to/project-name/v0/dev',
} as const

const ENV_PROD =
{
    api_path: 'http://www.myserver.com/path/to/project-name/v0',
} as const

// use //
const ENV = ENV_DEV

/**********************************************************************************************************************/

export default ENV