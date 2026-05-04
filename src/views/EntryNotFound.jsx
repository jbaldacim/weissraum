import { useRouteError } from "react-router-dom";
import Container from "../components/Layout/Container";
import BackButton from "../components/Nav/BackButton";
import { Heading } from "../components/Typography/Text";

function EntryNotFound() {
  const error = useRouteError();

  return (
    <Container>
      <BackButton />
      <Heading>
        {error?.status === 404 ? "Entry not found." : "Something went wrong."}
      </Heading>
    </Container>
  );
}

export default EntryNotFound;
