import { Prisma } from "@prisma/client";

export default class MngrRtrvStaffSlotCtrl {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async viewStaffWithSlot() {
    try {
      const staffWithAssignedWorkSlots = await this.prisma.Staff.findMany({
        where: {
          // Modify the condition to filter staff with assigned work slots.
          // You need to have a relation between staff and work slots in your database.
          workslots: {
            some: {
              // Define the condition that indicates a work slot is assigned to the staff.
              // For example, you might check if a staff ID is associated with a work slot.
              // Adjust this condition to match your schema.
              staffId: {
                not: null,
              },
            },
          },
        },
      });
      this.res.status(200).json(staffWithAssignedWorkSlots);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      console.log(err);
      this.res.status(500).send({ message: "Internal Server Error." });
    }
  }
}
