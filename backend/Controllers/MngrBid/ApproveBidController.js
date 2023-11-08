import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";

export default class ApproveBidController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async approveBid(bidId) {
    try {
      const bids = new Bids(this.prisma);
      const approvedBid = await bids.approveBid(bidId);

      // 201 Created
      this.res.status(201).json(approvedBid); 
    } catch ({ message }) {
        this.res.status(500).send({ message });
      }
    }
  }

