import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetEpisodeQuery } from "../../generated/graphql";
import {
  Container,
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../shared/styles";

export const Episode = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useGetEpisodeQuery({
    variables: { id: id ?? "" },
  });

  if (loading) {
    return <div>Loading...</div>; // TODO: localization
  }

  if (error) {
    return <div>Error loading episode details</div>;
  }

  const episode = data?.episode;

  if (!episode) {
    return <div>No episode found</div>;
  }

  return (
    <Container>
      <h1>{episode.name}</h1>
      <p>
        <strong>Air Date:</strong> {episode.air_date}
      </p>
      <p>
        <strong>Episode Code:</strong> {episode.episode}
      </p>
      <h2>Characters</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {episode.characters.map((character) => (
            <Fragment key={character?.id}>
              <TableRow>
                <TableCell>
                  <Link to={`/character/${character?.id}`}>
                    {character?.name}
                  </Link>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
