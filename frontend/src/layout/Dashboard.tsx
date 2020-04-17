import * as React from "react";
import { FullHeight, SiderWithBorder } from "~/components";

const { Content, Footer } = FullHeight;

const guildIcons = [];
for (let i = 0; i < 100; i++) {
	guildIcons.push(<></>);
}

export const Dashboard = (props: any): JSX.Element => (
	<FullHeight>
		<SiderWithBorder
			theme="dark"
			width={72}
			style={{ padding: 8 }}
		></SiderWithBorder>
		<FullHeight>
			<Content>{props.children}</Content>
			<Footer></Footer>
		</FullHeight>
	</FullHeight>
);
