import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetLocationQuery } from "../../generated/graphql";
import { Container } from "../../shared/styles";

export const Location = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useGetLocationQuery({
    variables: { id: id ?? "" },
  });

  if (loading) {
    return <div>Loading...</div>; // TODO: localization
  }

  if (error) {
    return <div>Error loading location details</div>;
  }

  const location = data?.location;

  if (!location) {
    return <div>No location found</div>;
  }

  return (
    <Container>
      <h1>{location.name}</h1>
      <p>
        <strong>Type:</strong> {location.type}
      </p>
      <p>
        <strong>Dimension:</strong> {location.dimension}
      </p>
      <h2>Residents:</h2>
      {location.residents.map((character, index) => (
        <Fragment key={character?.id}>
          <Link to={`/characters/${character?.id}`}>{character?.name}</Link>
          {index < location.residents.length - 1 && ", "}
        </Fragment>
      ))}
    </Container>
  );
};
