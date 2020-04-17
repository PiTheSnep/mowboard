import * as React from "react";

import { Table, Empty } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FullHeight, Container } from "~/components";

/**
 * The table columns
 */
const INFRACTION_TABLE_COLUMNS: ColumnsType<{}> = [
	{
		title: "Infraction ID",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "User",
		dataIndex: "user",
		key: "user",
	},
	{
		title: "Moderator",
		dataIndex: "moderator",
		key: "moderator",
	},
	{
		title: "Active",
		dataIndex: "active",
		key: "active",
	},
];

export const InfractionHistory = (): JSX.Element => (
	<FullHeight>
		<FullHeight>
			<FullHeight.Content>
				<Table
					emptyText="No past infractions."
					columns={INFRACTION_TABLE_COLUMNS}
					rowSelection={{ type: "checkbox" }}
				></Table>
			</FullHeight.Content>
		</FullHeight>
		<FullHeight.Sider color="#ffffff" width={400}>
			<Container padding={1}>
				<Card>
					<Empty description="Select an infraction."></Empty>
				</Card>
			</Container>
		</FullHeight.Sider>
	</FullHeight>
);
