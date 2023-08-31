import {Request} from "express";

export const pagination = (req: Request) => {

  const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1
  const pageSize = req.query.pageSize ? +req.query.pageSize : 10
  const sortDirection =req.query.sortDirection && req.query.sortDirection === 'asc' ? 'asc' : 'desc'
  const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
  const searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm.toString() : ''

  return {pageNumber, pageSize, sortDirection, sortBy, searchNameTerm}

}