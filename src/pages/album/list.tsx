import { ShowButton, useTable } from "@refinedev/antd";
import { Table, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useList } from "@refinedev/core";
import { UserAvatar } from "../../components/UserAvatar";

export const AlbumList = () => {
    const navigate = useNavigate();
    const { tableProps } = useTable();

    const { data: usersData } = useList({ resource: "users" });
    const users = usersData?.data || [];

    const getUser = (userId: number) => users.find((u: any) => u.id === userId);

    return (
        <Table {...tableProps} rowKey="id">
            <Table.Column title="ID" dataIndex="id" />
            <Table.Column title="Title" dataIndex="title" />
            <Table.Column
                title="User"
                render={(_, record: any) => {
                    const user = getUser(record.userId);
                    return user ? (
                        <Space onClick={() => navigate(`/users/${user.id}`)} style={{ cursor: "pointer" }}>
                            <UserAvatar name={user.name} />
                            <span>{user.name}</span>
                        </Space>
                    ) : null;
                }}
            />
            <Table.Column
                title="Actions"
                render={(_, record) => (
                    <ShowButton size="small" onClick={() => navigate(`/albums/${record.id}`)} />
                )}
            />
        </Table>
    );
};
