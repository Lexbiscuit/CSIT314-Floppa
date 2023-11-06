import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";

export default class StffDltBidSlotCtlr{
    constructor(prisma, req, res) {
        this.prisma = prisma;
        this.req = req;
        this.res = res;
      }

    async deleteBidSlot(bidId){
        try{
        const bids = new Bids(this.prisma);
        const response = await bids.deleteBidSlot(bidId);

        // 200 OK.
      this.res.status(200).json(response);
        }
        catch(message){
            this.res.status(500).send({ message });
        }

    }
}