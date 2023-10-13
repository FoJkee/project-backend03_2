import {jwtService, userService} from "../container";

export const bearerUserIdFromHeaders = async (authorization: string | undefined): Promise<string | null> => {

    if (!authorization) return null

    const token = authorization.split(' ')[1]

    return  jwtService.getUserIdFromAccessToken(token)
}