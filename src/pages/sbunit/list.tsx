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
  Col
} from "@pankod/refine-antd";
import { ISubunit, ISubunitFilterVariables } from "interfaces/ISubunit";
import Filter from "components/subunit/filter";

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

  return (
    <Row gutter={[16, 16]}>
      <Col
        xl={6}
        lg={24}
        xs={24}
        style={{
          marginTop: "52px",
        }}
      >
        <Filter formProps={searchFormProps} filters={filters || []} />
      </Col>
      <Col xl={18} xs={24}>
        <List>
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
                  <EditButton hideText size="small" recordItemId={record.id} />
                  <ShowButton hideText size="small" recordItemId={record.id} />
                </Space>
              )}
            />
          </Table>
        </List>
      </Col>
    </Row>
  );
};
