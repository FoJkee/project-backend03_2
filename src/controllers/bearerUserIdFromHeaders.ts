import {jwtService, userService} from "../container";

export const bearerUserIdFromHeaders = async (authorization: string | undefined): Promise<string | null> => {

    if (!authorization) return null

    const token = authorization.split(' ')[1]

    const userId = await jwtService.getUserIdFromAccessToken(token)

    if (!userId) return null

    return userId
}