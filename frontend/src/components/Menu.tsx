import styled from 'styled-components';
import { Menu as AntMenu, PageHeader as AntPageHeader } from 'antd';

/**
 * An ANTD Menu component that fits the height of the container it is in.
 */
export const Menu = styled(AntMenu)`
  height: 100%;
`;

/**
 * An ANTD PageHeader component with fixed background colour, and a better box-shadow.
 */
export const PageHeader = styled(AntPageHeader)`
  background: white;
  box-shadow: 0 0 5px 2.5px #f0f0f0;
`;
