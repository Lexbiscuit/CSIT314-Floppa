import { response } from "express";

export default class Staffbid {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async createBids(staffbid){
        await this.prisma.Staffbid.create({
            data: staffbid,
        });
        return { message: "Your beads have been submitted" }
    }

async retrieveBids(){
        await this.prisma.Staffbid.findMany({
            orderBy: [
                {
                    bidId: "asc",
                },
            ],
        });
        return response;
    }

    async updateBid(bid) {
        const { bidId, ...updateData } = bid;
        const response = await this.prisma.update({
            where: {
                bidId: bidId
            },
            data: updateData
        });

        return { message: "Bid update successfully." };
    }

    async deleteBidSlot(bidId) {
        const response = await this.prisma.delete({
            where: {
                bidId: bidId
            }
        });

        return { message: "Bid delete successfully." };
    
    }
}