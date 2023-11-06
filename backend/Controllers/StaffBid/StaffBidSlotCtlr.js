import { Prisma } from "@prisma/client";
import Staffbid from "../../Entity/StaffBids.mjs";

export default class CreateBidController {
    constructor(prisma, req, res) {
        this.prisma = prisma;
        this.req = req;
        this.res = res;
    }

    async createBid(StaffBids) {
        try {
            const bids = new Staffbid(this.prisma);
            const response = await bids.createBid(StaffBids);

            // 201 Created
            this.res.status(201).json(response);
        } catch (message) {
            this.res.status(500).send({ message });
        }
    }
}
