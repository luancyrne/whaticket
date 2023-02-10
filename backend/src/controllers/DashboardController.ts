import { Request, Response } from "express";

import ListTicketsDashboard from "../services/ListTicketsDashboard/ListTicketsDashboard";


type IndexQuery = {
  searchParam: string;
  pageNumber: string;
  status: string;
  date: string;
  updatedAt?: string;
  showAll: string;
  withUnreadMessages: string;
  queueIds: string;
  tags: string;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const {
    pageNumber,
    status,
    date,
    updatedAt,
    searchParam,
    showAll,
    queueIds: queueIdsStringified,
    tags: tagIdsStringified,
    withUnreadMessages
  } = req.query as IndexQuery;

  const userId = req.user.id;

  let queueIds: number[] = [];
  let tagsIds: number[] = [];

  if (queueIdsStringified) {
    queueIds = JSON.parse(queueIdsStringified);
  }

  if (tagIdsStringified) {
    tagsIds = JSON.parse(tagIdsStringified);
  }

  const { tickets, count, hasMore } = await ListTicketsDashboard({
    searchParam,
    tags: tagsIds,
    pageNumber,
    status,
    date,
    updatedAt,
    showAll,
    userId,
    queueIds,
    withUnreadMessages
  });

  return res.status(200).json({ tickets, count, hasMore });
};