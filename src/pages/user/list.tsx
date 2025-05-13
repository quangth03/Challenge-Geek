// import {
//   DeleteButton,
//   EditButton,
//   List,
//   ShowButton,
//   useTable,
// } from "@refinedev/antd";
// import type { BaseRecord } from "@refinedev/core";
// import { Space, Table } from "antd";

// export const UserList = () => {
//   const { tableProps } = useTable({
//     syncWithLocation: true,
//   });

//   return (
//     <List>
//       <Table {...tableProps} rowKey="id">
//         <Table.Column dataIndex="id" title={"ID"} />
//         <Table.Column dataIndex="avatar" title={"Avatar"} />
//         <Table.Column dataIndex="name" title={"Name"} />
//         <Table.Column dataIndex="email" title={"Email"} />
//         <Table.Column dataIndex="phone" title={"Phone"} />
//         <Table.Column dataIndex="website" title={"Website"} />

//         <Table.Column
//           title={"Actions"}
//           dataIndex="actions"
//           render={(_, record: BaseRecord) => (
//             <Space>
//               {/* <EditButton hideText size="small" recordItemId={record.id} /> */}
//               <ShowButton  size="small" recordItemId={record.id} />
//               {/* <DeleteButton hideText size="small" recordItemId={record.id} /> */}
//             </Space>
//           )}
//         />
//       </Table>
//     </List>
//   );
// };
// src/pages/user/list.tsx
import { Show, ShowButton, useTable } from "@refinedev/antd";
import { Table, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../../components/UserAvatar";

export const UserList = () => {
    const { tableProps } = useTable();
    const navigate = useNavigate();

    return (
        <Show>
            <Table {...tableProps} rowKey="id">
                <Table.Column title="ID" dataIndex="id" />
                <Table.Column
                    title="Avatar"
                    render={(_, record: any) => <UserAvatar name={record.name} />}
                />
                <Table.Column title="Name" dataIndex="name" />
                <Table.Column
                    title="Email"
                    render={(_, record: any) => (
                        <a href={`mailto:${record.email}`}>{record.email}</a>
                    )}
                />
                <Table.Column
                    title="Phone"
                    render={(_, record: any) => (
                        <a href={`tel:${record.phone}`}>{record.phone}</a>
                    )}
                />
                <Table.Column
                    title="Website"
                    render={(_, record: any) => (
                        <a href={`https://${record.website}`} target="_blank" rel="noopener noreferrer">
                            {record.website}
                        </a>
                    )}
                />
                <Table.Column
                    title="Actions"
                    render={(_, record: any) => (
                        <ShowButton size="small" onClick={() => navigate(`/users/${record.id}`)} />
                    )}
                />
            </Table>
        </Show>
    );
};
