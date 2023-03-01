import { useTranslate } from "@pankod/refine-core";

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
  Grid,
} from "@pankod/refine-antd";
import { Drawer } from "./styled";


type CreateOrganizationProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
};

export const CreateOrganization: React.FC<CreateOrganizationProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
}) => {
  const t = useTranslate();
  const breakpoint = Grid.useBreakpoint();

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      bodyStyle={{ padding: 10 }}
      zIndex={1001}
    >
      <Create resource="organizations" saveButtonProps={saveButtonProps}>
        <Form
          {...formProps}
          layout="vertical"
          initialValues={{
            is_active: true,
          }}
        >
          <Form.Item
            label={t("organizations.fields.id")}
            name={["id"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber maxLength={3}/>
          </Form.Item>
          <Form.Item
            label={t("organizations.fields.title")}
            name={["title"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("organizations.fields.fullname")}
            name={["fullname"]}
            rules={[
              {
                required: true,
              },
            ]}
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
    </Drawer>
  );
};
