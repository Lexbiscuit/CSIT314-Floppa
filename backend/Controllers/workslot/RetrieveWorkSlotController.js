import { Prisma } from "@prisma/client";

export default class RetrieveWorkslotController {
    constructor(prisma, req, res) {
        this.prisma = prisma;
        this.req = req;
        this.res = res;
    }

    async retrieve() {
        try {
            const retrieveWorkslot = await this.prisma.Workslots.findMany({
                orderBy: [
                    {
                        WorkslotId: "asc",
                    },
                ],
            });

            // 200 OK
            this.res.status(200).json(retrieveWorkslot);
        } catch (err) {
            console.error(err);

            // 500 INTERNAL SERVER ERROR
            this.res.status(500).send("Internal Server Error.");
        }
    }
}
