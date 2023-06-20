import ListingClient from "./ListingClient";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import getCurrentUser from "../../actions/getCurrentUsers";
import getListingBtId from "../../actions/getListingById";
import getReservations from "../../actions/getReservations";

interface IParams {
  listingId?: string;
}

const Listing = async ({ params }: { params: IParams }) => {
  const listing = await getListingBtId(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>
    </ClientOnly>
  );
};

export default Listing;
