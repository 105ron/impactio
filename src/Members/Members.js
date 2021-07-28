/* eslint-disable react/jsx-filename-extension */
import { Avatar, Card } from 'antd';
import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const MEMBERS = gql`
  query 
    { users {
      avatarImage,
      dateJoined,
      id,
      firstName,
      lastName,
    }
  }
`;

function Members() {
  const { data, error, loading } = useQuery(MEMBERS);

  if (error) {
    return <div>error</div>;
  }
  // Some dummy data to make the loading screen fill
  const users = data?.users || [{ id: 12 }, { id: 13 }, { id: 14 }];
  return (
    <>
      <h1 style={{ textAlign: 'center', padding: '30px 0' }}>
        View Members
      </h1>
      {users.map(({
        avatarImage, dateJoined, id, firstName, lastName,
      }) => (
        <Link key={id} to={`/member/${id}`}>
          <Card hoverable style={{ width: '80%', margin: '16px auto', maxWidth: '600px' }} loading={loading}>
            <Meta
              avatar={
                <Avatar src={avatarImage} />
              }
              title={`${firstName} ${lastName}`}
              description={`Member since ${new Date(parseInt(dateJoined, 10)).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}`}
            />
          </Card>
        </Link>
      ))}
    </>
  );
}

export default Members;
