import {CrudFilters, useTranslate} from "@pankod/refine-core";

import {
  Create,
  DrawerProps,
  Form,
  FormProps,
  Input,
  InputNumber,
  Radio,
  ButtonProps,
  Typography,
  Grid, Drawer, useSelect,Select
} from "@pankod/refine-antd";
import {IOrganization} from "../../interfaces/IOrganization";



type CreateOrganizationProps = {
  //onFinish:any;
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
};

export const CreateSubunit: React.FC<CreateOrganizationProps> = ({
  //onFinish,
  drawerProps,
  formProps,
  saveButtonProps,
}) => {
  const t = useTranslate();
  const breakpoint = Grid.useBreakpoint();

  const { selectProps:organizationSelectProps, queryResult } = useSelect<IOrganization>({
    resource: "organizations",
    optionLabel: "title",
    sort: [{field: 'id', order: 'asc'}],
    onSearch: ((value) => {
      const filters: CrudFilters = [];
      filters.push({
        field: "q",
        operator: "eq",
        value: (value.length) > 0 ? value : undefined,
      });
      return filters
    })
  })

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      bodyStyle={{ padding: 10 }}
      zIndex={1001}
    >
      <Create resource="subunits"
              saveButtonProps={saveButtonProps}
              breadcrumb={''}
      >
        <Form
          {...formProps}
          layout="vertical"
          initialValues={{
            is_active: true,
          }}
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
            <Select {...organizationSelectProps}
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
              <Radio value={true}>{t("organizations.fields.status.enable")}</Radio>
              <Radio value={false}>{t("organizations.fields.status.disable")}</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Create>
      {/*</form>*/}
    </Drawer>
  );
};
