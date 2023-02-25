import React from "react";
import { IResourceComponentsProps, useShow } from "@pankod/refine-core";
import {
    Show,
    Typography,
    NumberField,
    TextField,
    DateField,
    BooleanField,
} from "@pankod/refine-antd";

const { Title } = Typography;

export const OrganizationShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Title</Title>
            <TextField value={record?.title} />
            <Title level={5}>Fullname</Title>
            <TextField value={record?.fullname} />
            <Title level={5}>Created At</Title>
            <DateField value={record?.created_at} format={'DD.MM.YYYY'}/>
            <Title level={5}>Is Active</Title>
            <BooleanField value={record?.is_active} />
        </Show>
    );
};
