import client from "../libs/prismadb";
import getCurrentUser from "./getCurrentUsers";

export default async function getFavoriteListing() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favorites = await client?.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites;
  } catch (ex: any) {
    throw new Error(ex);
  }
}
