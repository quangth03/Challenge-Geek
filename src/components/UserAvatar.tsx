import { Avatar } from "antd";

export const UserAvatar = ({ name }: { name: string }) => {
    const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
    return <Avatar src={url} alt={name} />;
};
