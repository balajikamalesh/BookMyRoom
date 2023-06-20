import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoriteClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const FavoriteClient = ({ listings, currentUser }: FavoriteClientProps) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of your favorite places" />
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
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser || null}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
