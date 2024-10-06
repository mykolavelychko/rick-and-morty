import { Fragment, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Character, useGetCharactersQuery } from "../../generated/graphql";
import {
  Container,
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../shared/styles";

export const Characters = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useGetCharactersQuery({
    variables: { page },
  });
  const characters = (data?.characters?.results || []).filter(
    (character): character is Character => character !== null
  );
  const pageInfo = data?.characters?.info || {};

  if (loading) {
    return <div>Loading...</div>; // TODO: localization
  }

  if (error) {
    return <div>Error loading devices</div>;
  }

  return (
    <Container>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Species</TableHeaderCell>
            <TableHeaderCell>Location</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {characters.map((character: Character) => (
            <Fragment key={character.id}>
              <TableRow>
                <TableCell>
                  <Link to={`/character/${character.id}`}>
                    {character.name}
                  </Link>
                </TableCell>
                <TableCell>{character.species}</TableCell>
                <TableCell>
                  <Link to={`/location/${character.location?.id}`}>
                    {character.location?.name}
                  </Link>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </tbody>
      </Table>

      <div>
        <button
          onClick={() => pageInfo?.prev && setPage(pageInfo.prev)}
          disabled={!pageInfo?.prev}
        >
          Previous
        </button>
        <button
          onClick={() => pageInfo?.next && setPage(pageInfo.next)}
          disabled={!pageInfo?.next}
        >
          Next
        </button>
      </div>
    </Container>
  );
};
