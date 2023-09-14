import {Router} from "express";
import {securityDeviceController} from "../container";


export const securityDeviceRouter = Router({})

securityDeviceRouter.get('/', securityDeviceController.getDevice.bind(securityDeviceController))

securityDeviceRouter.delete('/', securityDeviceController.deleteDevice.bind(securityDeviceController))

securityDeviceRouter.delete('/:deviceId', securityDeviceController.deleteDeviceId.bind(securityDeviceController))
