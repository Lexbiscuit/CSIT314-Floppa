import { Prisma } from "@prisma/client";

export default class RetrieveWorkSlotController {
    constructor(prisma, req, res) {
        this.prisma = prisma;
        this.req = req;
        this.res = res;
    }

    async retrieve() {
        try {
            const retrieveWorkSlot = await this.prisma.WorkSlot.findMany({
                orderBy: [
                    {
                        WorkSlotId: "asc",
                    },
                ],
            });

            // 200 OK
            this.res.status(200).json(retrieveWorkSlot);
        } catch (err) {
            console.error(err);

            // 500 INTERNAL SERVER ERROR
            this.res.status(500).send("Internal Server Error.");
        }
    }
}
