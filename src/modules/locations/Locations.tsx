import { Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Location, useGetLocationsQuery } from "../../generated/graphql";
import Pagination from "../../shared/pagination/Pagination";
import {
  Container,
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Dimension</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {locations.map((location) => (
            <Fragment key={location.id}>
              <TableRow>
                <TableCell>
                  <Link to={`/location/${location.id}`}>{location.name}</Link>
                </TableCell>
                <TableCell>{location.type}</TableCell>
                <TableCell>{location.dimension}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </tbody>
      </Table>

      <Pagination pageInfo={pageInfo} onPageChange={onPageChange} />
    </Container>
  );
};
