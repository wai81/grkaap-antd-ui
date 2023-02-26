import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  HttpError,
  useNavigation,
} from "@pankod/refine-core";
import {
  useTable,
  List,
  Table,
  Space,
  EditButton,
  getDefaultSortOrder,
  DateField,
  BooleanField,
  MarkdownField,
  useDrawerForm,
} from "@pankod/refine-antd";
import {
  IOrganization,
  IOrganizationCreate,
  IOrganizationUpdate,
} from "interfaces/IOrganization";
import { CreateOrganization, EditOrganization } from "components/organizaiton";

export const OrganizationList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { tableProps, sorter } = useTable<IOrganization, HttpError>({
    syncWithLocation: true,
  });
  const { show } = useNavigation();

  const {
    drawerProps: createDrawerProps,
    formProps: createFormProps,
    saveButtonProps: createSaveButtonProps,
    show: createShow,
  } = useDrawerForm<IOrganizationCreate>({
    action: "create",
    resource: "organizations",
    redirect: false,
  });

  const {
    drawerProps: editDrawerProps,
    formProps: editFormProps,
    saveButtonProps: editSaveButtonProps,
    show: editShow,
    id,
  } = useDrawerForm<IOrganizationUpdate>({
    action: "edit",
    resource: "organizations",
    redirect: false,
  });

  return (
    <div>
      <List
        createButtonProps={{
          onClick: () => {
            createShow();
          },
        }}
      >
        <Table
          {...tableProps}
          rowKey="id"
          onRow={(record) => {
            return {
              onClick: () => {
                show("organizations", record.id);
              },
            };
          }}
        >
          <Table.Column
            dataIndex={["is_active"]}
            title={t("organizations.fields.is_active")}
            render={(value: any) => <BooleanField value={value} />}
            defaultSortOrder={getDefaultSortOrder("is_active", sorter)}
            sorter
          />

          <Table.Column
            dataIndex="id"
            title={t("organizations.fields.id")}
            defaultSortOrder={getDefaultSortOrder("id", sorter)}
            sorter
          />

          <Table.Column
            dataIndex="title"
            title={t("organizations.fields.title")}
            defaultSortOrder={getDefaultSortOrder("title", sorter)}
            sorter
          />

          <Table.Column
            dataIndex="fullname"
            title={t("organizations.fields.fullname")}
            render={(value: any) => (
              <MarkdownField value={value.slice(0, 60) + "..."} />
            )}
          />
          <Table.Column
            dataIndex={["created_at"]}
            title={t("organizations.fields.created_at")}
            render={(value: any) => (
              <DateField value={value} format={"DD.MM.YYYY"} />
            )}
            defaultSortOrder={getDefaultSortOrder("created_at", sorter)}
            sorter
          />

          <Table.Column
            title={t("table.actions")}
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => editShow(record.id)}
                />
                {/* <ShowButton hideText size="small" recordItemId={record.id} /> */}
              </Space>
            )}
          />
        </Table>
      </List>
      <CreateOrganization
        drawerProps={createDrawerProps}
        formProps={createFormProps}
        saveButtonProps={createSaveButtonProps}
      />
      <EditOrganization
        drawerProps={editDrawerProps}
        formProps={editFormProps}
        saveButtonProps={editSaveButtonProps}
        recordItemId={id}
      />
    </div>
  );
};
