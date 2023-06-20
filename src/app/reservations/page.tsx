import ReservationsClient from "./ReservationsClient";

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUsers";
import getReservations from "../actions/getReservations";
import { Listing, Reservation } from "@prisma/client";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }

  //get reservations that other people have made on our listing
  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your property"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={
          reservations as (Reservation & {
            Listing: Listing;
          })[]
        }
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
