import { useShow, useList } from "@refinedev/core";
import { Typography, Space, Button, Divider, Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { UserAvatar } from "../../components/UserAvatar";
import { Show, ShowButton } from "@refinedev/antd";
import { Table } from "antd"; // nhớ import

export const UserShow = () => {
    const { queryResult } = useShow();
    const { data: user } = queryResult;
    const userData = user?.data;
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: albumsData } = useList({
        resource: "albums",
        filters: [{ field: "userId", operator: "eq", value: id }],
    });

    return (
        <Show>
            <Card>
                <Space direction="vertical" style={{ width: "100%" }}>
                    {userData && (
                        <Space>
                            <UserAvatar name={userData.name} />
                            <div>
                                <div>
                                    <strong>{userData.name}</strong>
                                </div>
                                <div>
                                    <a href={`mailto:${userData.email}`}>{userData.email}</a>
                                </div>
                            </div>
                        </Space>
                    )}
                    <Divider />
                    <Typography.Title level={4}>Albums</Typography.Title>
                    <Table
                        dataSource={albumsData?.data || []}
                        rowKey="id"
                        pagination={false}
                    >
                        <Table.Column title="ID" dataIndex="id" key="id" />
                        <Table.Column title="Title" dataIndex="title" key="title" />
                        <Table.Column
                            title="Actions"
                            key="actions"
                            render={(_, record: any) => (
                                <ShowButton size="small" onClick={() => navigate(`/albums/${record.id}`)}>
                                </ShowButton>
                            )}
                        />
                    </Table>
                </Space>
            </Card>
        </Show>
    );
};
