import { Prisma } from "@prisma/client";

export default class SearchWorkSlotController {
    constructor(prisma, req, res) {
        this.prisma = prisma;
        this.req = req;
        this.res = res;
    }

    async searchWorkslot(workslotId) {
        try {
            const searchWorkslot = await this.prisma.workslots.findUnique({
                where: {
                    workslotId: Number(workslotId),
                },
            });

            // 200 OK
            this.res.status(200).json(searchWorkslot);
        } catch (err) {
            console.error(err);

            // 500 INTERNAL SERVER ERROR
            this.res.status(500).send("Internal Server Error.");
        }
    }
}
