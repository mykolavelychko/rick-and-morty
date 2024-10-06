import { Fragment } from "react";

import { Link, useSearchParams } from "react-router-dom";
import { Character, useGetCharactersQuery } from "../../generated/graphql";
import Pagination from "../../shared/pagination/Pagination";
import {
  Container,
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../shared/styles";

export const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { data, loading, error } = useGetCharactersQuery({
    variables: { page },
  });
  const characters = (data?.characters?.results || []).filter(
    (character): character is Character => character !== null
  );
  const pageInfo = {
    prev: data?.characters?.info?.prev ?? undefined,
    next: data?.characters?.info?.next ?? undefined,
  };

  const onPageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

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

      <Pagination pageInfo={pageInfo} onPageChange={onPageChange} />
    </Container>
  );
};
