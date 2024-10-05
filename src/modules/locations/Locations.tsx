import { Fragment, useState } from "react";
import { Location, useGetLocationsQuery } from "../../generated/graphql";
import {
    Container,
    Table,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from "./Locations.styles";

export const Locations = () => {
  const [page, setPage] = useState<number>(1);
  const { data, loading, error } = useGetLocationsQuery({
    variables: { page },
  });

  const locations = (data?.locations?.results || []).filter(
    (location): location is Location => location !== null
  );
  const pageInfo = data?.locations?.info || {};

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
              <TableRow onClick={() => location.id}>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.type}</TableCell>
                <TableCell>{location.dimension}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </tbody>
      </Table>

      <div>
        <button onClick={() => pageInfo?.prev && setPage(pageInfo.prev)} disabled={!pageInfo?.prev}>
          Previous
        </button>
        <button onClick={() => pageInfo?.next && setPage(pageInfo.next)} disabled={!pageInfo?.next}>
          Next
        </button>
      </div>
    </Container>
  );
};
