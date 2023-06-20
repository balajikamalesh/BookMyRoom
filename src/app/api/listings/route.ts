import { NextResponse } from "next/server";
import client from "../../libs/prismadb";
import getCurrentUser from "../../actions/getCurrentUsers";
import { request } from "http";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma?.listing.create({
    data: {
      title,
      description,
      imageSrc,
      Category: category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: body.location.label,
      Price: parseInt(body.price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
