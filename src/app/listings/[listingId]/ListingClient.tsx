"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Listing, Reservation, User } from "@prisma/client";

import Container from "../../components/Container";
import useLoginModal from "../../hooks/useLoginModal";
import { categories } from "../../components/navbar/Categories";
import ListingHead from "../../components/listings/ListingHead";
import ListingInfo from "../../components/listings/ListingInfo";
import ListingReservation from "../../components/listings/ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: Reservation[];
  listing:
    | (Listing & {
        user: User | null;
      })
    | null;
  currentUser: User | null;
}

const ListingClient = ({
  reservations = [],
  listing,
  currentUser,
}: ListingClientProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing?.Price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post("/api/reservation", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Reservation Created!");
        setDateRange(initialDateRange);
        //redirect to trips
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing, router, currentUser, loginModal]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((x) => x.label == listing?.Category);
  }, [listing]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing?.Price) {
        setTotalPrice(dayCount * listing.Price);
      }
    }
  }, [dateRange, listing]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing?.title || ""}
            imageSrc={listing?.imageSrc || ""}
            locationValue={listing?.locationValue || ""}
            id={listing?.id || ""}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing?.user}
              category={category}
              description={listing?.description}
              roomCount={listing?.roomCount}
              locationValue={listing?.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing?.Price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
