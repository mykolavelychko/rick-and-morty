import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useGetCharacterQuery } from "../../generated/graphql";
import {
  Container,
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../shared/styles";

export const Character = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useGetCharacterQuery({
    variables: { id: id ?? "" },
  });

  if (loading) {
    return <div>Loading...</div>; // TODO: localization
  }

  if (error) {
    return <div>Error loading character details</div>;
  }

  const character = data?.character;

  if (!character) {
    return <div>No character found</div>;
  }

  return (
    <Container>
      <h1>{character.name}</h1>
      <p>
        <strong>Status:</strong> {character.status}
      </p>
      <p>
        <strong>Species:</strong> {character.species}
      </p>
      <p>
        <strong>Type:</strong> {character.type}
      </p>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Origin:</strong> {character.origin?.name}
      </p>
      <p>
        <strong>Location:</strong> {character.location?.name}
      </p>
      <img src={character.image as string} alt={character.name as string} />
      <h2>Episodes</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {character.episode.map((episode) => (
            <Fragment key={episode?.id}>
              <TableRow>
                <TableCell>{episode?.name}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
