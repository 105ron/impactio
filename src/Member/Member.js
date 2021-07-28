/* eslint-disable react/jsx-filename-extension */
import {
  Avatar, Card, Divider, List, Typography,
} from 'antd';
import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const { Meta } = Card;

const MEMBER = (id) => gql`
  query 
    { user(id:${id}) {
      avatarImage,
      bio,
      dateJoined,
      firstName,
      id,
      lastName,
      role,
      skills,
    }
  }
`;

function Member() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(MEMBER(id));
  // eslint-disable-next-line react/prop-types
  const CustomCard = ({ children }) => (
    <Card
      extra={<Link to="/members">&#60;-Go Back</Link>}
      style={{
        width: '80%', margin: '16px auto', maxWidth: '600px', minHeight: '300px',
      }}
      loading={loading}
    >
      {children}
    </Card>
  );
  if (!data) return (<CustomCard />);
  if (error) return (<div>error</div>);
  const {
    avatarImage,
    bio,
    dateJoined,
    firstName,
    lastName,
    role,
    skills,
  } = data?.user;
  return (
    <>
      <CustomCard>
        <Meta
          avatar={
            <Avatar src={avatarImage} />
          }
          title={`${firstName} ${lastName}`}
          description={`Member since ${new Date(parseInt(dateJoined, 10)).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}`}
        />
        <Divider orientation="left">Role</Divider>
        <h2>
          {role}
        </h2>
        <Divider orientation="left">Skills</Divider>
        { skills && (
          <List
            bordered
            dataSource={skills}
            renderItem={(skill) => (
              <List.Item>
                <Typography.Text mark>
                  {skill}
                </Typography.Text>
              </List.Item>
            )}
          />
        )}
        <Divider orientation="left">Bio</Divider>
        <p>
          {bio}
        </p>
      </CustomCard>
    </>
  );
}

export default Member;
