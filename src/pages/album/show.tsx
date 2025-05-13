import { useShow, useOne, useList } from "@refinedev/core";
import { Typography, Space, Image, Card, Divider } from "antd";
import { UserAvatar } from "../../components/UserAvatar";
import { useParams, useNavigate } from "react-router-dom";
import { Show } from "@refinedev/antd";

export const AlbumShow = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { queryResult } = useShow();
    const { data: album } = queryResult;
    const albumData = album?.data;

    const { data: userData } = useOne({
        resource: "users",
        id: albumData?.userId || "",
        queryOptions: { enabled: !!albumData?.userId },
    });

    const { data: photosData } = useList({
        resource: "photos",
        filters: [{ field: "albumId", operator: "eq", value: id }],
    });

    return (
        <Show>
            <Card>
                <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                >
                    {userData?.data && (
                        <Space
                            onClick={() => navigate(`/users/${userData.data.id}`)}
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <UserAvatar name={userData.data.name} />
                            <div>
                                <Typography.Text strong style={{ fontSize: 16 }}>
                                    {userData.data.name}
                                </Typography.Text>
                                <br />
                                <Typography.Link href={`mailto:${userData.data.email}`}>
                                    {userData.data.email}
                                </Typography.Link>
                            </div>
                        </Space>
                    )}
                    <Divider />
                    <Typography.Title level={4} style={{ marginBottom: 0 }}>
                        {albumData?.title}
                    </Typography.Title>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", alignItems: "center" }}>
                        {photosData?.data?.map((photo: any) => (
                            <a
                                key={photo.id}
                                href={photo.url}
                                rel="noopener noreferrer"
                            >
                                <Image
                                    width={150}
                                    src={photo.thumbnailUrl}
                                    alt={photo.title}
                                />
                            </a>
                        ))}
                    </div>
                </Space>
            </Card>
        </Show>
    );
};
