import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  HttpError,
  useTranslate,
  CrudFilters,
} from "@pankod/refine-core";
import {
  useTable,
  List,
  Table,
  Space,
  EditButton,
  ShowButton,
  BooleanField,
  DateField,
  getDefaultSortOrder,
  Row,
  Col,
  Card,
  useDrawerForm,
  useModalForm,
} from "@pankod/refine-antd";
import {
  ICreateSubunit,
  ISubunit,
  ISubunitFilterVariables,
  IUpdateSubunit,
} from "interfaces/ISubunit";
import Filter from "components/subunit/filter";
import { CreateSubunit } from "../../components/subunit/create";
import { EditSubunit } from "components/subunit";

export const SubunitList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { tableProps, sorter, searchFormProps, filters } = useTable<
    ISubunit,
    HttpError,
    ISubunitFilterVariables
  >({
    syncWithLocation: true,
    initialSorter: [
      {
        field: "title",
        order: "asc",
      },
    ],
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, organization, is_active } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q,
      });

      filters.push({
        field: "organization__id__in",
        operator: "eq",
        value: (organization ?? [].length) > 0 ? organization : undefined,
      });

      filters.push({
        field: "is_active",
        operator: "eq",
        value: is_active !== "" ? is_active : undefined,
      });

      return filters;
    },
  });

  const {
    drawerProps: createDrawerProps,
    formProps: createFormProps,
    saveButtonProps: createSaveButtonProps,
    show: createDrawerShow,
  } = useDrawerForm<ICreateSubunit>({
    action: "create",
    resource: "subunits",
    redirect: false,
  });

  const {
    drawerProps: editDrawerProps,
    formProps: editFormProps,
    saveButtonProps: editSaveButtonProps,
    show: editDrawerShow,
    queryResult: queryResult,
    id,
  } = useDrawerForm<IUpdateSubunit>({
    action: "edit",
    resource: "subunits",
    redirect: false,
    warnWhenUnsavedChanges: true,
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xl={6} lg={24} xs={24}>
        <Filter formProps={searchFormProps} filters={filters || []} />
      </Col>
      <Col xl={18} xs={24}>
        <List
          createButtonProps={{
            onClick: () => {
              createDrawerShow();
            },
          }}
        >
          <Table {...tableProps} rowKey="id">
            <Table.Column
              dataIndex={["is_active"]}
              title={t("subunits.fields.is_active")}
              render={(value: any) => <BooleanField value={value} />}
              defaultSortOrder={getDefaultSortOrder("is_active", sorter)}
              sorter
            />
            <Table.Column
              dataIndex="name"
              title={t("subunits.fields.name")}
              defaultSortOrder={getDefaultSortOrder("name", sorter)}
              sorter
            />
            <Table.Column
              dataIndex="title"
              title={t("subunits.fields.title")}
            />

            <Table.Column
              dataIndex="color_subunit"
              title={t("subunits.fields.color_subunit")}
            />
            <Table.Column
              dataIndex={["organization", "title"]}
              title={t("subunits.fields.organization.title")}
            />
            <Table.Column
              dataIndex={["created_at"]}
              title={t("subunits.fields.created_at")}
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
                    onClick={() => editDrawerShow(record.id)}
                  />
                  <ShowButton hideText size="small" recordItemId={record.id} />
                </Space>
              )}
            />
          </Table>
        </List>

        <CreateSubunit
          drawerProps={createDrawerProps}
          formProps={createFormProps}
          saveButtonProps={createSaveButtonProps}
        />
        <EditSubunit
          drawerProps={editDrawerProps}
          formProps={editFormProps}
          saveButtonProps={editSaveButtonProps}
          queryResult={queryResult}
          recordItemId={id}
        />
      </Col>
    </Row>
  );
};
