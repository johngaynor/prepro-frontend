import React, { useEffect, useState } from "react";
import { Input, Button, Feed, Accordion } from "semantic-ui-react";
import moment from "moment";

// still needs functionality
const CommentsDisplay = ({ complaintId, addComment }) => {
  const [comment, setComment] = useState("");
  //   useEffect(() => {
  //     if (!issueComments.length && !issueCommentsLoading) getIssueComments(complaintId);
  //   });

  const testComments = [
    {
      id: 1,
      userName: "John Doe",
      commentDate: "2021-08-01T12:00:00",
      noteText: "This is a test comment",
    },
    {
      id: 2,
      userName: "John Doe",
      commentDate: "2021-08-01T12:00:00",
      noteText: "This is a test comment",
    },
    {
      id: 3,
      userName: "John Doe",
      commentDate: "2021-08-01T12:00:00",
      noteText: "This is a test comment",
    },
  ];

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
                {testComments.map(
                  ({ id, noteText, userName, commentDate }, i) =>
                    id && (
                      <Feed.Event key={i}>
                        <Feed.Content style={{ padding: 0, paddingLeft: 10 }}>
                          <Feed.Summary>{noteText}</Feed.Summary>
                          <Feed.Summary>
                            <Feed.Date>
                              {`${userName} - ${moment(
                                commentDate
                              ).fromNow()} (${moment(commentDate).format(
                                "M/D/YY LT"
                              )})`}
                            </Feed.Date>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    )
                )}
              </Feed>
              <Input
                placeholder="Add a Comment"
                fluid
                action={
                  <Button
                    color="green"
                    content="Submit"
                    icon="send"
                    onClick={() => addComment(complaintId, comment)}
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
