import { Link, useSearchParams } from "react-router-dom";
import { Episode, useGetEpisodesQuery } from "../../generated/graphql";
import {
  Card,
  CardGrid,
  CardText,
  CardTitle,
  Container,
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

  if (!episodes.length) {
    return <div>No episodes found</div>;
  }

  return (
    <Container>
      <CardGrid>
        {episodes.map((episode) => (
          <Link
            to={`/episodes/${episode.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            key={episode.id}
          >
            <Card>
              <CardTitle>{episode.name}</CardTitle>
              <CardText>{episode.air_date}</CardText>
              <CardText>{episode.episode}</CardText>
            </Card>
          </Link>
        ))}
      </CardGrid>

      <Pagination pageInfo={pageInfo} onPageChange={onPageChange} />
    </Container>
  );
};
