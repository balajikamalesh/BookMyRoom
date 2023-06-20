import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUsers";
import client from "../../../libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid Id");
  }

  //only the creator of the reservation or the creator of the listing(owner) can cancel a reservation
  const reservation = await client.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { Listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
