import { Link, useSearchParams } from "react-router-dom";
import { Location, useGetLocationsQuery } from "../../generated/graphql";
import Pagination from "../../shared/pagination/Pagination";
import {
  Card,
  CardGrid,
  CardText,
  CardTitle,
  Container,
} from "../../shared/styles";

export const Locations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { data, loading, error } = useGetLocationsQuery({
    variables: { page },
  });

  const locations = (data?.locations?.results || []).filter(
    (location): location is Location => location !== null
  );
  const pageInfo = {
    prev: data?.locations?.info?.prev ?? undefined,
    next: data?.locations?.info?.next ?? undefined,
  };

  const onPageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (loading) {
    return <div>Loading...</div>; // TODO: localization
  }

  if (error) {
    return <div>Error loading locations</div>;
  }

  return (
    <Container>
      <CardGrid>
        {locations.map((location) => (
          <Link
            to={`/location/${location.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            key={location.id}
          >
            <Card>
              <CardTitle>{location.name}</CardTitle>
              <CardText>{location.type}</CardText>
              <CardText>{location.dimension}</CardText>
            </Card>
          </Link>
        ))}
      </CardGrid>

      <Pagination pageInfo={pageInfo} onPageChange={onPageChange} />
    </Container>
  );
};
