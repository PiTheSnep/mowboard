import * as React from 'react';
import { Container, PageHeader } from '~/components';
import { Tabs } from 'antd';
import { GuildSettings } from './GuildSettings';

const { TabPane } = Tabs;

interface GuildProps {
  name: string;
}

/**
 * The guild page layout.
 * @param props
 */
export const Guild = (props: GuildProps): JSX.Element => (
  <Container>
    <PageHeader
      onBack={(): void => window.history.back()}
      title={props.name}
      avatar={{ src: 'https://api.adorable.io/avatars/128/.png' }}
      theme="dark"
      footer={
        <Tabs defaultActiveKey="1">
          <TabPane tab="Info" key="1"></TabPane>
          <TabPane tab="History" key="2"></TabPane>
          <TabPane tab="Settings" key="3"></TabPane>
        </Tabs>
      }
    ></PageHeader>
    <GuildSettings></GuildSettings>
  </Container>
);
