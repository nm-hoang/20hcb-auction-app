import React, { useEffect } from 'react';
import {
  Button,
  Col, PageHeader, Row, Tabs, Tag,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCurrentUserFromLocalStorage } from '../../../helpers/auth';
import { Account, CurrentUser } from '../../../types/accountType';
import UserRequests from '../tabs/UserRequests';
import { getMe, selectGetMe } from '../../auth/authSlice';

const { TabPane } = Tabs;

function UserProfilePage(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser: CurrentUser = getCurrentUserFromLocalStorage();
  const currentUserDetails: Account | undefined = useSelector(selectGetMe);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  const handleClickEditProfile = () => {
    history.push('/profile/modify');
  };

  const handleClickChangePassword = () => {
    history.push('/profile/password/modify');
  };

  const tabs = [
    {
      name: 'Requests',
      key: 'requests',
      component: <UserRequests />,
    },
    {
      name: 'Bid History',
      key: 'bid-history',
      component: <></>,
    },
    {
      name: 'Favorites',
      key: 'favorites',
      component: <></>,
    },
  ];

  const Footer: JSX.Element = (
    <Tabs defaultActiveKey={tabs[0].key}>
      {tabs.map((tab) => (
        <TabPane tab={tab.name} key={tab.key}>
          {tab.component}
        </TabPane>
      ))}
    </Tabs>
  );

  return (
    <>
      <Row>
        <Col span={24}>
          <PageHeader
            onBack={() => window.history.back()}
            title={currentUser.fullName}
            avatar={{ src: currentUser.profilePicture.secureUrl }}
            subTitle={currentUser.username.substr(currentUser.username.length - 4)}
            tags={<Tag>{currentUserDetails?.role}</Tag>}
            extra={[
              <Button
                key="btn-edit-profile"
                type="ghost"
                onClick={handleClickEditProfile}
              >
                Edit profile
              </Button>,
              <Button
                key="btn-change-password"
                type="ghost"
                onClick={handleClickChangePassword}
              >
                Change password
              </Button>,
            ]}
            footer={Footer}
          />
        </Col>
      </Row>
    </>
  );
}

export default UserProfilePage;
