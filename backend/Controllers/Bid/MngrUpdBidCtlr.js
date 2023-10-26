import { Prisma } from "@prisma/client";

export default class MngrUpdBidController {
    constructor(prisma, req, res) {
        this.prisma = prisma;
        this.req = req;
        this.res = res;
    }

    async updateBid(
        bidId,
        accountId,
        profileId,
    ) {
        try {
            const updateBid = await this.prisma.Workslots.update({
                where: {
                    bidId: Number(bidId),
                },
                data: {
                    accountId : accountId,
                    profileId : profileId,
                },
            });

            // 200 OK.
            this.res.status(200).send({ message: "Workslot updated successfully." });
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2025")
                    this.res.status(500).send({ message: "Record to update not found." });
            } else {
                // 500 INTERNAL SERVER ERROR
                console.log(err);
                this.res.status(500).send({ message: "Internal Server Error." });
            }
        }
    }
}
