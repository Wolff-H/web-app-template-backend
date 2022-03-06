function constructResponse(content: any = null, status: 'succeeded'|'failed' = 'succeeded')
{
    const response =
    {
        content: content,
    }

    if(status === 'succeeded')
    {
        response['if_succeeded'] = true
    }
    else if(status === 'failed')
    {
        response['if_failed'] = true;
    }

    return response
}

export default
{
    constructResponse,
}

export
{
    constructResponse,
}