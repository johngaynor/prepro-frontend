import React, { useEffect, useState, useContext } from "react";
import { Input, Button, Feed, Accordion } from "semantic-ui-react";
import AppContext from "../../context/appContext";
import Spinner from "../../components/Spinner";
import { DateTime } from "luxon";
import { connect } from "react-redux";
import { getCommentary, addCommentary } from "../actions";

const PhotosDisplay = ({
  checkInId,
  commentary,
  commentaryLoading,
  commentaryId,
  getCommentary,
  addCommentary,
}) => {
  const [comment, setComment] = useState("");
  const { apiUsers, usersLoading, getAllUsers, user } = useContext(AppContext);

  useEffect(() => {
    if ((!commentary || commentaryId !== checkInId) && !commentaryLoading)
      getCommentary(checkInId);
    if (!apiUsers && !usersLoading) getAllUsers();
  }, [commentary, commentaryId, commentaryLoading, apiUsers, usersLoading]);

  return (
    <Accordion
      fluid
      styled
      defaultActiveIndex={0}
      panels={[
        {
          key: "Commentary",
          title: "Commentary",
          content: (
            <Accordion.Content>
              <Feed>
                {(commentaryLoading || usersLoading) && <Spinner />}
                {commentary?.map(({ comment, date, userId }, i) => {
                  const username = apiUsers?.find((u) => u.id === userId)?.name;
                  const formattedDate = DateTime.fromISO(date, {
                    zone: "utc",
                  }).toLocal();

                  return (
                    <Feed.Event key={i}>
                      <Feed.Content style={{ padding: 0, paddingLeft: 10 }}>
                        <Feed.Summary>{comment}</Feed.Summary>
                        <Feed.Summary>
                          <Feed.Date>
                            {`${username} - ${formattedDate.toRelative()} (${formattedDate.toFormat(
                              "M/d/yy h:mm a"
                            )})`}
                          </Feed.Date>
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  );
                })}
              </Feed>
              <Input
                placeholder="Add a Comment"
                fluid
                value={comment}
                action={
                  <Button
                    color="green"
                    content="Submit"
                    icon="send"
                    onClick={() => {
                      addCommentary({
                        checkInId,
                        comment,
                        date: DateTime.utc().toISO(),
                        userId: user.id,
                      });
                      setComment("");
                    }}
                  />
                }
                onChange={(e, { value }) => setComment(value)}
                style={{ flexGrow: 1, marginRight: 5 }}
              />
            </Accordion.Content>
          ),
        },
      ]}
    />
  );
};

function mapStateToProps(state) {
  return {
    commentary: state.checkIns.commentary,
    commentaryLoading: state.checkIns.commentaryLoading,
    commentaryId: state.checkIns.commentaryId,
  };
}

export default connect(mapStateToProps, { getCommentary, addCommentary })(
  PhotosDisplay
);
