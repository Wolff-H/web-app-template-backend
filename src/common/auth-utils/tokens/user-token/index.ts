import md5 from "md5"



const dictTimeUnitToMilliseconds =
{
    d: 86400000,
    h: 3600000,
    m: 60000,
    s: 1000,
}

function generateUserToken(prefix: string, life: [amount: number, unit: 'd'|'h'|'m'|'s'])
{
    const issued_timestamp = Date.now()
    const expired_timestamp = issued_timestamp + life[0] * dictTimeUnitToMilliseconds[life[1]]

    return [
        prefix + '_' + md5(Date.now().toString()),
        issued_timestamp,
        expired_timestamp,
    ]
}

export default generateUserToken