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
import { useNavigate } from "react-router-dom";

export const Episodes = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data, loading, error } = useGetEpisodesQuery({
    variables: { page },
  });

  const episodes = (data?.episodes?.results || []).filter(
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
          {episodes.map((episode) => (
            <Fragment key={episode.id}>
              <TableRow onClick={() => navigate(`/episode/${episode.id}`)}>
                <TableCell>{episode.name}</TableCell>
                <TableCell>{episode.air_date}</TableCell>
                <TableCell>{episode.episode}</TableCell>
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
