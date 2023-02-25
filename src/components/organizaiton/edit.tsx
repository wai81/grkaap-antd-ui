import { useTranslate } from "@pankod/refine-core";

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
} from "@pankod/refine-antd";

const { Text } = Typography;

type EditOrganizationProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
  recordItemId:any;
};

export const EditOrganization: React.FC<EditOrganizationProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
  recordItemId
}) => {
  const t = useTranslate();
  const breakpoint = Grid.useBreakpoint();
  
  return (
    <>
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      bodyStyle={{ padding: 10 }}
      zIndex={1001}
    >
      <Edit
        saveButtonProps={saveButtonProps}
        headerProps={{ extra: null }}
        resource="organizations"
        recordItemId={recordItemId}
      >
        <Form
          {...formProps}
          layout="vertical"
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
            <InputNumber disabled />
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
            <Input.TextArea style={{height: 50}} />
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
      </Edit>
    </Drawer>
    </>
  );
};
