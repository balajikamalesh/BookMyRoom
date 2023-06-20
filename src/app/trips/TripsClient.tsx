"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Listing, Reservation, User } from "@prisma/client";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  reservations: (Reservation & {
    Listing: Listing | null;
  })[];
  currentUser?: User | null;
}

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservation/${id}`)
        .then(() => {
          toast.success("Reservation Cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went Wrong!");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div
        className="
        mt-10 
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-6
        gap-8"
      >
        {reservations &&
          reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.Listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId == reservation.id}
              currentUser={currentUser || null}
              actionLabel="Cancel Reservation"
            />
          ))}
      </div>
    </Container>
  );
};

export default TripsClient;
