import styled from "styled-components";
import { Layout } from "antd";

/**
 * An ANTD layout component that fits the height of the container it is in.
 */
export const FullHeight = styled(Layout)`
	height: 100%;
`;

export const SiderWithBorder = styled(FullHeight.Sider)`
	border-right: 1px solid #f0f0f0;
`;

/**
 * A container element for padding and such.
 */
export const Container = styled.div<{ padding?: number }>`
	padding: ${(props): string => `${(props.padding || 0).toString()}rem`};
`;
