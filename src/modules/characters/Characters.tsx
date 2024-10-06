import { Link, useSearchParams } from "react-router-dom";
import { Character, useGetCharactersQuery } from "../../generated/graphql";
import Pagination from "../../shared/pagination/Pagination";
import {
  Card,
  CardGrid,
  CardLink,
  CardText,
  CardTitle,
  Container,
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
      <CardGrid>
        {characters.map((character) => (
          <Link
            to={`/character/${character.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            key={character.id}
          >
            <Card>
              <CardTitle>{character.name}</CardTitle>
              <CardText>{character.species}</CardText>
              <CardText>
                <CardLink
                  to={`/location/${character.location?.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {character.location?.name}
                </CardLink>
              </CardText>
            </Card>
          </Link>
        ))}
      </CardGrid>

      <Pagination pageInfo={pageInfo} onPageChange={onPageChange} />
    </Container>
  );
};
