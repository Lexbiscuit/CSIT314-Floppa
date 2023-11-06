export default class Staffbid{
    constructor(prisma){
        this.prisma = prisma;
    }

    async updateBid(bid){
        const {bidId, ...updateData} = bid;
        const response = await this.prisma.update({
            where:{
                bidId: bidId
            },
            data: updateData
        });

        return {message : "Bid update successfully."};
    }

    async deleteBidSlot(bidId){
        const response = await this.prisma.delete({
            where:{
                bidId: bidId
            }
        });

        return {message : "Bid delete successfully."};
    }
}