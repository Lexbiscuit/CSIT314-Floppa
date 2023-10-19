import { Image, Container, Title, Button, SimpleGrid } from "@mantine/core";
import classes from "../styles/LogoutImage.module.css";

export default function Logout() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image
          src="https://media.tenor.com/OU3zt8yq9vkAAAAC/floppa-wave.gif"
          className={classes.mobileImage}
        />
        <div>
          <Title className={classes.title}>You have been logged out!</Title>
          {/* <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text> */}
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={() => window.location.replace("/")}
          >
            Get back to login page
          </Button>
        </div>
        <Image
          src="https://media.tenor.com/OU3zt8yq9vkAAAAC/floppa-wave.gif"
          className={classes.desktopImage}
        />
      </SimpleGrid>
    </Container>
  );
}
