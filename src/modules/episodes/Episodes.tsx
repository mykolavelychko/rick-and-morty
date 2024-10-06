import { Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Episode, useGetEpisodesQuery } from "../../generated/graphql";
import {
  Container,
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../shared/styles";
import Pagination from "../../shared/pagination/Pagination";

export const Episodes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { data, loading, error } = useGetEpisodesQuery({
    variables: { page },
  });

  const episodes = (data?.episodes?.results || []).filter(
    (episode): episode is Episode => episode !== null
  );
  const pageInfo = {
    prev: data?.episodes?.info?.prev ?? undefined,
    next: data?.episodes?.info?.next ?? undefined,
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
            <TableHeaderCell>Air date</TableHeaderCell>
            <TableHeaderCell>Code</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {episodes.map((episode) => (
            <Fragment key={episode.id}>
              <TableRow>
                <TableCell>
                  <Link to={`/episode/${episode?.id}`}>{episode?.name}</Link>
                </TableCell>
                <TableCell>{episode.air_date}</TableCell>
                <TableCell>{episode.episode}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </tbody>
      </Table>

      <Pagination pageInfo={pageInfo} onPageChange={onPageChange} />
    </Container>
  );
};
