import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
  const navigate = useNavigate();
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
    return <div>Error loading characters</div>;
  }

  if (!characters.length) {
    return <div>No characters found</div>;
  }

  return (
    <Container>
      <CardGrid>
        {characters.map((character) => (
          <Card
            key={character.id}
            onClick={() => navigate(`/characters/${character.id}`)}
          >
            <CardTitle>{character.name}</CardTitle>
            <CardText>{character.species}</CardText>
            <CardText>
              <CardLink
                to={`/locations/${character.location?.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                {character.location?.name}
              </CardLink>
            </CardText>
          </Card>
        ))}
      </CardGrid>

      <Pagination pageInfo={pageInfo} onPageChange={onPageChange} />
    </Container>
  );
};
