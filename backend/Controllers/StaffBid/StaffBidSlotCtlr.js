import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";

export default class StaffBidSlotCtlr {
    constructor(prisma, req, res) {
        this.prisma = prisma;
        this.req = req;
        this.res = res;
    }

    async createBid(Bids) {
        try {
            const bids = new Staffbid(this.prisma);
            const response = await bids.createBid(Bids);

            // 201 Created
            this.res.status(201).json(response);
        } catch (message) {
            console.log(message);
            this.res.status(500).send({ message });
        }
    }
}
