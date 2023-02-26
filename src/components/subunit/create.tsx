import React from "react";
import {
  CrudFilters,
  IResourceComponentsProps,
  
  useApiUrl,
  
  useTranslate,
} from "@pankod/refine-core";
import {
  Create,
  Form,
  useForm,
  Input,
  Checkbox,
  Select,
  DatePicker,
  DrawerProps,
  FormProps,
  ButtonProps,
  Grid,
  Radio,
  Drawer,
  useSelect,
} from "@pankod/refine-antd";
import { IOrganization } from "interfaces/IOrganization";
import { ICreateSubunit } from "interfaces/ISubunit";

type CreateSubunitProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
};

export const CreateSubunit: React.FC<CreateSubunitProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
}) => {
  const t = useTranslate();
  const breakpoint = Grid.useBreakpoint();

  const { selectProps: organizationSelectProps } = useSelect<IOrganization>({
    resource: "organizations",
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
  });

//   const handleOnSubmit = (data: any) => {
//     const subunit: ICreateSubunit= {
//         name: data.name,
//         title: `${data.name} (${data.organization.title})`,
//         color_subunit: data.color_subunit,
//         organization_id: data.organization.id,
//     };
//     onFinish(subunit);
// };

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      bodyStyle={{ padding: 10 }}
      zIndex={1001}
    >
      <Create resource="subunits" saveButtonProps={saveButtonProps}>
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
            name={["organization", "title"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              {...organizationSelectProps}
              placeholder={t("subunits.fields.organization.filter.placeholder")}
            />
          </Form.Item>

          <Form.Item
            label={t("subunits.fields.color_subunit")}
            name={["color_subunit"]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("subunits.fields.is_active")}
            name={["is_active"]}
          >
            <Radio.Group>
              <Radio value={true}>{t("subunits.fields.status.enable")}</Radio>
              <Radio value={false}>{t("subunits.fields.status.disable")}</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Create>
    </Drawer>
  );
};
