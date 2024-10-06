/**
 * Component to display detailed information about a specific character from the Rick and Morty series.
 * 
 * This component fetches character data based on the `id` parameter from the URL and displays various
 * details such as name, status, species, gender, origin, current location, image, and episodes the character
 * has appeared in.
 * 
 * @component
 * 
 * @example
 * ```tsx
 * <Route path="/characters/:id" component={Character} />
 * ```
 * 
 * @returns {JSX.Element} A React component that displays character details.
 * 
 * @remarks
 * - Uses `useParams` from `react-router-dom` to extract the character ID from the URL.
 * - Uses `useGetCharacterQuery` from the generated GraphQL hooks to fetch character data.
 * - Displays loading and error states appropriately.
 * - Links to the character's origin and current location, as well as episodes they appear in.
 * 
 * @see {@link https://rickandmortyapi.com/documentation | Rick and Morty API Documentation}
 */
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCharacterQuery } from "../../generated/graphql";
import { Container } from "../../shared/styles";

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
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Origin:</strong>{" "}
        <Link to={`/locations/${character.origin?.id}`}>
          {character.origin?.name}
        </Link>
      </p>
      <p>
        <strong>Location:</strong>{" "}
        <Link to={`/locations/${character.location?.id}`}>
          {character.location?.name}
        </Link>
      </p>
      <img src={character.image as string} alt={character.name as string} />
      <h2>Episodes: </h2>
      {character.episode.map((episode, index) => (
        <Fragment key={episode?.id}>
          <Link to={`/episodes/${episode?.id}`}>{episode?.name}</Link>
          {index < character.episode.length - 1 && ", "}
        </Fragment>
      ))}
    </Container>
  );
};
