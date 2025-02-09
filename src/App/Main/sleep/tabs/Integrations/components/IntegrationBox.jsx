import { Grid, Icon, Header, Segment } from "semantic-ui-react";

export function IntegrationBox({
  icon = "code",
  color = "violet",
  title,
  description,
}) {
  return (
    <Segment>
      <Grid columns={2} style={{ height: "60px" }}>
        <Grid.Column width={3} style={{ display: "flex" }}>
          <Icon
            name={icon}
            size="big"
            color={color}
            style={{ height: 50, width: 50 }}
          />
        </Grid.Column>
        <Grid.Column
          width={12}
          style={{
            height: "50px",
            padding: 0,
          }}
        >
          <Header as="h3" style={{ margin: "10px 0 0 0" }}>
            {title}
          </Header>
          <p>{description}</p>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
