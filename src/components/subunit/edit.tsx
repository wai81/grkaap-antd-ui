import { CrudFilters, HttpError, useTranslate } from "@pankod/refine-core";

import {
  Edit,
  Drawer,
  DrawerProps,
  Form,
  FormProps,
  Input,
  InputNumber,
  Radio,
  ButtonProps,
  Typography,
  Grid,
  useSelect,
  Select,
} from "@pankod/refine-antd";
import { IOrganization } from "interfaces/IOrganization";
import { ISubunit } from "interfaces/ISubunit";

type EditSubunitProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
  recordItemId:any;
  queryResult:any;
};


export const EditSubunit: React.FC<EditSubunitProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
  recordItemId,
  queryResult
}) => {
  
  const t = useTranslate();
  const breakpoint = Grid.useBreakpoint();
  
  const { selectProps: organizationSelectProps} =
    useSelect<IOrganization>({
      resource: "organizations",
      // optionLabel: "title",
      // optionValue: "id",
      sort: [{ field: "id", order: "asc" }],
      onSearch: (value) => {
        const filters: CrudFilters = [];
        filters.push({
          field: "q",
          operator: "eq",
          value: value.length > 0 ? value : undefined,
        });
        return filters;
      },
      //defaultValue: queryResult?.data?.data.organizaiton.id,
    });
 
    

  return(<>
  <Drawer
    {...drawerProps}
    width={breakpoint.sm ? "500px" : "100%"}
    bodyStyle={{ padding: 10 }}
    zIndex={1001}
  >
    <Edit
      saveButtonProps={saveButtonProps}
      headerProps={{ extra: null }}
      resource="subunits"
      recordItemId={recordItemId}
      breadcrumb={""}
    >
      <Form
        {...formProps}
        layout="vertical"
      >
        <Form.Item
          label={t("subunits.fields.name")}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("subunits.fields.organization.title")}
          name={["organization_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...organizationSelectProps}
            placeholder={t("subunits.fields.organization.placeholder")}
          />
        </Form.Item>

        <Form.Item
          label={t("subunits.fields.color_subunit")}
          name={["color_subunit"]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("organizations.fields.is_active")}
          name={["is_active"]}
        >
          <Radio.Group>
            <Radio value={true}>
              {t("organizations.fields.status.enable")}
            </Radio>
            <Radio value={false}>
              {t("organizations.fields.status.disable")}
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Edit>
  </Drawer>
  </>);
};