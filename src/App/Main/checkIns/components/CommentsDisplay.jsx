import React, { useEffect, useState, useContext } from "react";
import { Input, Button, Feed, Accordion } from "semantic-ui-react";
import CheckInContext from "../context/checkInContext";
import AppContext from "../../context/appContext";
import Spinner from "../../components/Spinner";
import { DateTime } from "luxon";

const CommentsDisplay = ({ checkInId }) => {
  const [comment, setComment] = useState("");

  const {
    commentary,
    commentaryLoading,
    getCommentary,
    commentaryId,
    addComment,
  } = useContext(CheckInContext);
  const { apiUsers, usersLoading, getAllUsers } = useContext(AppContext);

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
                {commentary?.map(({ id, comment, date, userId }, i) => {
                  userId = apiUsers.find((u) => u.id === userId)?.name;
                  return (
                    id && (
                      <Feed.Event key={i}>
                        <Feed.Content style={{ padding: 0, paddingLeft: 10 }}>
                          <Feed.Summary>{comment}</Feed.Summary>
                          <Feed.Summary>
                            <Feed.Date>
                              {`${userId} - ${DateTime.fromISO(
                                date
                              ).toRelative()} (${DateTime.fromISO(
                                date
                              ).toFormat("M/d/yy h:mm a")})`}
                            </Feed.Date>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    )
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
                      addComment({ checkInId, comment });
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

export default CommentsDisplay;
