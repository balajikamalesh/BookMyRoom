import client from "../libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingBtId(params: IParams) {
  try {
    const { listingId } = params;
    const listing = await client.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return listing;
  } catch (ex: any) {
    throw new Error(ex);
  }
}
