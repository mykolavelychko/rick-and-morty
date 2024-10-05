import { Fragment, useState } from "react";
import { Episode, useGetEpisodesQuery } from "../../generated/graphql";
import {
  Container,
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../shared/styles";

export const Episodes = () => {
  const [page, setPage] = useState<number>(1);
  const { data, loading, error } = useGetEpisodesQuery({
    variables: { page },
  });

  const locations = (data?.episodes?.results || []).filter(
    (episode): episode is Episode => episode !== null
  );
  const pageInfo = data?.episodes?.info || {};

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
            <TableHeaderCell>Air date</TableHeaderCell>
            <TableHeaderCell>Code</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {locations.map((location) => (
            <Fragment key={location.id}>
              <TableRow onClick={() => location.id}>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.air_date}</TableCell>
                <TableCell>{location.episode}</TableCell>
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
