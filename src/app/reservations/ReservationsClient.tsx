"use client";

import axios from "axios";
import { Listing, User } from "@prisma/client";
import { toast } from "react-hot-toast";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { Reservation } from "@prisma/client";
import { useCallback, useState } from "react";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: (Reservation & {
    Listing: Listing | null;
  })[];
  currentUser?: User | null;
}

const ReservationsClient = ({
  reservations,
  currentUser,
}: ReservationsClientProps) => {
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
      <Heading title="Reservations" subtitle="Bookings on your properties" />
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
              actionLabel="Cancel guest reservation"
            />
          ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
